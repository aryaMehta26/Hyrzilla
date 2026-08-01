import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

export default function Terms() {
  return (
    <div className="relative z-10 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-left">
        <ScrollReveal>
          <h1 className="text-4xl font-extrabold text-indigo-950 mb-6 font-display">Terms & Conditions</h1>
          <p className="text-purple-900/60 text-xs font-mono mb-8">Last Updated: July 2026</p>
        </ScrollReveal>

        <ScrollReveal stagger={0.08}>
          <div className="space-y-6 text-purple-900/80 text-sm leading-relaxed">
            <section className="glass-card">
              <h2 className="text-lg font-bold text-indigo-950 mb-2 font-display">1. Candidate Advisory Agreement</h2>
              <p>Hyrzilla LLC provides technical career advisory, resume architecture, 1-on-1 mock technical coaching, and candidate placement support. Upfront enrollment fees cover dedicated advisory bandwidth and initial profile calibration.</p>
            </section>
            <section className="glass-card">
              <h2 className="text-lg font-bold text-indigo-950 mb-2 font-display">2. Placement Success Fee Structure</h2>
              <p>Placement success fees (15%, 12%, or 10% depending on enrolled tier) are due exclusively after you accept an offer and begin your job start date. Success fees can be paid in flexible monthly installments post job start.</p>
            </section>
            <section className="glass-card">
              <h2 className="text-lg font-bold text-indigo-950 mb-2 font-display">3. Confidentiality & Data Use</h2>
              <p>Your candidate profile, resume data, and contact information are kept strictly confidential and shared only for active requisition placement upon your approval.</p>
            </section>
          </div>
        </ScrollReveal>

        <div className="mt-10">
          <Link to="/" className="text-violet-700 font-semibold hover:underline text-sm font-mono">← Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
