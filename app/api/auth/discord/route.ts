import { createHmac } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { kvCmd } from '@/lib/server';

export const dynamic = 'force-dynamic';

const REDIRECT_URI = 'https://flux0.dev/api/auth/discord';

async function kvLog(entry: Record<string, unknown>) {
  try {
    await kvCmd('LPUSH', 'flux0:logs', JSON.stringify(entry));
    await kvCmd('LTRIM', 'flux0:logs', 0, 499);
  } catch {}
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://flux0.dev';

  // No code → initiate OAuth flow
  if (!code && !error) {
    if (!CLIENT_ID) {
      return new NextResponse('DISCORD_CLIENT_ID not configured', { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }
    const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify`;
    return NextResponse.redirect(url);
  }

  // Error from Discord
  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/dashboard?error=cancelled`);
  }

  // Callback: exchange code for token
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const SESSION_SECRET = process.env.SESSION_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET || !SESSION_SECRET) {
    const missing = ['DISCORD_CLIENT_ID', 'DISCORD_CLIENT_SECRET', 'SESSION_SECRET']
      .filter(k => !process.env[k]).join(', ');
    return new NextResponse(`Missing env vars: ${missing}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }

  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
    });
    const tokenData = await tokenRes.json() as { access_token?: string };

    if (!tokenData.access_token) {
      return new NextResponse(`Discord token error: ${JSON.stringify(tokenData)}\n\nRedirect URI used: ${REDIRECT_URI}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }

    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const user = await userRes.json() as { id?: string; username?: string; global_name?: string; avatar?: string };

    if (!user.id) {
      return new NextResponse(`Discord user error: ${JSON.stringify(user)}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
    }

    const header = Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url');
    const payload = Buffer.from(JSON.stringify({
      id: user.id,
      username: user.username,
      global_name: user.global_name || user.username,
      avatar: user.avatar,
      earlyAccess: true,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
    })).toString('base64url');
    const sig = createHmac('sha256', SESSION_SECRET).update(`${header}.${payload}`).digest('base64url');
    const token = `${header}.${payload}.${sig}`;

    const now = Date.now();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

    kvLog({ userId: user.id, username: user.username, global_name: user.global_name || user.username, avatar: user.avatar, action: 'login', timestamp: now, ip });

    const existing = await kvCmd<string>('GET', `flux0:user:${user.id}`);
    const prev = existing ? (typeof existing === 'string' ? JSON.parse(existing) : existing) : null;
    const profile = { id: user.id, username: user.username, global_name: user.global_name || user.username, avatar: user.avatar, earlyAccess: true, firstSeen: (prev as Record<string, unknown>)?.firstSeen || now, lastLogin: now, loginCount: ((prev as Record<string, unknown>)?.loginCount as number || 0) + 1 };
    await kvCmd('SET', `flux0:user:${user.id}`, JSON.stringify(profile));
    await kvCmd('SADD', 'flux0:users:all', user.id);

    const res = NextResponse.redirect(`${baseUrl}/dashboard`);
    res.cookies.set('flux0_session', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 3600, path: '/' });
    return res;

  } catch (err) {
    const e = err as Error;
    return new NextResponse(`Exception: ${e.message}\n${e.stack}`, { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }
}
