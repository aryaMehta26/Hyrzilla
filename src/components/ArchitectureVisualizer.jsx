import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, CheckCircle2, UserCheck, Send } from 'lucide-react';

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
    <div className="rounded-3xl p-6 md:p-8 text-left max-w-5xl mx-auto relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1E1040 0%, #2D1B6B 50%, #1A0B3B 100%)', border: '1px solid rgba(167,139,250,0.25)' }}>
      
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between border-b pb-4 mb-6 gap-3 relative z-10"
        style={{ borderColor: 'rgba(167,139,250,0.2)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono" style={{ color: '#C4B5FD' }}>
            Interactive Placement Pipeline Flow
          </span>
        </div>
        <span className="text-xs font-mono" style={{ color: 'rgba(196,181,253,0.5)' }}>Click stages to inspect flow</span>
      </div>

      {/* Node Flow Track — 2-col on mobile, 4-col on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 relative z-10">
        {stages.map((stage, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={`p-3 md:p-4 rounded-2xl transition-all duration-300 text-left relative border ${
                isActive
                  ? 'scale-[1.02]'
                  : 'hover:opacity-90'
              }`}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(79,70,229,0.25))'
                  : 'rgba(255,255,255,0.06)',
                borderColor: isActive ? 'rgba(167,139,250,0.7)' : 'rgba(255,255,255,0.1)',
                boxShadow: isActive ? '0 4px 20px rgba(124,58,237,0.2)' : 'none'
              }}
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="p-2 rounded-xl"
                  style={{ background: isActive ? '#7C3AED' : 'rgba(255,255,255,0.1)', color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                  {stage.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: 'rgba(196,181,253,0.6)' }}>
                  0{idx + 1}
                </span>
              </div>
              <h4 className="text-xs md:text-sm font-bold font-display mb-1 leading-tight" style={{ color: '#FFFFFF' }}>{stage.title}</h4>
              <span className="text-[10px] md:text-[11px] font-mono block" style={{ color: '#C4B5FD' }}>{stage.metric}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Details Panel */}
      <div className="p-4 md:p-6 rounded-2xl relative overflow-hidden z-10"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(167,139,250,0.15)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="lg:col-span-8">
            <span className="text-xs font-bold uppercase tracking-widest block mb-2 font-mono" style={{ color: '#A78BFA' }}>
              Stage Milestone Details
            </span>
            <motion.h3
              key={activeStage + '-title'}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl md:text-2xl font-bold font-display mb-3"
              style={{ color: '#FFFFFF' }}
            >
              {current.title}
            </motion.h3>
            <motion.p
              key={activeStage + '-desc'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'rgba(221,214,254,0.85)' }}
            >
              {current.desc}
            </motion.p>
            <div className="flex flex-wrap gap-2">
              {current.details.map((d, i) => (
                <span key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono"
                  style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(167,139,250,0.3)', color: '#DDD6FE' }}>
                  <CheckCircle2 size={12} style={{ color: '#A78BFA' }} /> {d}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 p-4 md:p-5 rounded-xl text-center"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.15))', border: '1px solid rgba(167,139,250,0.25)' }}>
            <span className="text-xs font-mono block mb-1" style={{ color: 'rgba(196,181,253,0.7)' }}>Impact Metric:</span>
            <motion.div
              key={activeStage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xl md:text-2xl font-extrabold font-mono tracking-tight"
              style={{ color: '#DDD6FE' }}
            >
              {current.metric}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
