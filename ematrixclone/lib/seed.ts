import { redis } from '@/lib/redis';
import { slugifyBusinessName, type Tenant } from '@/lib/tenants';
import { CALL_LIST } from '@/lib/call-list';
import { STATE_NAMES } from '@/lib/seed-data';

export const DEFAULT_SEED_COUNT = 48;

export type SeededSite = {
  businessName: string;
  subdomain: string;
  pathUrl: string;
  brandedUrl: string;
};

// Seeds tenant rows from the scored call list (rank order). Idempotent:
// re-running overwrites the same subdomains. `limit` controls how many rows to
// stamp; `offset` skips that many top-ranked rows first, so `(50, 48)` stamps
// "the next 50" after the first 48. Slugs are derived across the whole prefix
// [0, offset+limit) so an offset batch can never collide with an earlier one.
export async function seedTenants(
  limit: number = DEFAULT_SEED_COUNT,
  offset: number = 0
): Promise<SeededSite[]> {
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
  const defaultInbox = process.env.DEFAULT_LEAD_INBOX || 'leads@example.com';

  const start = Math.max(0, offset);
  const end = start + Math.max(0, limit);
  const rows = CALL_LIST.slice(0, end);
  const seen = new Set<string>();
  const sites: SeededSite[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    // Collision-safe subdomain (two "Smith Plumbing" → smith-plumbing, smith-plumbing-2)
    const base = slugifyBusinessName(row.businessName) || 'site';
    let subdomain = base;
    let n = 2;
    while (seen.has(subdomain)) subdomain = `${base}-${n++}`;
    seen.add(subdomain);

    // Below the offset: reserve the slug for stable dedupe, but don't write it.
    if (i < start) continue;

    // Blank city → full state name as locale; clear abbreviation for a clean line.
    const city = row.city || STATE_NAMES[row.state] || row.state;
    const state = row.city ? row.state : '';

    const tenant: Tenant = {
      subdomain,
      customDomain: null,
      businessName: row.businessName,
      city,
      state,
      phone: row.phone,
      niche: row.niche,
      rating: row.rating,
      reviewCount: row.reviewCount,
      heroImageUrl: null,
      services: null,
      primaryColor: null,
      facebookUrl: null,
      instagramUrl: null,
      leadInboxEmail: defaultInbox,
      retellAgentId: null,
      status: 'demo',
      createdAt: Date.now()
    };

    await redis.set(`subdomain:${subdomain}`, tenant);

    sites.push({
      businessName: row.businessName,
      subdomain,
      pathUrl: `https://${rootDomain}/s/${subdomain}`,
      brandedUrl: `https://${subdomain}.${rootDomain}`
    });
  }

  return sites;
}
