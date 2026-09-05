import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const REDIRECT_URI = 'https://flux0.dev/api/callBack';

export async function GET() {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  if (!CLIENT_ID) {
    return new NextResponse('DISCORD_CLIENT_ID not configured', { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }

  const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify`;
  return NextResponse.redirect(url);
}
