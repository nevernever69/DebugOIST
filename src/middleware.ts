import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from './i18n'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always' // Keep locale prefix for language routes
})

// Define protected routes with locale patterns, now including /admin
const isProtectedRoute = createRouteMatcher([
  '/:locale/dashboard(.*)',
  '/:locale/forum(.*)',
  '/:locale/admin(.*)', // Added locale admin routes
  '/dashboard(.*)',
  '/forum(.*)',
  '/admin(.*)'          // Added admin routes
])

// Combine middlewares
async function middleware(req: NextRequest) {
  // Handle the landing page separately for '/'
  if (req.nextUrl.pathname === '/') {
    return NextResponse.next() // Let Next.js handle it via pages/index.tsx
  }

  const intlResponse = await intlMiddleware(req)

  // @ts-ignore
  return clerkMiddleware(async auth => {
    if (isProtectedRoute(req)) {
      await auth.protect()
    }
    return intlResponse
  })(req)
}

export default middleware

export const config = {
  matcher: [
    // Landing page route (let Next.js handle it)
    '/',
    // Protected routes
    '/dashboard(.*)',
    '/forum(.*)',
    '/admin(.*)', // Ensure admin routes are matched
    // Language routes with protected paths
    '/(fr|en|ja|de|ru|es|fa|ar)/dashboard(.*)',
    '/(fr|en|ja|de|ru|es|fa|ar)/forum(.*)',
    '/(fr|en|ja|de|ru|es|fa|ar)/admin(.*)', // Locale-specific admin
    // Base language routes
    '/(fr|en|ja|de|ru|es|fa|ar)/:path*',
    // Clerk's static file matcher
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API routes
    '/(api|trpc)(.*)'
  ]
}
