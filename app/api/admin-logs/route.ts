import { NextResponse } from 'next/server';
import { getSession, isAdmin, kvCmd, kvAvailable } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });
  if (!isAdmin(user.id)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (!kvAvailable()) return NextResponse.json({ logs: [], kv: false });

  const raw = (await kvCmd<string[]>('LRANGE', 'flux0:logs', 0, 199)) || [];
  const logs = raw.map(v => {
    try { return typeof v === 'string' ? JSON.parse(v) : v; } catch { return null; }
  }).filter(Boolean);

  return NextResponse.json({ logs, kv: true });
}
