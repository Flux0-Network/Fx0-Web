import { NextRequest, NextResponse } from 'next/server';
import { getSession, kvCmd, kvAvailable } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });
  if (!kvAvailable()) return NextResponse.json({ tickets: [] });

  const ids = (await kvCmd<string[]>('SMEMBERS', `flux0:tickets:user:${user.id}`)) || [];
  const tickets = (await Promise.all(ids.map(id => kvCmd<string>('GET', `flux0:ticket:${id}`))))
    .filter(Boolean)
    .map(v => (typeof v === 'string' ? JSON.parse(v) : v))
    .sort((a, b) => (b as Record<string, number>).createdAt - (a as Record<string, number>).createdAt);

  return NextResponse.json({ tickets });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });
  if (!kvAvailable()) return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });

  const body = await request.json() as { subject?: string; message?: string };
  const { subject, message } = body;
  if (!subject?.trim() || !message?.trim()) return NextResponse.json({ error: 'missing_fields' }, { status: 400 });

  const ticketId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const ticket = {
    id: ticketId,
    userId: user.id,
    username: user.username,
    global_name: user.global_name,
    avatar: user.avatar,
    subject: subject.trim().slice(0, 200),
    message: message.trim().slice(0, 2000),
    status: 'open',
    createdAt: Date.now(),
    replies: [] as unknown[],
  };

  await kvCmd('SET', `flux0:ticket:${ticketId}`, JSON.stringify(ticket));
  await kvCmd('SADD', `flux0:tickets:user:${user.id}`, ticketId);
  await kvCmd('SADD', 'flux0:tickets:all', ticketId);

  const webhookUrl = process.env.DISCORD_STATUS_WEBHOOK;
  if (webhookUrl) {
    const name = (ticket.global_name as string) || ticket.username || 'Unbekannt';
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [{ title: '🎫 Neues Support-Ticket', color: 0x3b82f6, fields: [{ name: 'Von', value: `${name} (<@${user.id}>)`, inline: true }, { name: 'Betreff', value: ticket.subject, inline: true }, { name: 'Nachricht', value: ticket.message.slice(0, 512) }], timestamp: new Date().toISOString(), footer: { text: `Ticket ${ticketId} · flux0.dev` } }] }),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true, id: ticketId }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });
  if (!kvAvailable()) return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });

  const body = await request.json() as { ticketId?: string; message?: string };
  const { ticketId, message } = body;
  if (!ticketId || !message?.trim()) return NextResponse.json({ error: 'missing_fields' }, { status: 400 });

  const raw = await kvCmd<string>('GET', `flux0:ticket:${ticketId}`);
  if (!raw) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const ticket = typeof raw === 'string' ? JSON.parse(raw) : raw as Record<string, unknown>;
  if (ticket.userId !== user.id) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (ticket.status === 'closed') return NextResponse.json({ error: 'ticket_closed' }, { status: 400 });

  (ticket.replies as unknown[]).push({ from: 'user', message: message.trim().slice(0, 2000), createdAt: Date.now() });
  await kvCmd('SET', `flux0:ticket:${ticketId}`, JSON.stringify(ticket));
  return NextResponse.json({ ok: true });
}
