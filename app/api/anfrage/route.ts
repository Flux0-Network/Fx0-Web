import { NextRequest, NextResponse } from 'next/server';
import { getSession, kvCmd } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });

  const body = await request.json() as { paket?: string; beschreibung?: string; budget?: string };
  const { paket, beschreibung, budget } = body;
  if (!paket || !beschreibung) return NextResponse.json({ error: 'missing_fields' }, { status: 400 });

  const webhookUrl = process.env.DISCORD_ANFRAGE_WEBHOOK;
  if (!webhookUrl) return NextResponse.json({ error: 'webhook_not_configured' }, { status: 500 });

  const name = user.global_name || user.username || 'Unbekannt';
  const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64` : null;

  const embed: Record<string, unknown> = {
    title: '📬 Neue Website-Anfrage',
    color: 0x7c3aed,
    fields: [
      { name: 'Paket', value: paket, inline: true },
      { name: 'Budget', value: budget || 'Nicht angegeben', inline: true },
      { name: 'Discord', value: `${name} (${user.id})`, inline: false },
      { name: 'Beschreibung', value: beschreibung.slice(0, 1024), inline: false },
    ],
    timestamp: new Date().toISOString(),
    footer: { text: 'flux0.dev · Dashboard Anfrage' },
  };
  if (avatarUrl) embed.thumbnail = { url: avatarUrl };

  try {
    const r = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
    if (!r.ok) throw new Error(`Webhook ${r.status}`);

    const record = JSON.stringify({ id: user.id, username: user.username, global_name: user.global_name, avatar: user.avatar, paket, beschreibung, budget, status: 0, note: '', createdAt: Date.now() });
    await kvCmd('SET', `flux0:req:${user.id}`, record);
    await kvCmd('SADD', 'flux0:requests', user.id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[anfrage] webhook error:', (err as Error).message);
    return NextResponse.json({ error: 'webhook_failed' }, { status: 500 });
  }
}
