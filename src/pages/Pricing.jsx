import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="relative z-10 pt-28">
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-5 py-2 rounded-full border border-[rgba(37,232,122,0.2)] bg-cardBg backdrop-blur-md mb-6">
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              Transparent Candidate Plans
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Candidate <span className="h-green-gradient italic">Enrollment Pricing.</span>
          </h1>
          <p className="text-lg text-tMuted max-w-2xl mx-auto">
            Clear, upfront pricing for tech candidates seeking resume building, 1-on-1 interview preparation, and dedicated job placement support.
          </p>
        </div>
      </section>

      {/* Candidate Pricing Grid */}
      <section className="py-24 bg-accentBg border-y border-[rgba(37,232,122,0.16)] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Choose Your Enrollment Plan</h2>
            <p className="text-tMuted text-base max-w-2xl mx-auto">
              Upfront payment covers initial resume architecture & onboarding support, followed by a placement percentage fee once you get hired.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Market Readiness */}
            <div className="bento-card-react flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-tMain mb-2">Market Readiness</h3>
                <div className="text-4xl font-extrabold text-tMain my-4 flex items-baseline gap-2">
                  $499 <span className="text-sm font-medium text-tSub">upfront</span>
                </div>
                <p className="text-sm text-tMuted pb-6 mb-6 border-b border-[rgba(37,232,122,0.14)] leading-relaxed">
                  Essential resume rebuilding and job application support to launch your job search quickly.
                </p>
                <ul className="space-y-3 text-sm text-tMuted mb-8">
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> <strong className="text-tMain">15%</strong> placement success fee upon job start</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Professional Resume Architecture</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> LinkedIn Profile Optimization</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Active Job Application Placement</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Onboarding Verification Support</li>
                  <li className="flex items-center gap-2.5 text-tSub line-through">1-on-1 Mock Interview Sessions</li>
                  <li className="flex items-center gap-2.5 text-tSub line-through">Technical Panel Preparation</li>
                  <li className="flex items-center gap-2.5 text-tSub line-through">Full Offer & Salary Negotiation</li>
                </ul>
              </div>
              <Link to="/contact" className="w-full text-center py-3 rounded-xl border border-[rgba(37,232,122,0.3)] text-tMain font-semibold text-sm hover:border-brandGreen hover:bg-[rgba(37,232,122,0.08)] transition-all">
                Enroll Now
              </Link>
            </div>

            {/* Strategic Acceleration */}
            <div className="bento-card-react flex flex-col justify-between border-[rgba(37,232,122,0.4)] bg-[rgba(14,34,23,0.85)] relative">
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[rgba(37,232,122,0.15)] border border-[rgba(37,232,122,0.4)] text-[10px] font-bold text-brandGreen uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-bold text-brandGreen mb-2">Strategic Acceleration</h3>
                <div className="text-4xl font-extrabold text-brandGreen my-4 flex items-baseline gap-2">
                  $1,499 <span className="text-sm font-medium text-tSub">upfront</span>
                </div>
                <p className="text-sm text-tMuted pb-6 mb-6 border-b border-[rgba(37,232,122,0.14)] leading-relaxed">
                  Comprehensive support including priority application placement, resume tailoring, and interview prep.
                </p>
                <ul className="space-y-3 text-sm text-tMuted mb-8">
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> <strong className="text-tMain">12%</strong> placement success fee upon job start</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Professional Resume Architecture</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> LinkedIn & Portal Optimization</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Priority Job Applications & Outreach</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> 1-on-1 Mock Interview Coaching</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Salary Negotiation Assistance</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Onboarding Verification Support</li>
                  <li className="flex items-center gap-2.5 text-tSub line-through">Dedicated Recruiter Advisor</li>
                </ul>
              </div>
              <Link to="/contact" className="w-full text-center py-3 rounded-xl bg-brandGreen text-black font-semibold text-sm shadow-emeraldGlow">
                Enroll Now
              </Link>
            </div>

            {/* Executive Partnership */}
            <div className="bento-card-react flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-tMain mb-2">Executive Partnership</h3>
                <div className="text-4xl font-extrabold text-tMain my-4 flex items-baseline gap-2">
                  $2,499 <span className="text-sm font-medium text-tSub">upfront</span>
                </div>
                <p className="text-sm text-tMuted pb-6 mb-6 border-b border-[rgba(37,232,122,0.14)] leading-relaxed">
                  End-to-end dedicated guidance, technical mock panels, and personalized referral assistance.
                </p>
                <ul className="space-y-3 text-sm text-tMuted mb-8">
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> <strong className="text-tMain">10%</strong> placement success fee upon job start</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Professional Resume Architecture</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Full Portal & Portfolio Optimization</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> High-Volume & Direct Outreach</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Dedicated Recruiter Advisor</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Technical Panel Practice</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Full Salary & Offer Negotiation</li>
                  <li className="flex items-center gap-2.5"><Check size={16} className="text-brandGreen shrink-0" /> Onboarding Verification Support</li>
                </ul>
              </div>
              <Link to="/contact" className="w-full text-center py-3 rounded-xl border border-[rgba(37,232,122,0.3)] text-tMain font-semibold text-sm hover:border-brandGreen hover:bg-[rgba(37,232,122,0.08)] transition-all">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee & Transparency Note */}
      <section className="py-20 text-center bg-bgDark">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-tMain mb-3">Honest, Transparent Partnership</h3>
          <p className="text-tMuted text-base leading-relaxed mb-6">
            Upfront plan fees cover initial profile architecture, portal setup, and onboarding verification support. Placement fees are due exclusively after your official start date.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brandGreen text-black font-semibold shadow-emeraldGlow">
            Get Started Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
