import { Phone, Star, MapPin, Clock, MessageSquare, CalendarCheck, Facebook, Instagram } from 'lucide-react';
import type { Tenant } from '@/lib/tenants';
import { NICHES } from '@/lib/niches';
import { ContactForm } from './contact-form';
import { AgentWidget } from './agent-widget';
import { NiaLauncher } from './nia-launcher';

function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function delay(ms: number): React.CSSProperties {
  return { animationDelay: `${ms}ms` };
}

// Social links. We seed who has a presence but rarely the exact URL, so when the
// real page isn't set we point the icon at a Facebook/Instagram search for the
// business — which lands on their page — instead of a dead link.
function socialLinks(t: Tenant) {
  const q = encodeURIComponent([t.businessName, t.city, t.state].filter(Boolean).join(' '));
  return [
    {
      label: 'Facebook',
      Icon: Facebook,
      href: t.facebookUrl || `https://www.facebook.com/search/top?q=${q}`
    },
    {
      label: 'Instagram',
      Icon: Instagram,
      href: t.instagramUrl || `https://www.instagram.com/explore/search/keyword/?q=${q}`
    }
  ];
}

// Fill copy-pack tokens. {{city}} falls back to the state when blank.
function fill(s: string, t: Tenant): string {
  return s
    .split('{{business}}').join(t.businessName)
    .split('{{city}}').join(t.city || t.state)
    .split('{{state}}').join(t.state)
    .split('{{phone}}').join(t.phone)
    .split('{{rating}}').join(t.rating.toFixed(1))
    .split('{{reviews}}').join(String(t.reviewCount));
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>
      [ {children} ]
    </span>
  );
}

const TRUST_WORDS = [
  'ANSWERED 24/7',
  'BOOKED ON THE SPOT',
  'TEXT-BACK IF YOU MISS US',
  'LOCALLY OWNED',
  'LICENSED & INSURED',
  'FAST RESPONSE'
];

