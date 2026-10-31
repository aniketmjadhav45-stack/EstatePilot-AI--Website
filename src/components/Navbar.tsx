import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Building } from 'lucide-react';

interface NavbarProps {
  onOpenEarlyAccess: () => void;
  onOpenSignIn: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEarlyAccess, onOpenSignIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Features', href: '#features' },
    { label: 'AI Agents', href: '#ai-agents' },
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-slate-950 font-bold text-xl tracking-tight whitespace-nowrap shrink-0 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-md"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-950 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Building className="w-5 h-5 text-indigo-400" />
            </div>
            <span>
              EstatePilot <span className="text-indigo-600 font-semibold">AI</span>
            </span>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-sm py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Sign In & Primary CTA */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenSignIn}
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onOpenEarlyAccess}
              className="px-4.5 py-2 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 transition-all shadow-xs hover:shadow-md rounded-lg flex items-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-4 h-4 text-indigo-300" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenEarlyAccess}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-950 rounded-lg whitespace-nowrap cursor-pointer"
            >
              Early Access
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignIn();
                }}
                className="w-full text-center py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-200"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEarlyAccess();
                }}
                className="w-full py-2.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg shadow-xs flex items-center justify-center gap-2"
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-4 h-4 text-indigo-300" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
