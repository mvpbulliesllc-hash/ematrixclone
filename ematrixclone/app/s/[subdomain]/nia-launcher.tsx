'use client';

import { useState } from 'react';
import Script from 'next/script';
import { MessageSquare, Phone, X } from 'lucide-react';
import { VoiceAgent, HUME_ENABLED } from './voice-agent';

const CHATBASE_ID = process.env.NEXT_PUBLIC_CHATBASE_ID;

// Persistent, always-visible AI receptionist (Nia) on every demo — the feature
// being sold. Floating launcher opens a panel to talk (Hume voice) or chat
// (Chatbase). Degrades to a phone call / contact form until those are wired.
export function NiaLauncher({ accent, phone }: { accent: string; phone: string }) {
  const [open, setOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const tel = `tel:${phone.replace(/[^0-9+]/g, '')}`;

  function openChat() {
    if (typeof window !== 'undefined' && window.chatbase) {
      try {
        window.chatbase('open');
        setOpen(false);
        return;
      } catch {
        /* fall through */
      }
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  }

  function talk() {
    if (HUME_ENABLED) {
      setVoiceOpen(true);
      setOpen(false);
    } else {
      window.location.href = tel;
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed bottom-32 right-4 z-[90] w-[270px] border p-4 shadow-2xl md:bottom-24"
          style={{ background: '#0f0f0f', borderColor: '#262626', color: '#fafafa' }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: accent }} />
              Nia · AI Receptionist
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close" className="opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-4 text-[11px] leading-relaxed" style={{ color: '#9a9a9a' }}>
            I answer 24/7 — ask a question or start a call and I&apos;ll get you booked.
          </p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={talk}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 text-[11px] uppercase tracking-[0.15em] text-white"
              style={{ background: accent }}
            >
              <Phone className="h-4 w-4" /> Talk to Nia
            </button>
            <button
              type="button"
              onClick={openChat}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border text-[11px] uppercase tracking-[0.15em]"
              style={{ borderColor: '#262626' }}
            >
              <MessageSquare className="h-4 w-4" /> Chat with Nia
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-20 right-4 z-[90] flex items-center gap-2 px-5 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white shadow-2xl transition-transform hover:scale-[1.03] md:bottom-6"
        style={{ background: accent }}
        aria-label="Open AI receptionist"
      >
        <MessageSquare className="h-4 w-4" /> Ask Nia
      </button>

      <VoiceAgent accent={accent} open={voiceOpen} onClose={() => setVoiceOpen(false)} />

      {CHATBASE_ID && (
        <Script id="chatbase-loader" strategy="afterInteractive">
          {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...args)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(args)};window.chatbase=new Proxy(window.chatbase,{get(t,p){if(p==="q"){return t.q}return(...a)=>t(p,...a)}})}var onload=function(){var s=document.createElement("script");s.src="https://www.chatbase.co/embed.min.js";s.id="${CHATBASE_ID}";s.domain="www.chatbase.co";document.body.appendChild(s)};if(document.readyState==="complete"){onload()}else{window.addEventListener("load",onload)}})();`}
        </Script>
      )}
    </>
  );
}
