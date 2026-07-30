import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Insights', path: '/insights' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-400 ${
        scrolled ? 'bg-bgDark/85 backdrop-blur-2xl border-b border-[rgba(37,232,122,0.14)]' : 'bg-transparent border-b border-[rgba(255,255,255,0.06)]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight">
            <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
              <circle cx="5"  cy="5"  r="2.5" fill="#25E87A"/>
              <circle cx="5"  cy="16" r="2.5" fill="#25E87A"/>
              <circle cx="5"  cy="27" r="2.5" fill="#25E87A"/>
              <circle cx="16" cy="16" r="2.5" fill="#25E87A"/>
              <circle cx="27" cy="5"  r="2.5" fill="#25E87A"/>
              <circle cx="27" cy="16" r="2.5" fill="#25E87A"/>
              <circle cx="27" cy="27" r="2.5" fill="#25E87A"/>
              <line x1="5" y1="5"  x2="5"  y2="27" stroke="#25E87A" strokeWidth="1.5"/>
              <line x1="27" y1="5" x2="27" y2="27" stroke="#25E87A" strokeWidth="1.5"/>
              <line x1="5" y1="16" x2="27" y2="16" stroke="#25E87A" strokeWidth="1.5"/>
            </svg>
            <span className="text-tMain font-bold text-xl">Hyrzilla</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    active ? 'text-tMain' : 'text-tMuted hover:text-tMain'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-brandGreen shadow-[0_0_10px_#25E87A]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-brandGreen text-black hover:scale-105 transition-all shadow-emeraldGlow hover:shadow-emeraldGlowLg"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-tMain p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bgDark flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-tMuted hover:text-tMain"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 rounded-full text-base font-semibold bg-brandGreen text-black shadow-emeraldGlow"
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}
