import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';

export default function About() {
  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">
            About Hyrzilla
          </div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 font-display mb-6" delay={0.2}>
            Helping engineers get the roles they deserve.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 max-w-2xl mx-auto leading-relaxed">
              We started Hyrzilla because good engineers get rejected for silly reasons — bad keyword formatting, poor resume structure, or interview nervousness. We're here to fix that.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="glass-card p-8 md:p-12 text-left">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-300 flex items-center justify-center text-3xl font-extrabold text-violet-800 mx-auto mb-4 font-mono shadow-sm">
                    DV
                  </div>
                  <h3 className="text-xl font-bold text-indigo-950 font-display">Dhruv Vaghela</h3>
                  <span className="text-xs font-bold text-violet-700 uppercase tracking-widest block font-mono">Founder</span>
                  <span className="text-xs text-purple-900/60 block mt-1 font-mono">Former QA Engineer & Talent Advisor</span>
                </div>

                <div className="md:col-span-8 space-y-4 text-purple-900/80 text-sm leading-relaxed">
                  <h4 className="text-xl font-bold text-indigo-950 font-display">Why I Started Hyrzilla</h4>
                  <p>
                    I spent years working in tech as a QA Engineer. Over time, I watched smart, capable developer friends apply for hundreds of jobs and get zero responses. When I looked at their resumes, I realized the problem wasn't their skills — it was how their experience was written.
                  </p>
                  <p>
                    Their resumes were full of vague sentences that automated screeners threw out and hiring managers found boring. I started helping them rewrite their bullet points using real numbers, infrastructure scale, and specific outcomes. Suddenly, their callback rates jumped.
                  </p>
                  <p className="text-indigo-950 font-medium italic bg-purple-50/60 p-4 rounded-xl border border-purple-200/50">
                    "No one gets hired off generic resume templates. Every candidate's experience needs to be written with the exact metrics and clarity that hiring managers care about."
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit">How We Think</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight">
                Our core <span className="text-aurora">principles</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="glass-card">
                <span className="text-xs font-bold text-violet-700 uppercase tracking-widest block mb-2 font-mono">01</span>
                <h3 className="text-xl font-bold text-indigo-950 mb-3 font-display">Custom Work Only</h3>
                <p className="text-purple-900/70 text-sm leading-relaxed">
                  No automated tools or copy-paste templates. Every resume is rewritten by hand to match your real achievements.
                </p>
              </div>
              <div className="glass-card-accent">
                <span className="text-xs font-bold text-violet-700 uppercase tracking-widest block mb-2 font-mono">02</span>
                <h3 className="text-xl font-bold text-indigo-950 mb-3 font-display">Honest Coaching</h3>
                <p className="text-purple-900/80 text-sm leading-relaxed">
                  We don't just tell you what you want to hear. We pinpoint your weak spots in interviews and work through them together.
                </p>
              </div>
              <div className="glass-card">
                <span className="text-xs font-bold text-violet-700 uppercase tracking-widest block mb-2 font-mono">03</span>
                <h3 className="text-xl font-bold text-indigo-950 mb-3 font-display">Fair Pricing</h3>
                <p className="text-purple-900/70 text-sm leading-relaxed">
                  Our success fee is tied directly to you getting hired. If you don't start a job, you don't pay the placement fee.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <ScrollReveal>
          <div className="gradient-divider mb-12 max-w-sm mx-auto" />
          <ShieldCheck size={36} className="text-violet-600 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-950 mb-4 font-display">Let's talk about your career</h3>
          <p className="text-purple-900/80 max-w-lg mx-auto mb-8">Get in touch with us for a straightforward review of your situation.</p>
          <MagneticButton>
            <Link to="/contact" className="btn-aurora flex items-center gap-2 mx-auto w-fit">Get In Touch <ArrowRight size={16} /></Link>
          </MagneticButton>
        </ScrollReveal>
      </section>
    </div>
  );
}
