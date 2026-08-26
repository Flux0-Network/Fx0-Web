import { NextResponse } from 'next/server';
import { getSession, kvCmd } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });

  const raw = await kvCmd<string>('GET', `flux0:req:${user.id}`);
  if (!raw) return NextResponse.json({ error: 'no_project' }, { status: 404 });

  const p = typeof raw === 'string' ? JSON.parse(raw) : raw as Record<string, unknown>;
  return NextResponse.json({ paket: p.paket, status: p.status ?? 0, note: p.note || '', createdAt: p.createdAt });
}
