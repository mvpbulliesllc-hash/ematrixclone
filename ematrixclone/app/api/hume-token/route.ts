import { NextResponse } from 'next/server';
import { fetchAccessToken } from 'hume';

export const dynamic = 'force-dynamic';

// Mints a short-lived EVI access token for the browser from the server-side
// Hume keys, so the API/secret keys never reach the client.
export async function GET() {
  const apiKey = process.env.HUME_API_KEY;
  const secretKey = process.env.HUME_SECRET_KEY;

  if (!apiKey || !secretKey) {
    return NextResponse.json(
      { error: 'Hume is not configured (set HUME_API_KEY and HUME_SECRET_KEY).' },
      { status: 503 }
    );
  }

  try {
    const accessToken = await fetchAccessToken({ apiKey, secretKey });
    return NextResponse.json({ accessToken });
  } catch (err) {
    console.error('[hume] token error', err);
    return NextResponse.json({ error: 'Could not mint token.' }, { status: 500 });
  }
}
