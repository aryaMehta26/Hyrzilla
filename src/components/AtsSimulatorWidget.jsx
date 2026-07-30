import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Zap, Sliders, ShieldCheck } from 'lucide-react';

export default function AtsSimulatorWidget() {
  const [selectedStack, setSelectedStack] = useState('cloud');

  const stacks = {
    cloud: {
      name: 'Cloud & DevOps (AWS / K8s)',
      beforeScore: 32,
      afterScore: 96,
      keywords: ['Terraform IaC', 'Kubernetes Helm', 'AWS ECS/EKS', 'CI/CD Pipeline SLA', 'Prometheus Metrics'],
      metric: '3.6x Callback Increase'
    },
    software: {
      name: 'Full-Stack / Backend Eng',
      beforeScore: 28,
      afterScore: 94,
      keywords: ['Microservices Scaling', 'Redis Caching', 'PostgreSQL Query Optimization', 'GraphQL API', 'Docker'],
      metric: '3.2x Interview Clearance'
    },
    data: {
      name: 'Data Engineering & PySpark',
      beforeScore: 35,
      afterScore: 97,
      keywords: ['PySpark ETL Scale', 'Snowflake Warehouse', 'Airflow Orchestration', 'Delta Lake', 'SQL Window Functions'],
      metric: '4.1x Recruiter Outreach'
    },
    aiml: {
      name: 'AI / ML & MLOps',
      beforeScore: 30,
      afterScore: 95,
      keywords: ['PyTorch Model Tuning', 'MLflow Tracking', 'Ray Distributed Train', 'LLM Fine-Tuning', 'Vector DB'],
      metric: '3.5x Offer Conversion'
    }
  };

  const current = stacks[selectedStack];

  return (
    <div className="bento-card-react max-w-4xl mx-auto border-[rgba(37,232,122,0.35)] shadow-emeraldGlow bg-[rgba(6,18,12,0.85)] relative overflow-hidden my-12">
      <div className="border-beam" />
      
      <div className="flex items-center justify-between border-b border-[rgba(37,232,122,0.14)] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brandGreen animate-ping" />
          <span className="text-xs font-bold uppercase tracking-wider text-brandGreen">Interactive Candidate ATS Simulator</span>
        </div>
        <span className="text-xs text-tMuted font-mono">2026 US Hiring Engine</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Stack Controls */}
        <div className="lg:col-span-6 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-tMuted">Select Your Primary Engineering Stack:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.keys(stacks).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedStack(key)}
                className={`px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left border ${
                  selectedStack === key
                    ? 'border-brandGreen bg-[rgba(37,232,122,0.14)] text-tMain shadow-emeraldGlow'
                    : 'border-[rgba(37,232,122,0.14)] bg-bgDark/80 text-tMuted hover:border-[rgba(37,232,122,0.3)]'
                }`}
              >
                {stacks[key].name}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-tMuted mb-2">Optimized Keyword Highlights:</span>
            <div className="flex flex-wrap gap-1.5">
              {current.keywords.map((kw, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-[rgba(37,232,122,0.08)] border border-[rgba(37,232,122,0.2)] text-brandGreen font-mono">
                  <CheckCircle2 size={10} /> {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Live Score Visualizer */}
        <div className="lg:col-span-6 bg-bgDark/90 border border-[rgba(37,232,122,0.16)] rounded-2xl p-6 text-center relative">
          <span className="text-xs font-bold text-tMuted uppercase tracking-widest block mb-4">ATS Pass Rate Transformation</span>
          
          <div className="flex items-center justify-around my-4">
            {/* Before */}
            <div className="text-center">
              <span className="text-xs text-tSub block mb-1">Standard Resume</span>
              <div className="text-3xl font-extrabold text-tSub line-through">{current.beforeScore}%</div>
              <span className="text-[10px] text-red-400 font-mono">Filtered Out</span>
            </div>

            <div className="text-2xl text-brandGreen font-bold">➔</div>

            {/* After */}
            <div className="text-center">
              <span className="text-xs text-brandGreen font-bold block mb-1">Hyrzilla Optimized</span>
              <motion.div 
                key={selectedStack}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-5xl font-extrabold text-brandGreen"
              >
                {current.afterScore}%
              </motion.div>
              <span className="text-[10px] text-brandGreen font-mono font-bold uppercase">Passed & Shortlisted</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[rgba(37,232,122,0.12)] flex items-center justify-between text-xs text-tMuted">
            <span>Result Benchmark:</span>
            <span className="font-bold text-brandGreen">{current.metric}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
