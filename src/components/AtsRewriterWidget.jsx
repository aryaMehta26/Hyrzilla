import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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
      <div className="flex items-center justify-between border-b border-purple-200/50 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-violet-600 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-violet-800 font-mono">
            Resume Before & After
          </span>
        </div>
        <span className="text-xs text-purple-900/60 font-mono">Try each sample</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {bullets.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedBullet(i)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedBullet === i
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                : 'bg-white/80 border border-purple-200/60 text-purple-900/70 hover:text-indigo-950'
            }`}
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-200">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-2 font-mono">Before:</span>
          <p className="text-purple-900/70 text-sm leading-relaxed italic">"{current.before}"</p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-200">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-2 font-mono">After:</span>
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedBullet}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-indigo-950 text-sm leading-relaxed font-medium"
            >
              "{current.after}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/40 text-center">
          <span className="text-xs text-purple-900/60 block mb-1 font-mono">Estimated Salary Impact:</span>
          <div className="text-xl font-extrabold text-aurora font-mono">{current.salaryLift}</div>
        </div>
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/40 text-center">
          <span className="text-xs text-purple-900/60 block mb-1 font-mono">Resume Pass Rate:</span>
          <div className="text-xl font-extrabold text-violet-700 font-mono">{current.passRate}</div>
        </div>
      </div>
    </div>
  );
}
