'use client';

import { useState } from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { VoiceAgent, HUME_ENABLED } from './voice-agent';

declare global {
  interface Window {
    chatbase?: (...args: unknown[]) => void;
  }
}

// The AI receptionist: a text agent (Chatbase) + an in-page voice agent (Hume
// EVI). Both activate from env vars; until then the voice button falls back to
// a normal phone call.
export function AgentWidget({
  phone,
  accent,
  agentId
}: {
  phone: string;
  accent: string;
  agentId: string | null;
}) {
  const tel = `tel:${phone.replace(/[^0-9+]/g, '')}`;
  const [voiceOpen, setVoiceOpen] = useState(false);

  function openChat() {
    if (typeof window !== 'undefined' && window.chatbase) {
      try {
        window.chatbase('open');
        return;
      } catch {
        /* fall through */
      }
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={openChat}
          className="inline-flex min-h-[48px] items-center gap-2 px-6 text-[12px] uppercase tracking-[0.2em] text-white transition-transform hover:scale-[1.02]"
          style={{ background: accent }}
        >
          <MessageSquare className="h-4 w-4" /> Chat With Our AI
        </button>

        {HUME_ENABLED ? (
          <button
            type="button"
            onClick={() => setVoiceOpen(true)}
            className="inline-flex min-h-[48px] items-center gap-2 border px-6 text-[12px] uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: 'var(--ts-fg)' }}
          >
            <Phone className="h-4 w-4" /> Talk To Our AI Receptionist
          </button>
        ) : (
          <a
            href={tel}
            className="inline-flex min-h-[48px] items-center gap-2 border px-6 text-[12px] uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: 'var(--ts-fg)' }}
          >
            <Phone className="h-4 w-4" /> Talk To Our Receptionist
          </a>
        )}
      </div>
      <p className="mt-3 text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--ts-muted)' }}>
        {HUME_ENABLED || agentId ? 'AI receptionist · live' : 'Answered 24/7 — chat or call'}
      </p>

      <VoiceAgent accent={accent} open={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </>
  );
}
