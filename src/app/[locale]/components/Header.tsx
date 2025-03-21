'use client'
import { useState, useEffect } from 'react';
import { Link } from '@/src/navigation';
import { Menu, X, Github } from 'lucide-react';
import { SignInButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Protect } from '@clerk/nextjs';

export default function Header({ locale = 'en' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link lang={locale} href="/">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="ml-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Debug
            </span>
          </div>
        </Link>



<nav className="hidden md:flex space-x-8">
  <Link lang={locale} href="/about" className="text-sm uppercase tracking-wide text-gray-400 hover:text-white">
    About
  </Link>

  <Link lang={locale} href="/events" className="text-sm uppercase tracking-wide text-gray-400 hover:text-white">
    Events
  </Link>
  <SignedIn>
    <Link lang={locale} href="/dashboard" className="text-sm uppercase tracking-wide text-gray-400 hover:text-white">
      Dashboard
    </Link>
    <Protect fallback={null} role="org:admin">
      <Link lang={locale} href="/admin" className="text-sm uppercase tracking-wide text-gray-400 hover:text-white">
        Admin
      </Link>
    </Protect>
  </SignedIn>
</nav>
        

        {/* Right-side Actions */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hidden md:block bg-gradient-to-r from-blue-600 to-violet-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-9 h-9' } }} />
          </SignedIn>
          <a href="https://github.com/Nev-Labs" target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Github className="w-5 h-5 text-gray-400 hover:text-white" />
          </a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-400" /> : <Menu className="w-6 h-6 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link lang={locale} href="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-400 hover:text-white">
              About
            </Link>

            <Link lang={locale} href="/events" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-400 hover:text-white">
              Events
            </Link>
            <SignedIn>
              <Link lang={locale} href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-400 hover:text-white">
                Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}
