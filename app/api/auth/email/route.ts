import { createHmac, pbkdf2Sync, randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { kvCmd } from '@/lib/server';

export const dynamic = 'force-dynamic';

function hashPassword(password: string, salt: string): string {
  return pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
}

function makeJwt(payload: object, secret: string): string {
  const header  = Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url');
  const body    = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig     = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

interface EmailRecord {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: number;
}

export async function POST(req: NextRequest) {
  const SESSION_SECRET = process.env.AUTH_SECRET;
  if (!SESSION_SECRET) {
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }

  let email: string, password: string;
  try {
    ({ email, password } = await req.json());
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Ungültige Email-Adresse.' }, { status: 400 });
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return NextResponse.json({ error: 'Passwort muss mindestens 6 Zeichen haben.' }, { status: 400 });
  }

  const emailKey = `flux0:email_user:${email.toLowerCase().trim()}`;
  const existing = await kvCmd<string>('GET', emailKey);

  let userId: string;
  const now = Date.now();

  if (existing) {
    // Login
    const record: EmailRecord = typeof existing === 'string' ? JSON.parse(existing) : existing as EmailRecord;
    const hash = hashPassword(password, record.salt);
    if (hash !== record.passwordHash) {
      return NextResponse.json({ error: 'Falsches Passwort.' }, { status: 401 });
    }
    userId = record.id;
  } else {
    // Register
    const salt = randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);
    userId = `em_${randomBytes(8).toString('hex')}`;
    const record: EmailRecord = { id: userId, email: email.toLowerCase().trim(), passwordHash, salt, createdAt: now };
    await kvCmd('SET', emailKey, JSON.stringify(record));
  }

  // Upsert user profile with earlyAccess flag
  const profileKey = `flux0:user:${userId}`;
  const prevRaw = await kvCmd<string>('GET', profileKey);
  const prev = prevRaw ? (typeof prevRaw === 'string' ? JSON.parse(prevRaw) : prevRaw) : null;
  const username = email.split('@')[0];
  const profile = {
    id: userId,
    username,
    global_name: username,
    avatar: null,
    provider: 'email',
    email: email.toLowerCase().trim(),
    earlyAccess: true,
    firstSeen: (prev as Record<string, unknown>)?.firstSeen || now,
    lastLogin: now,
    loginCount: ((prev as Record<string, unknown>)?.loginCount as number || 0) + 1,
  };
  await kvCmd('SET', profileKey, JSON.stringify(profile));
  await kvCmd('SADD', 'flux0:users:all', userId);

  const token = makeJwt({
    id: userId,
    username,
    global_name: username,
    avatar: null,
    earlyAccess: true,
    exp: now + 7 * 24 * 60 * 60 * 1000,
  }, SESSION_SECRET);

  const res = NextResponse.json({ ok: true });
  res.cookies.set('flux0_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 3600,
    path: '/',
  });
  return res;
}
