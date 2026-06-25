import { redis } from '@/lib/redis';
import { isNiche, type Niche } from '@/lib/niches';

// One tenant = one client site = one Redis row, keyed `subdomain:{name}`.
// This is the v1 store. Swapping to Neon Postgres + Drizzle later is a contained
// change behind these functions — the template and admin never touch Redis directly.

export type TenantStatus = 'demo' | 'live' | 'churned';

export type Tenant = {
  subdomain: string;
  customDomain: string | null;
  businessName: string;
  city: string;
  state: string;
  phone: string;
  niche: Niche;
  rating: number;
  reviewCount: number;
  /** Per-tenant override; falls back to the niche-generic image when null. */
  heroImageUrl: string | null;
  /** Optional services override; falls back to the niche lookup when null. */
  services: string[] | null;
  /** Optional brand color override; falls back to the niche accent when null. */
  primaryColor: string | null;
  /** Real Facebook page URL when known; template falls back to a name search. */
  facebookUrl: string | null;
  /** Real Instagram profile URL when known; template falls back to a name search. */
  instagramUrl: string | null;
  /** Where the contact form sends. Yours until they sign. */
  leadInboxEmail: string;
  /** Null until the AI receptionist upsell closes. */
  retellAgentId: string | null;
  status: TenantStatus;
  createdAt: number;
};

export type NewTenantInput = {
  subdomain: string;
  businessName: string;
  city: string;
  state: string;
  phone: string;
  niche: Niche;
  rating?: number;
  reviewCount?: number;
  leadInboxEmail: string;
  customDomain?: string | null;
  heroImageUrl?: string | null;
  primaryColor?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  retellAgentId?: string | null;
  status?: TenantStatus;
};

export function sanitizeSubdomain(subdomain: string): string {
  return subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

// Business name -> subdomain slug. Drops LLC/Inc, apostrophes, and symbols,
// collapses everything else to single hyphens. e.g. "Gary's Sewer & Drain" -> "garys-sewer-drain"
export function slugifyBusinessName(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, '') // drop apostrophes so "gary's" -> "garys"
    .replace(/\b(llc|inc|co)\b\.?/g, ' ') // drop common suffixes
    .replace(/&/g, ' ') // ampersand -> separator
    .replace(/[^a-z0-9]+/g, '-') // any run of non-alphanumerics -> hyphen
    .replace(/^-+|-+$/g, '') // trim leading/trailing hyphens
    .replace(/-+/g, '-'); // collapse repeats
}

// Redis may hold legacy emoji-only rows from the starter kit. Normalize whatever
// comes back into a full Tenant so the template never crashes on old data.
function normalize(subdomain: string, raw: unknown): Tenant | null {
  if (!raw || typeof raw !== 'object') return null;
  const data = raw as Record<string, unknown>;

  const niche =
    typeof data.niche === 'string' && isNiche(data.niche)
      ? (data.niche as Niche)
      : 'septic';

  return {
    subdomain,
    customDomain: (data.customDomain as string) ?? null,
    businessName: (data.businessName as string) ?? subdomain,
    city: (data.city as string) ?? '',
    state: (data.state as string) ?? '',
    phone: (data.phone as string) ?? '',
    niche,
    rating: typeof data.rating === 'number' ? data.rating : 5,
    reviewCount: typeof data.reviewCount === 'number' ? data.reviewCount : 0,
    heroImageUrl: (data.heroImageUrl as string) ?? null,
    services: Array.isArray(data.services) ? (data.services as string[]) : null,
    primaryColor: (data.primaryColor as string) ?? null,
    facebookUrl: (data.facebookUrl as string) ?? null,
    instagramUrl: (data.instagramUrl as string) ?? null,
    leadInboxEmail: (data.leadInboxEmail as string) ?? '',
    retellAgentId: (data.retellAgentId as string) ?? null,
    status: (data.status as TenantStatus) ?? 'demo',
    createdAt: typeof data.createdAt === 'number' ? data.createdAt : Date.now()
  };
}

export async function getTenant(subdomain: string): Promise<Tenant | null> {
  const key = sanitizeSubdomain(subdomain);
  const raw = await redis.get(`subdomain:${key}`);
  return normalize(key, raw);
}

export async function getAllTenants(): Promise<Tenant[]> {
  const keys = await redis.keys('subdomain:*');
  if (!keys.length) return [];

  const values = await redis.mget(...keys);
  return keys
    .map((key, i) => normalize(key.replace('subdomain:', ''), values[i]))
    .filter((t): t is Tenant => t !== null)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export async function tenantExists(subdomain: string): Promise<boolean> {
  const key = sanitizeSubdomain(subdomain);
  return (await redis.get(`subdomain:${key}`)) !== null;
}

export async function createTenant(input: NewTenantInput): Promise<Tenant> {
  const subdomain = sanitizeSubdomain(input.subdomain);

  const tenant: Tenant = {
    subdomain,
    customDomain: input.customDomain ?? null,
    businessName: input.businessName,
    city: input.city,
    state: input.state,
    phone: input.phone,
    niche: input.niche,
    rating: input.rating ?? 5,
    reviewCount: input.reviewCount ?? 0,
    heroImageUrl: input.heroImageUrl ?? null,
    services: null,
    primaryColor: input.primaryColor ?? null,
    facebookUrl: input.facebookUrl ?? null,
    instagramUrl: input.instagramUrl ?? null,
    leadInboxEmail: input.leadInboxEmail,
    retellAgentId: input.retellAgentId ?? null,
    status: input.status ?? 'demo',
    createdAt: Date.now()
  };

  await redis.set(`subdomain:${subdomain}`, tenant);
  return tenant;
}

export async function deleteTenant(subdomain: string): Promise<void> {
  await redis.del(`subdomain:${sanitizeSubdomain(subdomain)}`);
}
