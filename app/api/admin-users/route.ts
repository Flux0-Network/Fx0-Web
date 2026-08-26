import { NextRequest, NextResponse } from 'next/server';
import { getSession, isAdmin, kvCmd, kvAvailable } from '@/lib/server';

export const dynamic = 'force-dynamic';

async function requireAdmin() {
  const user = await getSession();
  if (!user) return { error: NextResponse.json({ error: 'not_authenticated' }, { status: 401 }), user: null };
  if (!isAdmin(user.id)) return { error: NextResponse.json({ error: 'forbidden' }, { status: 403 }), user: null };
  return { error: null, user };
}

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const userId = request.nextUrl.searchParams.get('userId');

  if (userId) {
    if (!kvAvailable()) return NextResponse.json({ docs: [] });
    const raw = await kvCmd<string>('GET', `flux0:docs:${userId}`);
    const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [];
    return NextResponse.json({ docs });
  }

  if (!kvAvailable()) return NextResponse.json({ users: [], kv: false });
  const ids = (await kvCmd<string[]>('SMEMBERS', 'flux0:users:all')) || [];
  const users = (await Promise.all(ids.map(async id => {
    const raw = await kvCmd<string>('GET', `flux0:user:${id}`);
    if (!raw) return null;
    const u = typeof raw === 'string' ? JSON.parse(raw) : raw as Record<string, unknown>;
    const reqRaw = await kvCmd<string>('GET', `flux0:req:${id}`);
    u.project = reqRaw ? (typeof reqRaw === 'string' ? JSON.parse(reqRaw) : reqRaw) : null;
    return u;
  }))).filter(Boolean).sort((a, b) => (b as Record<string, number>).lastLogin - (a as Record<string, number>).lastLogin);

  return NextResponse.json({ users, kv: true });
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!kvAvailable()) return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });

  const body = await request.json() as { userId?: string; name?: string; url?: string; type?: string };
  const { userId, name, url, type } = body;
  if (!userId || !name?.trim() || !url?.trim()) return NextResponse.json({ error: 'missing_fields' }, { status: 400 });

  const raw = await kvCmd<string>('GET', `flux0:docs:${userId}`);
  const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [] as unknown[];
  const doc = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name: name.trim(), url: url.trim(), type: type || 'Dokument', addedAt: Date.now() };
  (docs as unknown[]).unshift(doc);
  await kvCmd('SET', `flux0:docs:${userId}`, JSON.stringify(docs));

  const actEntry = JSON.stringify({ type: 'doc_added', text: `Neues Dokument: ${doc.name}`, createdAt: Date.now() });
  kvCmd('LPUSH', `flux0:activity:${userId}`, actEntry).catch(() => {});
  kvCmd('LTRIM', `flux0:activity:${userId}`, 0, 49).catch(() => {});

  return NextResponse.json({ ok: true, doc });
}

export async function PATCH(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!kvAvailable()) return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });

  const body = await request.json() as { userId?: string; status?: number; name?: string; paket?: string; note?: string };
  const { userId, status, name, paket, note } = body;
  if (!userId) return NextResponse.json({ error: 'missing_userId' }, { status: 400 });

  const raw = await kvCmd<string>('GET', `flux0:req:${userId}`);
  if (!raw) return NextResponse.json({ error: 'no_project' }, { status: 404 });

  const proj = typeof raw === 'string' ? JSON.parse(raw) : raw as Record<string, unknown>;
  if (typeof status === 'number') proj.status = status;
  if (name?.trim()) proj.name = name.trim();
  if (paket?.trim()) proj.paket = paket.trim();
  if (note !== undefined) proj.note = note.trim().slice(0, 500);
  proj.updatedAt = Date.now();
  await kvCmd('SET', `flux0:req:${userId}`, JSON.stringify(proj));

  return NextResponse.json({ ok: true, proj });
}

export async function DELETE(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!kvAvailable()) return NextResponse.json({ error: 'kv_not_configured' }, { status: 503 });

  const body = await request.json() as { userId?: string; docId?: string };
  const { userId, docId } = body;
  if (!userId || !docId) return NextResponse.json({ error: 'missing_fields' }, { status: 400 });

  const raw = await kvCmd<string>('GET', `flux0:docs:${userId}`);
  const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [] as unknown[];
  await kvCmd('SET', `flux0:docs:${userId}`, JSON.stringify((docs as Array<{ id: string }>).filter(d => d.id !== docId)));

  return NextResponse.json({ ok: true });
}
