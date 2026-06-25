/**
 * Seed the demo tenant rows into the live store from the command line.
 *
 *   REDIS_URL=redis://...  NEXT_PUBLIC_ROOT_DOMAIN=ematrixgroup.com  pnpm seed
 *
 * Idempotent: re-running overwrites the same subdomains, never duplicates.
 * (If your machine can't reach Redis, use the GET /api/seed endpoint instead.)
 */
import { redis } from '@/lib/redis';
import { seedTenants } from '@/lib/seed';

async function main() {
  if (!process.env.REDIS_URL) {
    console.error('Missing REDIS_URL. Run:\n  REDIS_URL=redis://... pnpm seed');
    process.exit(1);
  }

  const sites = await seedTenants();
  for (const site of sites) {
    console.log(`✓ ${site.businessName}`);
    console.log(`    live now: ${site.pathUrl}`);
    console.log(`    branded:  ${site.brandedUrl}  (after wildcard)`);
  }
  console.log(`\nSeeded ${sites.length} demo sites.`);
  await redis.close();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
