'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTenantAction, type CreateTenantState } from '@/app/actions';
import { NICHE_KEYS, NICHES } from '@/lib/niches';
import { rootDomain } from '@/lib/utils';

// The stamping form: one row in, one live site out. Status starts as `demo`.
export function SubdomainForm() {
  const [state, action, isPending] = useActionState<
    CreateTenantState,
    FormData
  >(createTenantAction, {});
  const v = state.values ?? {};

  return (
    <form action={action} className="space-y-4 text-left">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business name</Label>
        <Input
          id="businessName"
          name="businessName"
          placeholder="Aguilar's Septic"
          defaultValue={v.businessName}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subdomain">Site path</Label>
        <div className="flex items-center">
          <span className="flex min-h-[36px] items-center rounded-l-md border border-r-0 border-input bg-gray-100 px-3 text-gray-500">
            {rootDomain}/s/
          </span>
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="aguilars"
            defaultValue={v.subdomain}
            className="w-full rounded-l-none focus:z-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="niche">Niche</Label>
        <select
          id="niche"
          name="niche"
          defaultValue={v.niche || ''}
          required
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="" disabled>
            Select a trade
          </option>
          {NICHE_KEYS.map((key) => (
            <option key={key} value={key}>
              {NICHES[key].label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            placeholder="Bakersfield"
            defaultValue={v.city}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            placeholder="CA"
            defaultValue={v.state}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="(661) 555-0123"
          defaultValue={v.phone}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="4.8"
            defaultValue={v.rating}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reviewCount">Reviews</Label>
          <Input
            id="reviewCount"
            name="reviewCount"
            type="number"
            min="0"
            placeholder="89"
            defaultValue={v.reviewCount}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="primaryColor">Color profile</Label>
        <select
          id="primaryColor"
          name="primaryColor"
          defaultValue={v.primaryColor || ''}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
        >
          <option value="">Niche default</option>
          <option value="#dc2626">Red</option>
          <option value="#ea580c">Orange</option>
          <option value="#b45309">Amber</option>
          <option value="#15803d">Green</option>
          <option value="#0891b2">Cyan</option>
          <option value="#1d4ed8">Blue</option>
          <option value="#7c3aed">Purple</option>
          <option value="#be123c">Crimson</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="facebookUrl">Facebook URL (optional)</Label>
          <Input
            id="facebookUrl"
            name="facebookUrl"
            type="url"
            placeholder="facebook.com/theirpage"
            defaultValue={v.facebookUrl}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagramUrl">Instagram URL (optional)</Label>
          <Input
            id="instagramUrl"
            name="instagramUrl"
            type="url"
            placeholder="instagram.com/theirhandle"
            defaultValue={v.instagramUrl}
          />
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Leave blank and the site links a Facebook/Instagram search for the
        business name — paste the real page URL when you have it.
      </p>

      <div className="space-y-2">
        <Label htmlFor="leadInboxEmail">Lead inbox email (optional)</Label>
        <Input
          id="leadInboxEmail"
          name="leadInboxEmail"
          type="email"
          placeholder="you@yourbrand.com"
          defaultValue={v.leadInboxEmail}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="heroImage">Hero photo (optional)</Label>
        <Input id="heroImage" name="heroImage" type="file" accept="image/*" />
        <p className="text-xs text-gray-500">
          Upload a custom hero image, or leave blank to use the trade default.
        </p>
      </div>

      {state.error && <div className="text-sm text-red-500">{state.error}</div>}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Building…' : 'Build site'}
      </Button>
    </form>
  );
}
