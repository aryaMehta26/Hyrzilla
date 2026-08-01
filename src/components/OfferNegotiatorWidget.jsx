import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

export default function OfferNegotiatorWidget() {
  const [baseSalary, setBaseSalary] = useState(150000);
  const [signingBonus, setSigningBonus] = useState(15000);
  const [annualEquity, setAnnualEquity] = useState(25000);

  const year1Value = baseSalary + signingBonus + annualEquity;
  const threeYearTotal = (baseSalary * 3) + signingBonus + (annualEquity * 3);
  const suggestedCounterBase = Math.round(baseSalary * 1.12);
  const suggestedCounterEquity = Math.round(annualEquity * 1.2);

  return (
    <div className="glass-card my-8 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <DollarSign size={14} className="text-accent-emerald" />
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan font-mono">
            3-Year Offer & Counter-Offer Calculator
          </span>
        </div>
        <span className="text-xs text-text-tertiary font-mono">Compensation Tool</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-5">
          {[
            { label: 'Base Salary', value: baseSalary, set: setBaseSalary, min: 100000, max: 260000, step: 5000 },
            { label: 'Signing / Relocation Bonus', value: signingBonus, set: setSigningBonus, min: 0, max: 50000, step: 2500 },
            { label: 'Annual Equity / RSU Grant', value: annualEquity, set: setAnnualEquity, min: 0, max: 90000, step: 5000 },
          ].map((s, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs font-semibold text-text-secondary mb-2">
                <span>{s.label}:</span>
                <span className="font-bold text-aurora font-mono">${s.value.toLocaleString()}</span>
              </div>
              <input
                type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                onChange={(e) => s.set(Number(e.target.value))}
              />
            </div>
          ))}
        </div>

        <div className="lg:col-span-6 bg-surface border border-white/[0.04] rounded-2xl p-6">
          <div className="mb-4">
            <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block font-mono">First Year Value:</span>
            <div className="text-3xl font-extrabold text-text-primary font-mono">${year1Value.toLocaleString()}</div>
          </div>

          <div className="mb-6 p-4 rounded-xl bg-accent-violet/[0.04] border border-accent-violet/10">
            <span className="text-xs font-bold text-accent-violet uppercase tracking-wider block mb-1 font-mono">3-Year Cumulative Total:</span>
            <div className="text-3xl font-extrabold text-aurora font-mono">${threeYearTotal.toLocaleString()}</div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] text-xs text-text-secondary">
            <strong className="text-text-primary block mb-1">Target Counter-Offer:</strong>
            <p className="font-mono bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
              Counter for <strong className="text-accent-cyan">${suggestedCounterBase.toLocaleString()} Base</strong> + <strong className="text-accent-cyan">${suggestedCounterEquity.toLocaleString()} Equity</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
