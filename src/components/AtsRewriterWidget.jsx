import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AtsRewriterWidget() {
  const [selectedBullet, setSelectedBullet] = useState(0);

  const bullets = [
    {
      before: "Worked on backend services using Node.js and MongoDB.",
      after: "Built and maintained 14 backend services handling 2.3M daily requests. Reduced response times from 420ms to 85ms by optimizing database queries and implementing caching.",
      salaryLift: "+$18,500 / yr",
      passRate: "34% → 96%"
    },
    {
      before: "Managed cloud infrastructure on AWS.",
      after: "Managed AWS infrastructure across 3 production environments with 99.97% uptime. Automated all deployments using Terraform, cutting release time from 45 minutes to 8 minutes.",
      salaryLift: "+$24,000 / yr",
      passRate: "28% → 94%"
    },
    {
      before: "Built data pipelines for the analytics team.",
      after: "Designed data pipelines processing 4.2TB daily. Reduced pipeline runtime by 67% and enabled real-time reporting for 12 internal teams that previously waited 24 hours for data.",
      salaryLift: "+$22,800 / yr",
      passRate: "31% → 97%"
    }
  ];

  const current = bullets[selectedBullet];

  return (
    <div className="glass-card text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan font-mono">
          Resume Before & After
        </span>
        <span className="text-xs text-text-tertiary font-mono">Try each sample</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {bullets.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedBullet(i)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedBullet === i
                ? 'bg-gradient-to-r from-accent-violet to-accent-cyan text-white shadow-lg shadow-accent-violet/20'
                : 'bg-white/[0.03] border border-white/[0.06] text-text-tertiary hover:text-text-secondary'
            }`}
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/10">
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2 font-mono">Before:</span>
          <p className="text-text-secondary text-sm leading-relaxed italic">"{current.before}"</p>
        </div>

        <div className="p-5 rounded-2xl bg-accent-emerald/[0.04] border border-accent-emerald/10">
          <span className="text-xs font-bold text-accent-emerald uppercase tracking-wider block mb-2 font-mono">After:</span>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedBullet}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-text-primary text-sm leading-relaxed font-medium"
            >
              "{current.after}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-white/[0.04] text-center">
          <span className="text-xs text-text-tertiary block mb-1 font-mono">Estimated Salary Impact:</span>
          <div className="text-xl font-extrabold text-aurora font-mono">{current.salaryLift}</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-white/[0.04] text-center">
          <span className="text-xs text-text-tertiary block mb-1 font-mono">Resume Pass Rate:</span>
          <div className="text-xl font-extrabold text-accent-cyan font-mono">{current.passRate}</div>
        </div>
      </div>
    </div>
  );
}
