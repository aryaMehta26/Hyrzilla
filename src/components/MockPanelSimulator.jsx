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
      <div className="flex items-center justify-between border-b border-purple-200/50 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-violet-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-violet-800 font-mono">
            Mock Technical Interview Practice
          </span>
        </div>
        <span className="text-xs text-purple-900/60 font-mono">Sample Question</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(domains).map((key) => (
          <button
            key={key}
            onClick={() => { setSelectedDomain(key); setShowAnswer(false); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedDomain === key
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                : 'bg-white/80 border border-purple-200/60 text-purple-900/70 hover:text-indigo-950'
            }`}
          >
            {domains[key].name}
          </button>
        ))}
      </div>

      {/* Question */}
      <div className="p-5 rounded-2xl bg-purple-100/60 border border-purple-200/80 mb-6">
        <span className="text-xs font-bold text-violet-800 uppercase tracking-wider block mb-2 font-mono">Interview Question:</span>
        <p className="text-indigo-950 text-sm leading-relaxed font-medium">{current.question}</p>
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
                <div key={i} className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/40">
                  <span className="text-xs font-bold text-violet-700 uppercase tracking-wider block mb-1 font-mono">{s.label}</span>
                  <p className="text-purple-900/80 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-300 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">Interview Pass Rating:</span>
              <span className="text-2xl font-extrabold text-aurora font-mono">{current.clearanceScore}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
