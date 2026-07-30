import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(37,232,122,0.14)] bg-bgDark/95 py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight mb-4">
              <span className="text-tMain font-bold text-xl">Hyrzilla</span>
            </Link>
            <p className="text-tMuted text-sm leading-relaxed max-w-xs">
              IT Talent Advisory & Tech Career Placement Services.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-tMain mb-4">Navigation</h4>
            <ul className="space-y-3 text-sm text-tMuted">
              <li><Link to="/about" className="hover:text-brandGreen transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brandGreen transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-brandGreen transition-colors">Pricing</Link></li>
              <li><Link to="/insights" className="hover:text-brandGreen transition-colors">Insights & FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-tMain mb-4">Connect</h4>
            <ul className="space-y-3 text-sm text-tMuted">
              <li><Link to="/contact" className="hover:text-brandGreen transition-colors">Contact Us</Link></li>
              <li><Link to="/why-us" className="hover:text-brandGreen transition-colors">Why Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-tMain mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-tMuted">
              <li><Link to="/privacy" className="hover:text-brandGreen transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brandGreen transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(37,232,122,0.14)] pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-tSub gap-4">
          <p>© 2026 Hyrzilla LLC. All rights reserved.</p>
          <p>Designed for technical professionals.</p>
        </div>
      </div>
    </footer>
  );
}
