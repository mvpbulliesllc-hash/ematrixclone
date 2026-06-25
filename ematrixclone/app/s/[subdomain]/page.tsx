import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTenant } from '@/lib/tenants';
import { NICHES } from '@/lib/niches';
import { TradeSite } from './trade-site';

// ISR: each site is statically cached and only regenerates when the row changes
// (or hourly). Near-zero compute cost at hundreds of sites.
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const tenant = await getTenant(subdomain);

  if (!tenant) {
    return { title: 'Not found' };
  }

  const niche = NICHES[tenant.niche];
  const title = `${tenant.businessName} | ${niche.label} in ${tenant.city}, ${tenant.state}`;
  const description = `${tenant.businessName} — ${niche.tagline}. Locally owned, licensed & insured. Call ${tenant.phone} for a free estimate.`;

  return {
    title,
    description,
    openGraph: { title, description }
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const tenant = await getTenant(subdomain);

  if (!tenant) {
    notFound();
  }

  return <TradeSite tenant={tenant} />;
}
