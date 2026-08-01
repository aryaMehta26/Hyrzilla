import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

export default function Privacy() {
  return (
    <div className="relative z-10 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-left">
        <ScrollReveal>
          <h1 className="text-4xl font-extrabold text-text-primary mb-6 font-display">Privacy Policy</h1>
          <p className="text-text-tertiary text-xs font-mono mb-8">Last Updated: July 2026</p>
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="space-y-6 text-text-secondary text-sm leading-relaxed">
            <section className="glass-card">
              <h2 className="text-lg font-bold text-text-primary mb-2 font-display">1. Information Collection</h2>
              <p>We collect candidate contact information (name, email, phone), target engineering stack, experience level, and optional LinkedIn URL strictly for advisory and requisition placement.</p>
            </section>
            <section className="glass-card">
              <h2 className="text-lg font-bold text-text-primary mb-2 font-display">2. Data Security & Storage</h2>
              <p>Candidate submissions are stored securely in encrypted PostgreSQL database tables on Supabase. We do not sell or trade your data to third-party brokers.</p>
            </section>
            <section className="glass-card">
              <h2 className="text-lg font-bold text-text-primary mb-2 font-display">3. Contact & Inquiries</h2>
              <p>If you have questions regarding your data or wish to request deletion, contact our team at support@hyrzilla.com.</p>
            </section>
          </div>
        </ScrollReveal>

        <div className="mt-10">
          <Link to="/" className="text-accent-violet font-semibold hover:underline text-sm font-mono">← Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
