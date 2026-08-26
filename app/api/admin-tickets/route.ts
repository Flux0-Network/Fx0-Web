import { NextRequest, NextResponse } from 'next/server';
import { getSession, isAdmin, kvCmd, kvAvailable } from '@/lib/server';

export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const user = await getSession();
  if (!user) return { error: NextResponse.json({ error: 'not_authenticated' }, { status: 401 }), user: null };
  if (!isAdmin(user.id)) return { error: NextResponse.json({ error: 'forbidden' }, { status: 403 }), user: null };
  return { error: null, user };
}

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!kvAvailable()) return NextResponse.json({ tickets: [], kv: false });

  const ids = (await kvCmd<string[]>('SMEMBERS', 'flux0:tickets:all')) || [];
  const tickets = (await Promise.all(ids.map(id => kvCmd<string>('GET', `flux0:ticket:${id}`))))
    .filter(Boolean)
    .map(v => (typeof v === 'string' ? JSON.parse(v) : v))
    .sort((a, b) => (b as Record<string, number>).createdAt - (a as Record<string, number>).createdAt);

  return NextResponse.json({ tickets, kv: true });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!kvAvailable()) return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });

  const body = await request.json() as { ticketId?: string; status?: string; reply?: string };
  const { ticketId, status, reply } = body;
  if (!ticketId) return NextResponse.json({ error: 'missing_ticketId' }, { status: 400 });

  const raw = await kvCmd<string>('GET', `flux0:ticket:${ticketId}`);
  if (!raw) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const ticket = typeof raw === 'string' ? JSON.parse(raw) : raw as Record<string, unknown>;
  if (status) ticket.status = status;
  if (reply?.trim()) {
    (ticket.replies as unknown[]) = (ticket.replies as unknown[]) || [];
    (ticket.replies as unknown[]).push({ from: 'admin', text: reply.trim().slice(0, 2000), createdAt: Date.now() });
    const actEntry = JSON.stringify({ type: 'ticket_reply', text: `Ticket beantwortet: ${ticket.subject}`, createdAt: Date.now() });
    kvCmd('LPUSH', `flux0:activity:${ticket.userId}`, actEntry).catch(() => {});
    kvCmd('LTRIM', `flux0:activity:${ticket.userId}`, 0, 49).catch(() => {});
  }
  ticket.updatedAt = Date.now();
  await kvCmd('SET', `flux0:ticket:${ticketId}`, JSON.stringify(ticket));

  return NextResponse.json({ ok: true });
}
