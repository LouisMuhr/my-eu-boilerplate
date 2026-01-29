import { NextResponse } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetTime) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(
  ip: string,
  { max, windowMs }: { max: number; windowMs: number }
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = ip;
  const entry = store.get(key);

  if (!entry || now > entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: max - 1, resetTime: now + windowMs };
  }

  entry.count++;
  if (entry.count > max) {
    return { success: false, remaining: 0, resetTime: entry.resetTime };
  }

  return { success: true, remaining: max - entry.count, resetTime: entry.resetTime };
}

export function rateLimitResponse(resetTime: number) {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
  return NextResponse.json(
    { error: "Zu viele Anfragen. Bitte warte einen Moment." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    }
  );
}

export function getIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
