import Redis from 'ioredis';

// Connects to a standard Redis instance via REDIS_URL (redis://… or rediss://…).
// We expose a tiny Upstash-compatible surface (get/set/keys/mget/del that
// auto-JSON-encode) so the rest of the app stays unchanged.
const url = process.env.REDIS_URL;

const client = url
  ? new Redis(url, { maxRetriesPerRequest: 3, lazyConnect: true })
  : null;

// Keep connection errors from bubbling up as unhandled events and crashing the
// serverless function; individual commands still reject and are handled inline.
client?.on('error', (err) => {
  console.error('[redis] connection error', err.message);
});

function requireClient(): Redis {
  if (!client) {
    throw new Error('REDIS_URL is not set');
  }
  return client;
}

export const redis = {
  async get<T = unknown>(key: string): Promise<T | null> {
    const raw = await requireClient().get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  },

  async set(key: string, value: unknown): Promise<void> {
    await requireClient().set(key, JSON.stringify(value));
  },

  async del(key: string): Promise<void> {
    await requireClient().del(key);
  },

  async keys(pattern: string): Promise<string[]> {
    return requireClient().keys(pattern);
  },

  async mget<T = unknown>(...keys: string[]): Promise<(T | null)[]> {
    if (keys.length === 0) return [];
    const raws = await requireClient().mget(...keys);
    return raws.map((raw) => (raw ? (JSON.parse(raw) as T) : null));
  },

  /** Close the connection (used by one-off scripts so they exit cleanly). */
  async close(): Promise<void> {
    if (client) await client.quit();
  }
};
