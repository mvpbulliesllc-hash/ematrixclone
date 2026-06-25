'use client';

import { useCallback, useState } from 'react';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import { Phone, X, Mic, Loader2 } from 'lucide-react';

const CONFIG_ID = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;

function CallPanel({ accent, onClose }: { accent: string; onClose: () => void }) {
  const { connect, disconnect, status, isMuted, mute, unmute } = useVoice();
  const [starting, setStarting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const start = useCallback(async () => {
    setErr(null);
    setStarting(true);
    try {
      const res = await fetch('/api/hume-token');
      if (!res.ok) throw new Error('token');
      const { accessToken } = await res.json();
      await connect({
        auth: { type: 'accessToken', value: accessToken },
        configId: CONFIG_ID
      });
    } catch {
      setErr('Could not start the call. Check mic permissions and try again.');
    } finally {
      setStarting(false);
    }
  }, [connect]);

  const connected = status.value === 'connected';

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <div className="w-full max-w-sm border p-6 text-center" style={{ background: 'var(--ts-surface, #101010)', borderColor: 'var(--ts-border, #262626)', color: 'var(--ts-fg, #fafafa)' }}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: accent }}>
            AI Receptionist
          </span>
          <button onClick={() => { disconnect(); onClose(); }} aria-label="Close" className="opacity-70 hover:opacity-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: connected ? accent : 'transparent', border: `2px solid ${accent}` }}>
            <Mic className="h-8 w-8" style={{ color: connected ? '#fff' : accent }} />
          </div>
          <p className="mt-5 text-[12px] uppercase tracking-[0.2em]" style={{ color: '#9a9a9a' }}>
            {starting
              ? 'Connecting…'
              : connected
                ? 'Listening — start talking'
                : status.value === 'connecting'
                  ? 'Connecting…'
                  : 'Tap to start the call'}
          </p>
          {err && <p className="mt-3 text-[12px]" style={{ color: accent }}>{err}</p>}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {!connected ? (
            <button
              type="button"
              onClick={start}
              disabled={starting || status.value === 'connecting'}
              className="inline-flex min-h-[48px] items-center gap-2 px-7 text-[12px] uppercase tracking-[0.2em] text-white disabled:opacity-60"
              style={{ background: accent }}
            >
              {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />}
              Start Call
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => (isMuted ? unmute() : mute())}
                className="inline-flex min-h-[48px] items-center gap-2 border px-5 text-[12px] uppercase tracking-[0.2em]"
                style={{ borderColor: 'var(--ts-border, #262626)' }}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <button
                type="button"
                onClick={() => { disconnect(); onClose(); }}
                className="inline-flex min-h-[48px] items-center gap-2 px-7 text-[12px] uppercase tracking-[0.2em] text-white"
                style={{ background: '#b91c1c' }}
              >
                <X className="h-4 w-4" /> End
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// In-page Hume EVI voice call. Renders nothing until opened.
export function VoiceAgent({ accent, open, onClose }: { accent: string; open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <VoiceProvider>
      <CallPanel accent={accent} onClose={onClose} />
    </VoiceProvider>
  );
}

export const HUME_ENABLED = Boolean(CONFIG_ID);
