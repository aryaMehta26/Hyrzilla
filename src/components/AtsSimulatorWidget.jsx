import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function AtsSimulatorWidget() {
  const [selectedStack, setSelectedStack] = useState('cloud');

  const stacks = {
    cloud: {
      name: 'Cloud & DevOps',
      beforeScore: 32, afterScore: 96,
      keywords: ['Infrastructure as Code', 'Container Orchestration', 'Cloud Architecture', 'CI/CD Automation', 'Monitoring & Observability'],
      metric: '3.6x more callbacks'
    },
    software: {
      name: 'Full-Stack Engineering',
      beforeScore: 28, afterScore: 94,
      keywords: ['API Performance', 'Database Optimization', 'System Architecture', 'Scalable Backend', 'Frontend Frameworks'],
      metric: '3.2x more interviews'
    },
    data: {
      name: 'Data Engineering',
      beforeScore: 35, afterScore: 97,
      keywords: ['Pipeline Optimization', 'Data Warehousing', 'ETL Performance', 'Real-time Processing', 'Query Optimization'],
      metric: '4.1x more recruiter reach-outs'
    },
    aiml: {
      name: 'AI & Machine Learning',
      beforeScore: 30, afterScore: 95,
      keywords: ['Model Deployment', 'Training Pipelines', 'Production ML Systems', 'Performance Tuning', 'Scalable Inference'],
      metric: '3.5x more offers'
    }
  };

  const current = stacks[selectedStack];

  return (
    <div className="glass-card text-left relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan font-mono">Resume Score Simulator</span>
        </div>
        <span className="text-xs text-text-tertiary font-mono">Try it</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary font-mono">Your engineering focus:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.keys(stacks).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedStack(key)}
                className={`px-4 py-3 rounded-xl text-xs font-medium transition-all text-left border ${
                  selectedStack === key
                    ? 'border-accent-violet/40 bg-accent-violet/10 text-text-primary font-semibold shadow-lg shadow-accent-violet/10'
                    : 'border-white/[0.06] bg-white/[0.02] text-text-tertiary hover:border-white/[0.1]'
                }`}
              >
                {stacks[key].name}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2 font-mono">Keywords we optimize for:</span>
            <div className="flex flex-wrap gap-1.5">
              {current.keywords.map((kw, i) => (
                <span key={i} className="keyword-tag">
                  <CheckCircle2 size={10} /> {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-surface border border-white/[0.04] rounded-xl p-6 text-center">
          <span className="text-xs font-semibold text-text-tertiary uppercase tracking-widest block mb-4 font-mono">Your Resume Score</span>
          <div className="flex items-center justify-around my-4">
            <div className="text-center">
              <span className="text-xs text-text-tertiary block mb-1">Without us</span>
              <div className="text-3xl font-extrabold text-text-tertiary line-through font-mono">{current.beforeScore}%</div>
              <span className="text-[10px] text-red-400 font-mono">Auto-rejected</span>
            </div>
            <div className="text-xl text-accent-violet font-bold font-mono">→</div>
            <div className="text-center">
              <span className="text-xs text-accent-cyan font-semibold block mb-1">With Hyrzilla</span>
              <motion.div
                key={selectedStack}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-extrabold text-aurora font-mono tracking-tight"
              >
                {current.afterScore}%
              </motion.div>
              <span className="text-[10px] text-accent-emerald font-mono font-semibold uppercase">Shortlisted</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-text-tertiary font-mono">
            <span>Result:</span>
            <span className="font-semibold text-accent-cyan">{current.metric}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
