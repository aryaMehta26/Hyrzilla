import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target } from 'lucide-react';

export default function MockPanelSimulator() {
  const [selectedDomain, setSelectedDomain] = useState('cloud');
  const [showAnswer, setShowAnswer] = useState(false);

  const domains = {
    cloud: {
      name: 'Cloud & DevOps',
      question: 'Design a highly available deployment strategy for a microservices app serving 50K concurrent users. How do you handle zero-downtime updates?',
      starAnswer: {
        situation: 'Our monolithic app needed to move to cloud containers to support traffic growth without deployment downtime.',
        task: 'Design a deployment setup supporting 50K+ users with zero-downtime updates.',
        action: 'Configured EKS with rolling updates (maxSurge=25%, maxUnavailable=0), set up horizontal pod autoscaling, and added Prometheus metrics for real-time monitoring.',
        result: 'Achieved 99.97% uptime, cut deployment time from 45m to 8m, and handled 3x peak traffic spikes automatically.'
      },
      clearanceScore: '94%'
    },
    fullstack: {
      name: 'Full-Stack & Systems',
      question: 'Design a real-time notification service that delivers 1M+ push notifications per minute with user preference management.',
      starAnswer: {
        situation: 'Our platform needed a reliable notification system to replace an old email-only pipeline that had a 40% failure rate.',
        task: 'Build a multi-channel notification service supporting push, email, and in-app alerts.',
        action: 'Used Kafka for queuing, Redis for deduplication and rate limiting, and WebSockets for real-time delivery. Added circuit breakers per channel.',
        result: 'Hit 99.8% delivery across all channels at 1.2M/min peak volume, reducing support tickets by 78%.'
      },
      clearanceScore: '91%'
    },
    data: {
      name: 'Data Engineering',
      question: 'Design a data pipeline that ingests 5TB of daily events, transforms the data, and serves it to a warehouse for analytics.',
      starAnswer: {
        situation: 'The analytics team was blocked by batch pipelines with 24-hour latency.',
        task: 'Redesign the pipeline for near real-time processing of 5TB+ daily event data.',
        action: 'Built a streaming pipeline using Kafka, PySpark on EMR, and Delta Lake, continuously loading into Snowflake via Airflow.',
        result: 'Cut data latency from 24 hours to 15 minutes, processing 5.2TB daily with 99.9% accuracy for 12 analytics teams.'
      },
      clearanceScore: '96%'
    }
  };

  const current = domains[selectedDomain];

  return (
    <div className="glass-card text-left my-8">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-accent-violet" />
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan font-mono">
            Mock Technical Interview Practice
          </span>
        </div>
        <span className="text-xs text-text-tertiary font-mono">Sample Question</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(domains).map((key) => (
          <button
            key={key}
            onClick={() => { setSelectedDomain(key); setShowAnswer(false); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedDomain === key
                ? 'bg-gradient-to-r from-accent-violet to-accent-cyan text-white shadow-lg shadow-accent-violet/20'
                : 'bg-white/[0.03] border border-white/[0.06] text-text-tertiary hover:text-text-secondary'
            }`}
          >
            {domains[key].name}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="p-5 rounded-2xl bg-accent-violet/[0.04] border border-accent-violet/10 mb-6">
        <span className="text-xs font-bold text-accent-violet uppercase tracking-wider block mb-2 font-mono">Interview Question:</span>
        <p className="text-text-primary text-sm leading-relaxed font-medium">{current.question}</p>
      </div>

      {/* Reveal Button */}
      {!showAnswer && (
        <button
          onClick={() => setShowAnswer(true)}
          className="btn-aurora w-full flex items-center justify-center gap-2 mb-4"
        >
          See Structured Answer Breakdown <ChevronRight size={16} />
        </button>
      )}

      {/* STAR Answer */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 mb-6">
              {[
                { label: 'Situation — The context', text: current.starAnswer.situation },
                { label: 'Task — What needed doing', text: current.starAnswer.task },
                { label: 'Action — What was done', text: current.starAnswer.action },
                { label: 'Result — The outcome', text: current.starAnswer.result },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface border border-white/[0.04]">
                  <span className="text-xs font-bold text-accent-cyan uppercase tracking-wider block mb-1 font-mono">{s.label}</span>
                  <p className="text-text-secondary text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-accent-emerald/[0.04] border border-accent-emerald/10 flex items-center justify-between">
              <span className="text-xs font-bold text-accent-emerald uppercase tracking-wider font-mono">Interview Pass Rating:</span>
              <span className="text-2xl font-extrabold text-aurora font-mono">{current.clearanceScore}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
