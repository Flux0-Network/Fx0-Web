import { createHmac } from 'crypto';
import { cookies } from 'next/headers';

export interface SessionData {
  id: string;
  username: string;
  global_name?: string;
  avatar: string | null;
  discriminator?: string;
  earlyAccess?: boolean;
  exp: number;
}

export async function getSession(): Promise<SessionData | null> {
  const SESSION_SECRET = process.env.SESSION_SECRET;
  if (!SESSION_SECRET) return null;

  const cookieStore = await cookies();
  const raw = cookieStore.get('flux0_session')?.value;
  if (!raw) return null;

  const parts = raw.split('.');
  if (parts.length !== 3) return null;
  const [header, payload, sig] = parts;

  const expected = createHmac('sha256', SESSION_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');
  if (sig !== expected) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as SessionData;
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function isAdmin(userId: string): boolean {
  const ids = (process.env.ADMIN_DISCORD_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
  return ids.length > 0 && ids.includes(userId);
}

export async function kvCmd<T = unknown>(...args: unknown[]): Promise<T | null> {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  const json = await r.json() as { result: T };
  return json.result ?? null;
}

export function kvAvailable(): boolean {
  return !!(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
    (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
}