export function TradeSite({ tenant }: { tenant: Tenant }) {
  const niche = NICHES[tenant.niche];
  const accent = tenant.primaryColor || niche.accent;
  const services = tenant.services ?? niche.services;
  const heroImage = tenant.heroImageUrl || niche.heroImage;
  const location = [tenant.city, tenant.state].filter(Boolean).join(', ');
  const tel = telHref(tenant.phone);
  const socials = socialLinks(tenant);
  const style = { ['--accent' as string]: accent } as React.CSSProperties;

  // Headline with the business name accented inside the sentence.
  const h1Parts = niche.h1.split('{{business}}');

  return (
    <main className="trade-site relative" style={style}>
      <div className="ts-noise" aria-hidden />

      {/* ── TOP BAR ── */}
      <header className="relative z-20 flex items-center justify-between border-b px-4 py-3 md:px-8" style={{ borderColor: 'var(--ts-border)' }}>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center" style={{ background: accent }}>
            <span className="text-sm leading-none text-white">{initials(tenant.businessName)}</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-[0.25em]">{tenant.businessName}</span>
            {location && (
              <span className="mt-0.5 text-[8px] uppercase tracking-[0.2em]" style={{ color: 'var(--ts-muted)' }}>
                {location}
              </span>
            )}
          </div>
        </div>
        <a href={tel} className="flex min-h-[36px] items-center gap-2 px-3 text-[10px] uppercase tracking-[0.2em] text-white md:px-5" style={{ background: accent }}>
          <Phone className="h-3.5 w-3.5" /> Call Now
        </a>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex min-h-[88svh] flex-col overflow-hidden">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundColor: niche.gradient[0],
            backgroundImage: `linear-gradient(180deg, rgba(8,8,8,0.30) 0%, rgba(8,8,8,0.55) 45%, rgba(8,8,8,0.92) 100%), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute left-0 top-[12%] z-10 h-[36vh] w-[3px] ts-rise" style={{ background: accent, ...delay(300) }} />
        {[20, 40, 60, 80].map((p, i) => (
          <div key={p} className="absolute top-0 hidden h-full w-px lg:block" style={{ left: `${p}%`, background: 'rgba(255,255,255,0.04)', ...delay(200 + i * 80) }} aria-hidden />
        ))}

        <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-10 md:px-8 md:pb-16">
          <div className="mx-auto w-full max-w-[1300px]">
            <div className="mb-5 inline-flex items-center gap-2 border px-3 py-1.5 ts-rise" style={{ borderColor: 'var(--ts-border)', background: 'rgba(0,0,0,0.4)', ...delay(150) }}>
              <span className="inline-flex items-center gap-0.5" style={{ color: accent }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5" fill={i < Math.round(tenant.rating) ? 'currentColor' : 'none'} />
                ))}
              </span>
              <span className="text-[11px] tracking-[0.15em]">
                {tenant.rating.toFixed(1)} STARS · {tenant.reviewCount} REVIEWS{tenant.city ? ` · ${tenant.city.toUpperCase()}` : ''}
              </span>
            </div>

            <h1 className="brut-display uppercase leading-[0.92] tracking-[-0.015em] text-[8.5vw] sm:text-[7vw] md:text-[5.4vw] lg:text-[4.6vw]" style={{ maxWidth: '18ch' }}>
              {h1Parts.map((part, i) => (
                <span key={i}>
                  {fill(part, tenant)}
                  {i < h1Parts.length - 1 && <span style={{ color: accent }}>{tenant.businessName}</span>}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-lg text-[12px] leading-relaxed ts-rise md:text-[14px]" style={{ color: 'rgba(250,250,250,0.72)', ...delay(500) }}>
              {fill(niche.sub, tenant)}
            </p>

            <div className="mt-7 flex flex-col gap-3 ts-rise sm:flex-row sm:items-center" style={delay(650)}>
              <a href={tel} className="inline-flex min-h-[52px] items-center justify-center gap-2 px-7 text-[13px] uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.02]" style={{ background: accent }}>
                <Phone className="h-4 w-4" /> Call {tenant.phone}
              </a>
              <a href="#contact" className="inline-flex min-h-[52px] items-center justify-center gap-2 border px-7 text-[13px] uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black" style={{ borderColor: 'var(--ts-fg)' }}>
                Request Service
              </a>
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] ts-rise" style={{ color: 'var(--ts-muted)', ...delay(750) }}>
              {tenant.rating.toFixed(1)} stars across {tenant.reviewCount} reviews{location ? ` in ${location}` : ''}.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full ts-expand" style={{ background: accent, ...delay(500) }} />
      </section>

      {/* ── TRUST MARQUEE ── */}
      <div className="overflow-hidden py-3" style={{ background: accent }}>
        <div className="flex whitespace-nowrap ts-marquee">
          {[...TRUST_WORDS, ...TRUST_WORDS].map((w, i) => (
            <span key={`${w}-${i}`} className="brut-display mx-6 text-2xl tracking-wide text-white md:mx-10 md:text-3xl">
              {w}
              <span className="mx-6 text-white/40 md:mx-10">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── THE GAP (problem) ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative flex flex-col justify-center px-4 py-12 md:px-12 md:py-24" style={{ background: 'var(--ts-surface)' }}>
          <div className="ts-stripes absolute right-0 top-0 hidden h-full w-16 opacity-30 md:block" aria-hidden />
          <div className="ts-rise">
            <Eyebrow>The Problem</Eyebrow>
            <h2 className="brut-display mt-3 text-4xl uppercase leading-[0.85] tracking-[-0.02em] md:text-6xl">
              The Job Goes To<br />Whoever <span style={{ color: accent }}>Picks Up</span>.
            </h2>
            <div className="my-6 h-[2px] w-14" style={{ background: accent }} />
            <p className="max-w-md text-[12px] leading-relaxed md:text-[14px]" style={{ color: 'var(--ts-muted)' }}>
              {fill(niche.gap, tenant)}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2" style={{ background: 'var(--ts-bg)' }}>
          {[
            { v: tenant.rating.toFixed(1), l: 'Star Rating' },
            { v: `${tenant.reviewCount}`, l: 'Reviews' },
            { v: '24/7', l: 'We Answer' },
            { v: '60s', l: 'Text-Back' }
          ].map((s, i) => (
            <div
              key={s.l}
              className="flex flex-col items-center justify-center px-3 py-10 text-center ts-rise md:py-16"
              style={{
                borderColor: 'var(--ts-border)',
                borderRightWidth: i % 2 === 0 ? 1 : 0,
                borderBottomWidth: i < 2 ? 1 : 0,
                ...delay(120 + i * 110)
              }}
            >
              <span className="brut-display text-5xl leading-none md:text-7xl">{s.v}</span>
              <span className="mt-2 text-[8px] uppercase tracking-[0.2em] md:text-[10px]" style={{ color: 'var(--ts-muted)' }}>
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE MACHINE BAND (solution / differentiator) ── */}
      <section className="relative overflow-hidden px-4 py-16 text-center md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none" aria-hidden>
          <span className="brut-display text-[44vw] leading-none md:text-[30vw]" style={{ color: 'rgba(255,255,255,0.02)' }}>
            24/7
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-3xl ts-rise">
          <Eyebrow>Always On</Eyebrow>
          <h2 className="brut-display mx-auto mt-5 text-5xl uppercase leading-[0.85] tracking-[-0.02em] md:text-8xl">
            Your Call Gets<br />Answered. <span style={{ color: accent }}>Every Time.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[12px] leading-relaxed md:text-sm" style={{ color: 'var(--ts-muted)' }}>
            Phones ring at the worst times. {tenant.businessName} answers anyway, day or
            night. If you ever can&apos;t get through, a text comes back in seconds — not a
            dead end. Book the whole job in one call.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Clock, label: 'Answered 24/7' },
              { icon: CalendarCheck, label: 'Booked On The Spot' },
              { icon: MessageSquare, label: 'Text-Back If You Miss Us' }
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 border px-4 py-2.5 text-[10px] uppercase tracking-[0.18em]" style={{ borderColor: 'var(--ts-border)' }}>
                <Icon className="h-4 w-4" style={{ color: accent }} /> {label}
              </span>
            ))}
          </div>

          <div className="mt-9">
            <AgentWidget agentId={tenant.retellAgentId} phone={tenant.phone} accent={accent} />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="border-t px-4 py-14 md:px-8 md:py-24" style={{ borderColor: 'var(--ts-border)' }}>
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-8 ts-rise">
            <Eyebrow>Services</Eyebrow>
            <h2 className="brut-display mt-3 text-6xl uppercase leading-none tracking-[-0.02em] md:text-8xl">
              What We Do<span style={{ color: accent }}>.</span>
            </h2>
          </div>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: 'var(--ts-border)' }}>
            {services.map((service, idx) => (
              <div key={service} className="group flex items-center gap-4 p-6 ts-rise md:p-7" style={{ background: 'var(--ts-bg)', ...delay(80 + idx * 70) }}>
                <span className="brut-display text-3xl leading-none md:text-4xl" style={{ color: accent }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="brut-display text-2xl uppercase leading-none tracking-[-0.01em] md:text-3xl">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="border-t px-4 py-14 md:px-8 md:py-24" style={{ borderColor: 'var(--ts-border)' }}>
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="ts-rise">
              <Eyebrow>Reviews</Eyebrow>
              <h2 className="brut-display mt-3 text-5xl uppercase leading-none tracking-[-0.02em] md:text-7xl">
                The Word<br />On The Street
              </h2>
            </div>
            <div className="ts-rise" style={delay(150)}>
              <span className="brut-display text-6xl leading-none md:text-8xl" style={{ color: accent }}>
                {tenant.rating.toFixed(1)}
              </span>
              <span className="ml-2 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--ts-muted)' }}>
                / {tenant.reviewCount} reviews
              </span>
            </div>
          </div>
          <div className="grid gap-px sm:grid-cols-3" style={{ background: 'var(--ts-border)' }}>
            {[
              'Called after hours and an actual person picked up. Out the next morning.',
              'Fair price, honest work, and they actually answered the phone. Rare.',
              'Booked the whole job in one call. Showed up on time and got it done.'
            ].map((quote, i) => (
              <figure key={quote} className="ts-rise p-6 md:p-8" style={{ background: 'var(--ts-bg)', ...delay(120 + i * 110) }}>
                <span className="inline-flex" style={{ color: accent }}>
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5" fill="currentColor" />
                  ))}
                </span>
                <blockquote className="mt-4 text-[13px] leading-relaxed" style={{ color: 'rgba(250,250,250,0.85)' }}>
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSE ── */}
      <section className="border-t px-4 py-16 text-center md:py-24" style={{ borderColor: 'var(--ts-border)', background: 'var(--ts-surface)' }}>
        <div className="mx-auto max-w-2xl ts-rise">
          <h2 className="brut-display text-5xl uppercase leading-[0.85] tracking-[-0.02em] md:text-7xl">
            {fill(niche.close, tenant)}
          </h2>
          <a href={tel} className="mt-8 inline-flex min-h-[56px] items-center justify-center gap-2 px-10 text-[14px] uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.02]" style={{ background: accent }}>
            <Phone className="h-5 w-5" /> Call {tenant.phone}
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="border-t px-4 py-14 md:px-8 md:py-24" style={{ borderColor: 'var(--ts-border)' }}>
        <div className="mx-auto grid max-w-[1300px] gap-12 md:grid-cols-2">
          <div className="ts-rise">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="brut-display mt-3 text-5xl uppercase leading-[0.85] tracking-[-0.02em] md:text-7xl">
              {tenant.businessName}
            </h2>
            {location && (
              <p className="mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em]" style={{ color: 'var(--ts-muted)' }}>
                <MapPin className="h-4 w-4" /> {location}
              </p>
            )}
            <a href={tel} className="mt-5 flex items-center gap-3 brut-display text-4xl md:text-5xl">
              <Phone className="h-6 w-6" style={{ color: accent }} /> {tenant.phone}
            </a>
            <p className="mt-6 max-w-sm text-[11px] uppercase leading-relaxed tracking-[0.15em]" style={{ color: 'var(--ts-muted)' }}>
              Answered 24/7 · Booked on the spot · Text-back if you miss us
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center border transition-transform hover:scale-[1.05]"
                  style={{ borderColor: 'var(--ts-border)' }}
                >
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </a>
              ))}
            </div>
          </div>

          <div className="ts-rise border p-6 md:p-8" style={{ borderColor: 'var(--ts-border)', background: 'var(--ts-surface)', ...delay(150) }}>
            <span className="brut-display text-2xl uppercase tracking-[0.02em]">Request service</span>
            <ContactForm subdomain={tenant.subdomain} accent={accent} />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t px-4 py-10 md:px-8" style={{ borderColor: 'var(--ts-border)', background: 'var(--ts-surface)' }}>
        <div className="mx-auto flex max-w-[1300px] flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <span className="brut-display text-xl uppercase tracking-[0.02em]">{tenant.businessName}</span>
            {location && (
              <span className="ml-3 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--ts-muted)' }}>
                {location}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center border transition-transform hover:scale-[1.05]"
                style={{ borderColor: 'var(--ts-border)' }}
              >
                <Icon className="h-4 w-4" style={{ color: accent }} />
              </a>
            ))}
            <a href={tel} className="ml-1 inline-flex min-h-[40px] items-center gap-2 px-4 text-[10px] uppercase tracking-[0.2em] text-white" style={{ background: accent }}>
              <Phone className="h-3.5 w-3.5" /> {tenant.phone}
            </a>
          </div>
        </div>
      </footer>

      {/* ── PERSISTENT AI RECEPTIONIST (Nia) ── */}
      <NiaLauncher accent={accent} phone={tenant.phone} />

      {/* ── STICKY MOBILE CALL BAR ── */}
      <a href={tel} className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 py-4 text-[13px] uppercase tracking-[0.2em] text-white shadow-2xl md:hidden" style={{ background: accent }}>
        <Phone className="h-4 w-4" /> Tap To Call
      </a>
      <div className="h-14 md:hidden" aria-hidden />
    </main>
  );
}
