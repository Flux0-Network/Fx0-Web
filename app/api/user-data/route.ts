import { NextResponse } from 'next/server';
import { getSession, kvCmd } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });

  const [docsRaw, activityRaw] = await Promise.all([
    kvCmd<string>('GET', `flux0:docs:${user.id}`),
    kvCmd<string[]>('LRANGE', `flux0:activity:${user.id}`, 0, 19),
  ]);

  const docs = docsRaw ? (typeof docsRaw === 'string' ? JSON.parse(docsRaw) : docsRaw) : [];
  const events = ((activityRaw as unknown[]) || []).map(e => {
    try { return typeof e === 'string' ? JSON.parse(e) : e; } catch { return null; }
  }).filter(Boolean);

  return NextResponse.json({ docs, events });
}
