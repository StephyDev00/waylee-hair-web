import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const handleIntl = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin lives outside the locale prefix (owner-only tooling, no i18n).
  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return handleIntl(request);
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
