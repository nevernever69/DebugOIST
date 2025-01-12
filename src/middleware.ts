import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { locales } from './i18n'
import { localePrefix } from './navigation'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix
})

// Define protected routes with locale patterns
const isProtectedRoute = createRouteMatcher([
  '/:locale/dashboard(.*)',
  '/:locale/forum(.*)',
  '/dashboard(.*)',
  '/forum(.*)'
])

// Combine middlewares
async function middleware(req: NextRequest) {
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
    // Protected routes
    '/dashboard(.*)',
    '/forum(.*)',
    // Language routes with protected paths
    '/(fr|en|ja|de|ru|es|fa|ar)/dashboard(.*)',
    '/(fr|en|ja|de|ru|es|fa|ar)/forum(.*)',
    // Base language routes
    '/',
    '/(fr|en|ja|de|ru|es|fa|ar)/:path*',
    // Clerk's static file matcher
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API routes
    '/(api|trpc)(.*)'
  ]
}
