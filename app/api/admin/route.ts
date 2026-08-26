import { NextRequest, NextResponse } from 'next/server';
import { getSession, isAdmin, kvCmd, kvAvailable } from '@/lib/server';

export const dynamic = 'force-dynamic';

const STATUS_LABELS = ['Anfrage', 'Design', 'Entwicklung', 'Launch'];

async function requireAdmin() {
  const user = await getSession();
  if (!user) return { error: NextResponse.json({ error: 'not_authenticated' }, { status: 401 }), user: null };
  if (!isAdmin(user.id)) return { error: NextResponse.json({ error: 'forbidden' }, { status: 403 }), user: null };
  return { error: null, user };
}

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!kvAvailable()) return NextResponse.json({ requests: [], kv: false });

  const ids = (await kvCmd<string[]>('SMEMBERS', 'flux0:requests')) || [];
  const requests = (await Promise.all(ids.map(id => kvCmd<string>('GET', `flux0:req:${id}`))))
    .filter(Boolean)
    .map(v => (typeof v === 'string' ? JSON.parse(v) : v))
    .sort((a, b) => (b as Record<string, number>).createdAt - (a as Record<string, number>).createdAt);

  return NextResponse.json({ requests, kv: true });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!kvAvailable()) return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });

  const body = await request.json() as { userId?: string; status?: number; note?: string };
  const { userId, status, note } = body;
  if (!userId) return NextResponse.json({ error: 'missing_userId' }, { status: 400 });

  const raw = await kvCmd<string>('GET', `flux0:req:${userId}`);
  if (!raw) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const existing = typeof raw === 'string' ? JSON.parse(raw) : raw as Record<string, unknown>;
  const updated = { ...existing, updatedAt: Date.now() };
  if (typeof status === 'number') updated.status = status;
  if (typeof note === 'string') updated.note = note;
  await kvCmd('SET', `flux0:req:${userId}`, JSON.stringify(updated));

  if (typeof status === 'number' && status !== existing.status) {
    const activityEntry = JSON.stringify({ type: 'status_change', text: `Projektstatus: ${STATUS_LABELS[status] || status}`, createdAt: Date.now() });
    kvCmd('LPUSH', `flux0:activity:${userId}`, activityEntry).catch(() => {});
    kvCmd('LTRIM', `flux0:activity:${userId}`, 0, 49).catch(() => {});

    const webhookUrl = process.env.DISCORD_STATUS_WEBHOOK;
    if (webhookUrl) {
      const name = (existing.global_name as string) || (existing.username as string) || 'Unbekannt';
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [{ title: '🔄 Projektstatus geändert', color: 0x7c3aed, fields: [{ name: 'Kunde', value: `${name} (${userId})`, inline: true }, { name: 'Paket', value: (existing.paket as string) || '—', inline: true }, { name: 'Status', value: `${STATUS_LABELS[existing.status as number] ?? existing.status} → **${STATUS_LABELS[status] ?? status}**`, inline: false }, ...(note ? [{ name: 'Notiz', value: note.slice(0, 512), inline: false }] : [])], timestamp: new Date().toISOString(), footer: { text: 'flux0.dev · Admin Panel' } }] }),
      }).catch(() => {});
    }
  }

  return NextResponse.json({ ok: true });
}
