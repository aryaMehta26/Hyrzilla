import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, CheckCircle2, UserCheck, Sparkles, Send } from 'lucide-react';

export default function ArchitectureVisualizer() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'resume',
      title: '1. Resume Architecture',
      icon: <FileText size={20} />,
      desc: 'Raw bullet points transformed with metrics, scale, and ATS parser keyword density.',
      metric: '34% ➔ 96% Pass Rate',
      details: ['Quantified Scale Metrics', 'Format Optimization', 'Role Targeting']
    },
    {
      id: 'mock',
      title: '2. Mock Interview Prep',
      icon: <Cpu size={20} />,
      desc: '1-on-1 system design whiteboards and STAR behavioral coaching with senior mentors.',
      metric: '3.4x Interview Clearance',
      details: ['System Design Practice', 'STAR Framework', 'Live Feedback']
    },
    {
      id: 'outreach',
      title: '3. Application Outreach',
      icon: <Send size={20} />,
      desc: 'Targeted application submissions to verified corporate portal requisitions.',
      metric: '150+ Weekly Applications',
      details: ['Direct Referral Outreach', 'Requisition Matching', 'Pipeline Tracker']
    },
    {
      id: 'offer',
      title: '4. Offer & Start',
      icon: <UserCheck size={20} />,
      desc: 'Salary & equity package evaluation, counter-offer scripting, and onboarding guidance.',
      metric: '+$24,500 Avg. Salary Lift',
      details: ['Compensation Benchmarking', 'Counter Scripts', 'Onboarding Support']
    }
  ];

  const current = stages[activeStage];

  return (
    <div className="glass-card text-left max-w-5xl mx-auto my-12 relative overflow-hidden bg-slate-900/90 text-white border-purple-500/20 shadow-2xl">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-8 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-violet-300 font-mono">
            Interactive Placement Pipeline Flow
          </span>
        </div>
        <span className="text-xs text-purple-300/60 font-mono">Click stages to inspect flow</span>
      </div>

      {/* Node Flow Track */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative">
        {stages.map((stage, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`p-4 rounded-2xl transition-all duration-300 text-left relative z-10 border ${
                isActive
                  ? 'bg-gradient-to-br from-violet-600/30 to-indigo-600/30 border-violet-400 shadow-lg shadow-violet-500/20 text-white scale-[1.02]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${isActive ? 'bg-violet-500 text-white' : 'bg-white/10 text-white/60'}`}>
                  {stage.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-60">
                  0{idx + 1}
                </span>
              </div>
              <h4 className="text-sm font-bold font-display mb-1">{stage.title}</h4>
              <span className="text-[11px] text-violet-300 font-mono block">{stage.metric}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Details Panel */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-widest block mb-2 font-mono">
              Stage Milestone Details
            </span>
            <h3 className="text-2xl font-bold font-display text-white mb-3">{current.title}</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{current.desc}</p>
            <div className="flex flex-wrap gap-2">
              {current.details.map((d, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-500/20 border border-violet-400/30 text-violet-200 text-xs font-mono">
                  <CheckCircle2 size={12} className="text-violet-400" /> {d}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 p-5 rounded-xl border border-violet-500/30 text-center">
            <span className="text-xs text-white/60 font-mono block mb-1">Impact Metric:</span>
            <motion.div
              key={activeStage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-extrabold text-violet-300 font-mono tracking-tight"
            >
              {current.metric}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
