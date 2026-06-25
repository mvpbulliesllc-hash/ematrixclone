'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { deleteTenantAction, type DeleteState } from '@/app/actions';
import { NICHES } from '@/lib/niches';
import type { Tenant } from '@/lib/tenants';
import { rootDomain, protocol } from '@/lib/utils';

const STATUS_STYLES: Record<Tenant['status'], string> = {
  demo: 'bg-amber-100 text-amber-700',
  live: 'bg-green-100 text-green-700',
  churned: 'bg-gray-200 text-gray-600'
};

function DashboardHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold">Site Management</h1>
      <Link
        href={`${protocol}://${rootDomain}`}
        className="text-sm text-gray-500 transition-colors hover:text-gray-700"
      >
        {rootDomain}
      </Link>
    </div>
  );
}

function TenantGrid({
  tenants,
  action,
  isPending
}: {
  tenants: Tenant[];
  action: (formData: FormData) => void;
  isPending: boolean;
}) {
  if (tenants.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-gray-500">No sites have been created yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tenants.map((tenant) => (
        <Card key={tenant.subdomain}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{tenant.businessName}</CardTitle>
                <p className="text-sm text-gray-500">
                  {tenant.city}
                  {tenant.state ? `, ${tenant.state}` : ''} ·{' '}
                  {NICHES[tenant.niche].label}
                </p>
              </div>
              <form action={action}>
                <input type="hidden" name="subdomain" value={tenant.subdomain} />
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  disabled={isPending}
                  className="text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[tenant.status]}`}
              >
                {tenant.status}
              </span>
              <span className="text-sm text-gray-500">
                ★ {tenant.rating.toFixed(1)} · {tenant.reviewCount}
              </span>
            </div>
            <div className="mt-4">
              <a
                href={`${protocol}://${rootDomain}/s/${tenant.subdomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                Visit site →
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AdminDashboard({ tenants }: { tenants: Tenant[] }) {
  const [state, action, isPending] = useActionState<DeleteState, FormData>(
    deleteTenantAction,
    {}
  );

  return (
    <div className="relative space-y-6 p-4 md:p-8">
      <DashboardHeader />
      <TenantGrid tenants={tenants} action={action} isPending={isPending} />

      {state.error && (
        <div className="fixed bottom-4 right-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 shadow-md">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="fixed bottom-4 right-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 shadow-md">
          {state.success}
        </div>
      )}
    </div>
  );
}
