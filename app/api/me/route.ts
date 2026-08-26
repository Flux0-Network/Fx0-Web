import { NextResponse } from 'next/server';
import { getSession, isAdmin } from '@/lib/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getSession();
  if (!data) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });

  return NextResponse.json({
    id: data.id,
    username: data.username,
    global_name: data.global_name ?? data.username,
    avatar: data.avatar,
    isAdmin: isAdmin(data.id),
  });
}
