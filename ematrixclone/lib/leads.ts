import type { Tenant } from '@/lib/tenants';

// Lead delivery via the Resend REST API. Called from a Server Action.
// We hit the API with fetch instead of the `resend` SDK so there's no extra
// dependency to install and the build can't break on it. If RESEND_API_KEY isn't
// set yet, we log and report success so a live demo's form never errors out.

export type LeadInput = {
  name: string;
  phone: string;
  message: string;
};

const FROM_ADDRESS =
  process.env.LEAD_FROM_EMAIL || 'Leads <onboarding@resend.dev>';

export async function sendLead(
  tenant: Tenant,
  lead: LeadInput
): Promise<{ ok: boolean }> {
  const to = tenant.leadInboxEmail;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !to) {
    // Demo mode: nothing wired yet (or no inbox set). Don't fail the visitor.
    console.warn(
      `[lead] ${tenant.subdomain}: RESEND_API_KEY or lead inbox missing — lead not emailed.`,
      { name: lead.name, phone: lead.phone }
    );
    return { ok: true };
  }

  const subject = `New lead for ${tenant.businessName} (${tenant.subdomain})`;
  const text = [
    `New lead from ${tenant.businessName}'s site`,
    '',
    `Name:  ${lead.name}`,
    `Phone: ${lead.phone}`,
    '',
    'Message:',
    lead.message || '(none)',
    '',
    `Site: ${tenant.subdomain}`
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [to],
        reply_to: undefined,
        subject,
        text
      })
    });

    if (!res.ok) {
      console.error(
        `[lead] Resend responded ${res.status}: ${await res.text()}`
      );
      return { ok: false };
    }

    return { ok: true };
  } catch (err) {
    console.error('[lead] Failed to send via Resend', err);
    return { ok: false };
  }
}
