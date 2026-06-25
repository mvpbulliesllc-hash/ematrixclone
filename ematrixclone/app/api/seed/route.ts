import { NextResponse } from 'next/server';
import { seedTenants } from '@/lib/seed';

export const dynamic = 'force-dynamic';

// One-time seed endpoint. Writes the 20 demo rows from the deployment itself
// (which can reach Redis). Two ways to authorize:
//   - If SEED_SECRET is set:   GET /api/seed?token=<SEED_SECRET>
//   - Otherwise (zero config): GET /api/seed?confirm=yes
// It only ever writes the same 20 fixed demo rows (idempotent, no deletes).
// Safe to delete this route once the rows are seeded.
export async function GET(request: Request) {
  const secret = process.env.SEED_SECRET;
  const params = new URL(request.url).searchParams;

  if (secret) {
    if (params.get('token') !== secret) {
      return NextResponse.json({ error: 'Invalid or missing token.' }, { status: 401 });
    }
  } else if (params.get('confirm') !== 'yes') {
    return NextResponse.json(
      { error: 'Add ?confirm=yes to seed the 20 demo rows.' },
      { status: 403 }
    );
  }

  // ?count=N seeds N ranked businesses (default 48). ?count=all seeds every supported row.
  // ?offset=M skips the top M first, so ?count=50&offset=48 stamps "the next 50".
  const countParam = params.get('count');
  let limit = 48;
  if (countParam === 'all') limit = Number.MAX_SAFE_INTEGER;
  else if (countParam && !Number.isNaN(Number(countParam))) limit = Number(countParam);

  const offsetParam = params.get('offset');
  const offset =
    offsetParam && !Number.isNaN(Number(offsetParam)) ? Number(offsetParam) : 0;

  try {
    const sites = await seedTenants(limit, offset);
    return NextResponse.json({
      ok: true,
      seeded: sites.length,
      sites: sites.map((s) => ({ business: s.businessName, url: s.pathUrl }))
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
