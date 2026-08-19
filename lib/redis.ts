import { Redis } from "@upstash/redis";

// Supports whichever env var names the Vercel storage integration sets.
// "Upstash for Redis" (Vercel Marketplace) typically sets UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN. Some integrations alias these as KV_REST_API_URL / KV_REST_API_TOKEN.
const url =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

if (!url || !token) {
  console.warn(
    "[redis] Missing Upstash env vars. Add the 'Upstash for Redis' storage integration in Vercel " +
      "(Project → Storage → Create Database) and redeploy."
  );
}

export const redis = new Redis({
  url: url || "",
  token: token || "",
});

export const SIGNUPS_KEY = "westside-snacks:signups:fall-2026";
