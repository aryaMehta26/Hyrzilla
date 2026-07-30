import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Search, TrendingUp, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="relative z-10 pt-28">
      <section className="py-20 text-center bg-bgDark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-5 py-2 rounded-full border border-[rgba(37,232,122,0.2)] bg-cardBg backdrop-blur-md mb-6">
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              About Hyrzilla
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Closing the gap between <br />
            <span className="h-green-gradient italic">talent & opportunity.</span>
          </h1>
          <p className="text-lg text-tMuted max-w-2xl mx-auto">
            Pairing real, tailored resume and interview preparation with genuine placement support — without copy-paste templates or recycled advice.
          </p>
        </div>
      </section>

      {/* Our Story (Distinct Contrast Background) */}
      <section className="py-24 bg-accentBg border-y border-[rgba(37,232,122,0.16)] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bento-card-react">
              <h2 className="text-3xl font-bold text-tMain mb-6">Our Story</h2>
              <p className="text-tMuted text-base leading-relaxed mb-4">
                Dhruv Vaghela started Hyrzilla in 2026 after watching too many talented people — engineers, analysts, designers — get passed over not because they lacked the skills, but because their resume never made it past a keyword filter, or they froze in an interview they were more than qualified for.
              </p>
              <p className="text-tMuted text-base leading-relaxed mb-4">
                Coming from a background as a QA Tester, Dhruv saw firsthand how brilliant technical minds struggled with ATS keyword systems and arbitrary recruitment hurdles. After helping colleagues and friends optimize their profiles and seeing their callback rates soar, it became clear this shouldn't be a favor — it should be a service done right.
              </p>
              <p className="text-tMuted text-base leading-relaxed">
                Today, Hyrzilla exists to close that gap — pairing real, tailored resume and interview work with genuine placement support, without the copy-paste templates and recycled advice that define most of this industry.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bento-card-react flex-1">
                <span className="text-xs font-bold text-brandGreen uppercase tracking-wider mb-2 block">Leadership</span>
                <h3 className="text-2xl font-bold text-tMain mb-1">Dhruv Vaghela</h3>
                <p className="text-brandGreen text-sm font-semibold mb-4">Founder & CEO</p>
                <p className="text-tMuted text-sm leading-relaxed">
                  With a professional background as a QA Tester, Dhruv brings a rigorous technical mindset and a deep understanding of software testing, ATS keyword algorithms, and recruitment workflows.
                </p>
              </div>

              <div className="bento-card-react flex-1">
                <h4 className="text-lg font-bold text-tMain mb-3">Where We Are Today</h4>
                <p className="text-tMuted text-sm leading-relaxed">
                  Hyrzilla is in its early days — we're a small, hands-on team working closely with a limited number of clients as we build out our process. That means when you work with us, you're not one of thousands in a queue; you're getting direct attention from the people running the company.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe (Dark Background) */}
      <section className="py-24 bg-bgDark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">What We Believe</h2>
            <p className="text-tMuted text-base md:text-lg max-w-xl mx-auto">Principles that guide our work with every candidate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <Lightbulb size={22} />
              </div>
              <h3 className="text-xl font-bold text-tMain mb-3">Careers aren't built from templates</h3>
              <p className="text-tMuted text-sm leading-relaxed">
                Every resume, every mock interview, every application strategy should reflect the person's actual experience — not a generic keyword-stuffed format.
              </p>
            </div>

            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <Search size={22} />
              </div>
              <h3 className="text-xl font-bold text-tMain mb-3">Transparency matters</h3>
              <p className="text-tMuted text-sm leading-relaxed">
                No hidden pricing, no vague promises. You should know exactly what you're getting and what it costs before you commit.
              </p>
            </div>

            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <TrendingUp size={22} />
              </div>
              <h3 className="text-xl font-bold text-tMain mb-3">Results are the only real measure</h3>
              <p className="text-tMuted text-sm leading-relaxed">
                We track outcomes, not just deliverables. Our goal is getting you real callbacks, interviews, and job offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-accentBg border-t border-[rgba(37,232,122,0.16)]">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-tMain mb-3">Have questions before you commit?</h3>
          <p className="text-tMuted text-base max-w-lg mx-auto mb-6">
            Reach out directly — we'd rather you ask everything upfront than be surprised later.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brandGreen text-black font-semibold shadow-emeraldGlow">
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
