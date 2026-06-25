'use client';

import { useActionState } from 'react';
import { submitLeadAction, type LeadState } from '@/app/actions';

export function ContactForm({
  subdomain,
  accent
}: {
  subdomain: string;
  accent: string;
}) {
  const [state, action, isPending] = useActionState<LeadState, FormData>(
    submitLeadAction,
    {}
  );

  if (state.ok) {
    return (
      <p className="mt-5 border p-4 text-[12px] uppercase tracking-[0.15em]" style={{ borderColor: accent, color: accent }}>
        Got it — we&apos;ll call you shortly.
      </p>
    );
  }

  const inputClass =
    'w-full border bg-transparent px-3 py-3 text-[13px] text-[color:var(--ts-fg)] outline-none placeholder:text-[color:var(--ts-muted)] focus:border-[color:var(--accent)]';

  return (
    <form action={action} className="mt-5 space-y-3">
      <input type="hidden" name="subdomain" value={subdomain} />
      <input name="name" required placeholder="YOUR NAME" className={inputClass} style={{ borderColor: 'var(--ts-border)' }} />
      <input name="phone" type="tel" required placeholder="PHONE NUMBER" className={inputClass} style={{ borderColor: 'var(--ts-border)' }} />
      <textarea name="message" rows={3} placeholder="HOW CAN WE HELP?" className={inputClass} style={{ borderColor: 'var(--ts-border)' }} />
      {state.error && (
        <p className="text-[12px]" style={{ color: accent }}>{state.error}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 text-[12px] uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
        style={{ background: accent }}
      >
        {isPending ? 'Sending…' : 'Get My Free Estimate'}
      </button>
    </form>
  );
}
