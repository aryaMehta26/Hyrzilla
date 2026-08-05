import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sliders, Target, Handshake, CheckCircle2, ArrowRight,
  FileText, ChevronRight, BarChart2
} from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import MockPanelSimulator from '../components/MockPanelSimulator';

export default function Services() {
  const [activeStackTab, setActiveStackTab] = useState('cloud');
  const [hoveredStep, setHoveredStep] = useState(null);

  const stackDetails = {
    cloud: {
      title: 'Cloud & DevOps',
      roles: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer', 'Infrastructure Lead'],
      keywords: ['Infrastructure as Code', 'Container Orchestration', 'Cloud Migration', 'CI/CD Automation', 'Monitoring & Alerting', 'High Availability Design'],
      description: 'We highlight your infrastructure scale, uptime track record, automation wins, and the real impact of your cloud work.',
      stat: '28%', statLabel: 'of our placements'
    },
    software: {
      title: 'Full-Stack & Backend',
      roles: ['Senior Full-Stack Engineer', 'Backend Engineer', 'Frontend Architect', 'System Design Lead'],
      keywords: ['API Performance', 'Distributed Systems', 'Caching Strategy', 'Database Optimization', 'Clean Architecture', 'Scalable Frontend'],
      description: 'We frame your work around system performance, code quality, and the business outcomes your engineering delivered.',
      stat: '38%', statLabel: 'of our placements'
    },
    data: {
      title: 'Data Engineering',
      roles: ['Data Engineer', 'Analytics Engineer', 'Data Architect', 'Pipeline Developer'],
      keywords: ['Pipeline Optimization', 'Data Warehousing', 'Workflow Orchestration', 'Real-time Processing', 'Query Performance', 'Data Quality'],
      description: 'We quantify your pipeline throughput, latency improvements, and downstream business impact.',
      stat: '20%', statLabel: 'of our placements'
    },
    aiml: {
      title: 'AI & Machine Learning',
      roles: ['ML Engineer', 'AI Software Engineer', 'MLOps Engineer', 'NLP Developer'],
      keywords: ['Model Deployment', 'Training Pipelines', 'Production ML', 'Inference Optimization', 'Experiment Tracking', 'Distributed Training'],
      description: 'We showcase your model performance metrics, deployment reliability, and production ML experience.',
      stat: '8%', statLabel: 'of our placements'
    },
    cyber: {
      title: 'Cybersecurity',
      roles: ['AppSec Engineer', 'Security Architect', 'SOC Specialist', 'IAM Engineer'],
      keywords: ['Zero Trust Design', 'Identity Management', 'Vulnerability Assessment', 'Compliance Frameworks', 'Threat Modeling'],
      description: 'We position your security expertise around proactive threat reduction, compliance wins, and incident response track record.',
      stat: '6%', statLabel: 'of our placements'
    }
  };

  const currentStack = stackDetails[activeStackTab];

  const pillars = [
    { icon: <FileText size={22} />, label: 'Step 01', title: 'Resume Rebuild', desc: 'We don\'t use templates. We take your actual work experience and rewrite it so automated filters pass it through and hiring managers actually want to read it.', items: ['Metrics-driven accomplishments', 'Role-specific keyword optimization', 'LinkedIn and GitHub alignment'], color: '#7C3AED' },
    { icon: <Target size={22} />, label: 'Step 02', title: 'Interview Preparation', desc: 'We run real mock interviews — system design, behavioral, and technical coding — so you\'re not practicing for the first time during the real thing.', items: ['System design walkthroughs', 'Behavioral answer coaching', 'Honest feedback on weak spots'], color: '#4F46E5' },
    { icon: <Sliders size={22} />, label: 'Step 03', title: 'Application Support', desc: 'Instead of applying everywhere and hoping, we help you target roles that actually match your background and apply with optimized materials.', items: ['Targeted job matching', 'Referral network outreach', 'Application tracking'], color: '#059669' },
    { icon: <Handshake size={22} />, label: 'Step 04', title: 'Offer & Salary Negotiation', desc: 'When offers come in, we help you understand the full picture — base, equity, bonuses — and negotiate from a position of knowledge.', items: ['Compensation benchmarking', 'Counter-offer strategy', 'Onboarding support'], color: '#7C3AED' },
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-16 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">What We Do</div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 font-display mb-6" delay={0.2}>
            Everything you need to land a better role.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 max-w-2xl mx-auto leading-relaxed">
              We handle the parts of job searching that most people struggle with — the resume, the interviews, the applications, and the negotiation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4 Steps — Timeline Layout */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit">Our Process</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight">
                Four steps to <span className="text-aurora">your next role</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical connector line (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-300 via-indigo-300 to-emerald-300 -translate-x-1/2" />

            <div className="space-y-8 md:space-y-0">
              {pillars.map((p, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className={`md:grid md:grid-cols-2 md:gap-12 items-center mb-12 ${isLeft ? '' : 'md:direction-rtl'}`}>
                      {/* Card side */}
                      <motion.div
                        className={`glass-card relative overflow-hidden ${isLeft ? 'md:text-right' : 'md:col-start-2'}`}
                        onMouseEnter={() => setHoveredStep(i)}
                        onMouseLeave={() => setHoveredStep(null)}
                        whileHover={{ y: -6, boxShadow: '0 24px 50px -12px rgba(124,58,237,0.15)' }}
                        transition={{ duration: 0.3 }}
                        style={{ direction: 'ltr' }}
                      >
                        {/* Accent top bar */}
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                          style={{ background: p.color }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.15 }}
                        />

                        <div className="flex items-center gap-3 mb-4">
                          <motion.div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md"
                            style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}dd)`, boxShadow: `0 4px 15px ${p.color}33` }}
                            animate={hoveredStep === i ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {p.icon}
                          </motion.div>
                          <span className="text-xs font-bold uppercase tracking-widest font-mono" style={{ color: p.color }}>{p.label}</span>
                        </div>
                        <h3 className="text-xl font-bold text-indigo-950 mb-3 font-display">{p.title}</h3>
                        <p className="text-purple-900/70 text-sm leading-relaxed mb-5">{p.desc}</p>
                        <ul className="space-y-2.5">
                          {p.items.map((item, j) => (
                            <motion.li
                              key={j}
                              className="flex items-center gap-2.5 text-sm text-purple-950"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + j * 0.1 }}
                            >
                              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" /> {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Timeline dot (desktop) */}
                      <div className={`hidden md:flex items-center justify-center ${isLeft ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`}>
                        <motion.div
                          className="w-4 h-4 rounded-full border-2 relative z-10"
                          style={{ borderColor: p.color, background: hoveredStep === i ? p.color : '#FAF8FF' }}
                          animate={hoveredStep === i ? { scale: 1.5, boxShadow: `0 0 20px ${p.color}44` } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <ScrollReveal>
            <MockPanelSimulator />
          </ScrollReveal>
        </div>
      </section>

      {/* Domain Visualizer — Interactive Tabs */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">Who We Help</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight">
                Professionals across <span className="text-aurora">every domain</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {/* Animated Tab Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 relative">
              {Object.keys(stackDetails).map((key) => (
                <motion.button
                  key={key}
                  onClick={() => setActiveStackTab(key)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all relative ${
                    activeStackTab === key
                      ? 'text-white shadow-md shadow-violet-500/20'
                      : 'bg-white/80 border border-purple-200/60 text-purple-900/80 hover:text-indigo-950 hover:border-violet-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeStackTab === key && (
                    <motion.div
                      layoutId="active-tab-bg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{stackDetails[key].title}</span>
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStackTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 text-left"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-indigo-950 font-display">{currentStack.title}</h3>
                      <span className="text-xs font-bold text-violet-700 bg-violet-100/80 border border-violet-200 px-3 py-1 rounded-full font-mono">{currentStack.stat}</span>
                    </div>
                    <p className="text-purple-900/70 text-sm leading-relaxed mb-6">{currentStack.description}</p>
                    <div>
                      <span className="text-xs font-semibold text-purple-900/60 uppercase tracking-wider block mb-3 font-mono">Roles we place:</span>
                      <div className="flex flex-wrap gap-2">
                        {currentStack.roles.map((role, i) => (
                          <motion.span
                            key={role}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
                            className="px-3 py-1.5 rounded-lg bg-purple-50/80 border border-purple-200/50 text-xs text-purple-950 font-mono"
                          >
                            {role}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 bg-purple-50/60 rounded-2xl p-6 border border-purple-200/40">
                    <span className="text-xs font-bold text-violet-700 uppercase tracking-wider block mb-3 font-mono">What we optimize for:</span>
                    <div className="flex flex-wrap gap-2">
                      {currentStack.keywords.map((kw, i) => (
                        <motion.span
                          key={kw}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="keyword-tag"
                        >
                          <CheckCircle2 size={11} /> {kw}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <ScrollReveal>
          <div className="gradient-divider mb-12 max-w-lg mx-auto" />
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-950 mb-4 font-display">Ready to get started?</h3>
          <p className="text-purple-900/80 max-w-lg mx-auto mb-8">Pick a plan that fits your situation, or talk to us first — no pressure.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton><Link to="/pricing" className="btn-aurora flex items-center gap-2">See Pricing <ArrowRight size={16} /></Link></MagneticButton>
            <MagneticButton><Link to="/contact" className="btn-ghost">Talk to Us</Link></MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
