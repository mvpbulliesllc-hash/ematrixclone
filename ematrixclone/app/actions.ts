'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { rootDomain, protocol } from '@/lib/utils';
import { isNiche } from '@/lib/niches';
import {
  createTenant,
  deleteTenant,
  sanitizeSubdomain,
  tenantExists
} from '@/lib/tenants';
import { sendLead } from '@/lib/leads';

export type CreateTenantState = {
  error?: string;
  success?: boolean;
  values?: Record<string, string>;
};

export async function createTenantAction(
  _prevState: CreateTenantState,
  formData: FormData
): Promise<CreateTenantState> {
  const get = (k: string) => (formData.get(k) as string)?.trim() ?? '';

  const values = {
    subdomain: get('subdomain'),
    businessName: get('businessName'),
    city: get('city'),
    state: get('state'),
    phone: get('phone'),
    niche: get('niche'),
    rating: get('rating'),
    reviewCount: get('reviewCount'),
    leadInboxEmail: get('leadInboxEmail'),
    primaryColor: get('primaryColor'),
    facebookUrl: get('facebookUrl'),
    instagramUrl: get('instagramUrl')
  };

  const required: [string, string][] = [
    ['subdomain', values.subdomain],
    ['businessName', values.businessName],
    ['city', values.city],
    ['state', values.state],
    ['phone', values.phone],
    ['niche', values.niche]
  ];
  const missing = required.find(([, v]) => !v);
  if (missing) {
    return { success: false, error: `${missing[0]} is required`, values };
  }

  if (!isNiche(values.niche)) {
    return { success: false, error: 'Pick a valid niche', values };
  }

  const sanitized = sanitizeSubdomain(values.subdomain);
  if (sanitized !== values.subdomain.toLowerCase()) {
    return {
      success: false,
      error:
        'Subdomain can only have lowercase letters, numbers, and hyphens.',
      values
    };
  }

  if (await tenantExists(sanitized)) {
    return { success: false, error: 'That subdomain is already taken', values };
  }

  // Optional custom hero photo → Vercel Blob (falls back to the niche default).
  let heroImageUrl: string | null = null;
  const heroFile = formData.get('heroImage');
  if (heroFile instanceof File && heroFile.size > 0) {
    try {
      const { put } = await import('@vercel/blob');
      const safeName = heroFile.name.replace(/[^a-zA-Z0-9.]/g, '-');
      const blob = await put(
        `heroes/${sanitized}-${Date.now()}-${safeName}`,
        heroFile,
        { access: 'public' }
      );
      heroImageUrl = blob.url;
    } catch (err) {
      console.error('[hero upload] failed', err);
    }
  }

  await createTenant({
    subdomain: sanitized,
    businessName: values.businessName,
    city: values.city,
    state: values.state,
    phone: values.phone,
    niche: values.niche,
    rating: values.rating ? Number(values.rating) : undefined,
    reviewCount: values.reviewCount ? Number(values.reviewCount) : undefined,
    // Lead inbox defaults to yours until they sign — set it later when they do.
    leadInboxEmail: values.leadInboxEmail || process.env.DEFAULT_LEAD_INBOX || '',
    primaryColor: values.primaryColor || null,
    facebookUrl: values.facebookUrl || null,
    instagramUrl: values.instagramUrl || null,
    heroImageUrl,
    status: 'demo'
  });

  // Sites are served on paths (ematrixgroup.com/s/<slug>), not subdomains —
  // no wildcard DNS — so redirect to the path that actually resolves.
  redirect(`${protocol}://${rootDomain}/s/${sanitized}`);
}

export type DeleteState = { error?: string; success?: string };

export async function deleteTenantAction(
  _prevState: DeleteState,
  formData: FormData
): Promise<DeleteState> {
  const subdomain = formData.get('subdomain') as string;
  await deleteTenant(subdomain);
  revalidatePath('/admin');
  return { success: 'Site deleted successfully' };
}

export type LeadState = { ok?: boolean; error?: string };

export async function submitLeadAction(
  _prevState: LeadState,
  formData: FormData
): Promise<LeadState> {
  const subdomain = (formData.get('subdomain') as string)?.trim();
  const name = (formData.get('name') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim();
  const message = ((formData.get('message') as string) ?? '').trim();

  if (!subdomain || !name || !phone) {
    return { ok: false, error: 'Please add your name and phone number.' };
  }

  const { getTenant } = await import('@/lib/tenants');
  const tenant = await getTenant(subdomain);
  if (!tenant) {
    return { ok: false, error: 'Something went wrong. Please call us instead.' };
  }

  const { ok } = await sendLead(tenant, { name, phone, message });
  if (!ok) {
    return { ok: false, error: 'Could not send. Please call us instead.' };
  }

  return { ok: true };
}
