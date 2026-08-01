import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Calculator } from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import OfferNegotiatorWidget from '../components/OfferNegotiatorWidget';

export default function Pricing() {
  const [targetSalary, setTargetSalary] = useState(140000);
  const [selectedPlanFee, setSelectedPlanFee] = useState(12);
  const calculatedSuccessFee = Math.round((targetSalary * selectedPlanFee) / 100);

  const plans = [
    {
      tier: 'Tier 01',
      name: 'Market Readiness',
      desc: 'Resume rewrite, keyword optimization, and foundational prep.',
      upfront: '$499',
      fee: '15%',
      feeNum: 15,
      features: [
        'Complete resume rebuild',
        'Keyword & metric optimization',
        'LinkedIn profile cleanup',
        '1-on-1 mock interview session',
        'Job targeting & strategy guide'
      ],
      accent: false,
      popular: false,
    },
    {
      tier: 'Tier 02',
      name: 'Strategic Acceleration',
      desc: 'Full hands-on application support, interview prep, and offer negotiation.',
      upfront: '$1,499',
      fee: '12%',
      feeNum: 12,
      features: [
        'Everything in Market Readiness',
        'Active application support',
        'Unlimited mock interview coaching',
        'System design & coding practice',
        'Salary & offer negotiation guidance'
      ],
      accent: true,
      popular: true,
    },
    {
      tier: 'Tier 03',
      name: 'Executive Partnership',
      desc: 'Tailored placement for Staff, Principal, and Lead Engineers.',
      upfront: '$2,499',
      fee: '10%',
      feeNum: 10,
      features: [
        'Everything in Strategic Acceleration',
        'Dedicated senior advisor',
        'Executive resume & bio writing',
        'Direct referral targeting',
        'Background check & onboarding support'
      ],
      accent: false,
      popular: false,
    }
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">
            Simple Pricing
          </div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 font-display mb-6" delay={0.2}>
            Pay when you succeed.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 max-w-2xl mx-auto leading-relaxed">
              We charge a straightforward upfront fee to cover our time and resources, plus a placement fee that's only due after you accept an offer and start your new job.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal stagger={0.12}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {plans.map((plan, i) => (
                <div key={i} className={`${plan.accent ? 'glass-card-accent' : 'glass-card'} flex flex-col justify-between relative`}>
                  {plan.popular && (
                    <div className="absolute -top-3 right-6 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-extrabold tracking-wider uppercase font-mono shadow-md shadow-violet-500/20">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold text-purple-900/60 tracking-widest uppercase block mb-2 font-mono">{plan.tier}</span>
                    <h3 className="text-2xl font-bold text-indigo-950 mb-2 font-display">{plan.name}</h3>
                    <p className="text-purple-900/60 text-xs mb-6">{plan.desc}</p>

                    <div className="mb-6 p-4 rounded-2xl bg-white/90 border border-purple-200/60">
                      <div className="text-3xl font-extrabold text-indigo-950 mb-1 font-mono">
                        {plan.upfront} <span className="text-xs font-normal text-purple-900/60">upfront</span>
                      </div>
                      <div className="text-xs font-bold text-violet-700 font-mono">+ {plan.fee} Placement Fee (After Job Start)</div>
                    </div>

                    <ul className="space-y-3 text-sm text-purple-950 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2.5">
                          <Check size={15} className="text-emerald-600 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <MagneticButton>
                    <Link
                      to="/contact"
                      className={`w-full py-3.5 rounded-xl text-center text-sm font-semibold block transition-all ${
                        plan.accent
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 hover:shadow-violet-500/30'
                          : 'bg-white/80 border border-purple-200/70 text-purple-950 hover:border-violet-400'
                      }`}
                    >
                      Get Started with {plan.name}
                    </Link>
                  </MagneticButton>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Fee Calculator */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="w-10 h-10 rounded-xl bg-violet-100/80 border border-violet-200 flex items-center justify-center text-violet-700 mx-auto mb-4 shadow-sm">
                <Calculator size={20} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 font-display tracking-tight mb-3">
                Estimate your <span className="text-aurora">placement fee</span>
              </h2>
              <p className="text-purple-900/70 text-sm max-w-lg mx-auto">
                Adjust your expected salary to see what the post-hire placement fee would look like.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-8 text-left">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-purple-900/70 font-mono">Target Annual Salary:</label>
                    <span className="text-2xl font-extrabold text-aurora font-mono">${targetSalary.toLocaleString()}</span>
                  </div>
                  <input
                    type="range" min="90000" max="280000" step="5000"
                    value={targetSalary}
                    onChange={(e) => setTargetSalary(Number(e.target.value))}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                  {[{ label: 'Readiness', fee: 15 }, { label: 'Acceleration', fee: 12 }, { label: 'Executive', fee: 10 }].map((p) => (
                    <button
                      key={p.fee}
                      onClick={() => setSelectedPlanFee(p.fee)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedPlanFee === p.fee
                          ? 'border-violet-400 bg-violet-100/80 text-indigo-950 font-bold shadow-sm'
                          : 'border-purple-200/60 bg-white/70 text-purple-900/60 hover:border-violet-300'
                      }`}
                    >
                      <span className="block text-xs">{p.label}</span>
                      <span className="text-sm font-extrabold text-violet-700">{p.fee}% Fee</span>
                    </button>
                  ))}
                </div>

                <div className="pt-6 border-t border-purple-200/50 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <span className="text-xs font-bold text-purple-900/60 uppercase tracking-wider block font-mono">Estimated Fee After Hiring:</span>
                    <div className="text-4xl font-extrabold text-aurora font-mono">${calculatedSuccessFee.toLocaleString()}</div>
                    <span className="text-[11px] text-purple-900/60 font-mono">Payable in monthly installments once you start</span>
                  </div>
                  <div className="md:text-right">
                    <MagneticButton>
                      <Link to="/contact" className="btn-aurora inline-flex items-center gap-2">
                        Get Started <ArrowRight size={16} />
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <OfferNegotiatorWidget />
          </ScrollReveal>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 text-center px-6">
        <ScrollReveal>
          <div className="gradient-divider mb-12 max-w-sm mx-auto" />
          <ShieldCheck size={36} className="text-violet-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-indigo-950 mb-3 font-display">Zero Risk Placement Guarantee</h3>
          <p className="text-purple-900/70 text-sm max-w-lg mx-auto">
            If you don't land a job during our work together, you owe zero placement fees. Simple as that.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
