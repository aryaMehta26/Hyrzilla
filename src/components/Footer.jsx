import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-purple-200/50 bg-purple-50/40 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal stagger={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4 group">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  H
                </div>
                <span className="text-indigo-950 font-bold text-lg font-display">Hyrzilla</span>
              </Link>
              <p className="text-purple-900/70 text-sm leading-relaxed max-w-xs">
                Career advisory & tech placement support engineered for software engineers, cloud architects, and data leads.
              </p>
            </div>

            {/* Nav */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-950 mb-5 font-mono">Navigation</h4>
              <ul className="space-y-3 text-sm text-purple-900/70">
                <li><Link to="/about" className="hover:text-indigo-950 transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-indigo-950 transition-colors">Services</Link></li>
                <li><Link to="/pricing" className="hover:text-indigo-950 transition-colors">Pricing & ROI</Link></li>
                <li><Link to="/insights" className="hover:text-indigo-950 transition-colors">Insights & FAQ</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-950 mb-5 font-mono">Connect</h4>
              <ul className="space-y-3 text-sm text-purple-900/70">
                <li><Link to="/contact" className="hover:text-indigo-950 transition-colors">Contact Advisory Team</Link></li>
                <li><Link to="/why-us" className="hover:text-indigo-950 transition-colors">Placement Analytics</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-950 mb-5 font-mono">Legal</h4>
              <ul className="space-y-3 text-sm text-purple-900/70">
                <li><Link to="/privacy" className="hover:text-indigo-950 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-indigo-950 transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Gradient Divider */}
        <div className="gradient-divider mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-purple-900/60 gap-4 font-mono">
          <p>© 2026 Hyrzilla LLC. All rights reserved.</p>
          <p>Engineered for technical professionals.</p>
        </div>
      </div>
    </footer>
  );
}
