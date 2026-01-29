import { NextRequest } from "next/server";
import { handlers } from "@/auth";
import { rateLimit, rateLimitResponse, getIP } from "@/lib/rate-limit";

const { GET: originalGET, POST: originalPOST } = handlers;

export async function GET(req: NextRequest) {
  const ip = getIP(req);
  const result = rateLimit(ip, { max: 10, windowMs: 60_000 });
  if (!result.success) return rateLimitResponse(result.resetTime);
  return originalGET(req);
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);
  const result = rateLimit(ip, { max: 10, windowMs: 60_000 });
  if (!result.success) return rateLimitResponse(result.resetTime);
  return originalPOST(req);
}
