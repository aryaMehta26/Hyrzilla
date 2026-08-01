import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sliders, Target, Handshake, CheckCircle2, ArrowRight,
  FileText, Sparkles
} from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import MockPanelSimulator from '../components/MockPanelSimulator';

export default function Services() {
  const [activeStackTab, setActiveStackTab] = useState('cloud');

  const stackDetails = {
    cloud: {
      title: 'Cloud & DevOps',
      roles: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer', 'Infrastructure Lead'],
      keywords: ['Infrastructure as Code', 'Container Orchestration', 'Cloud Migration', 'CI/CD Automation', 'Monitoring & Alerting', 'High Availability Design'],
      description: 'We highlight your infrastructure scale, uptime track record, automation wins, and the real impact of your cloud work.'
    },
    software: {
      title: 'Full-Stack & Backend',
      roles: ['Senior Full-Stack Engineer', 'Backend Engineer', 'Frontend Architect', 'System Design Lead'],
      keywords: ['API Performance', 'Distributed Systems', 'Caching Strategy', 'Database Optimization', 'Clean Architecture', 'Scalable Frontend'],
      description: 'We frame your work around system performance, code quality, and the business outcomes your engineering delivered.'
    },
    data: {
      title: 'Data Engineering',
      roles: ['Data Engineer', 'Analytics Engineer', 'Data Architect', 'Pipeline Developer'],
      keywords: ['Pipeline Optimization', 'Data Warehousing', 'Workflow Orchestration', 'Real-time Processing', 'Query Performance', 'Data Quality'],
      description: 'We quantify your pipeline throughput, latency improvements, and downstream business impact.'
    },
    aiml: {
      title: 'AI & Machine Learning',
      roles: ['ML Engineer', 'AI Software Engineer', 'MLOps Engineer', 'NLP Developer'],
      keywords: ['Model Deployment', 'Training Pipelines', 'Production ML', 'Inference Optimization', 'Experiment Tracking', 'Distributed Training'],
      description: 'We showcase your model performance metrics, deployment reliability, and production ML experience.'
    },
    cyber: {
      title: 'Cybersecurity',
      roles: ['AppSec Engineer', 'Security Architect', 'SOC Specialist', 'IAM Engineer'],
      keywords: ['Zero Trust Design', 'Identity Management', 'Vulnerability Assessment', 'Compliance Frameworks', 'Threat Modeling'],
      description: 'We position your security expertise around proactive threat reduction, compliance wins, and incident response track record.'
    }
  };

  const currentStack = stackDetails[activeStackTab];

  const pillars = [
    {
      icon: <FileText size={22} />,
      label: 'Step 01',
      title: 'Resume Rebuild',
      desc: 'We don\'t use templates. We take your actual work experience and rewrite it so automated filters pass it through and hiring managers actually want to read it.',
      items: ['Metrics-driven accomplishments', 'Role-specific keyword optimization', 'LinkedIn and GitHub alignment'],
      accent: false,
    },
    {
      icon: <Target size={22} />,
      label: 'Step 02',
      title: 'Interview Preparation',
      desc: 'We run real mock interviews — system design, behavioral, and technical coding — so you\'re not practicing for the first time during the real thing.',
      items: ['System design walkthroughs', 'Behavioral answer coaching', 'Honest feedback on weak spots'],
      accent: true,
    },
    {
      icon: <Sliders size={22} />,
      label: 'Step 03',
      title: 'Application Support',
      desc: 'Instead of applying everywhere and hoping, we help you target roles that actually match your background and apply with optimized materials.',
      items: ['Targeted job matching', 'Referral network outreach', 'Application tracking'],
      accent: false,
    },
    {
      icon: <Handshake size={22} />,
      label: 'Step 04',
      title: 'Offer & Salary Negotiation',
      desc: 'When offers come in, we help you understand the full picture — base, equity, bonuses — and negotiate from a position of knowledge.',
      items: ['Compensation benchmarking', 'Counter-offer strategy', 'Onboarding support'],
      accent: false,
    }
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">
            What We Do
          </div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary font-display mb-6" delay={0.2}>
            Everything you need to land a better role.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              We handle the parts of job searching that most people struggle with — the resume, the interviews, the applications, and the negotiation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 4 Steps */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit">Our Process</div>
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary font-display tracking-tight">
                Four steps to <span className="text-aurora">your next role</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-left">
              {pillars.map((p, i) => (
                <div key={i} className={p.accent ? 'glass-card-accent' : 'glass-card'}>
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5 ${
                    p.accent
                      ? 'bg-gradient-to-br from-accent-violet to-accent-cyan text-white shadow-lg shadow-accent-violet/20'
                      : 'bg-accent-violet/10 border border-accent-violet/20 text-accent-violet'
                  }`}>
                    {p.icon}
                  </div>
                  <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest block mb-1 font-mono">{p.label}</span>
                  <h3 className="text-xl font-bold text-text-primary mb-3 font-display">{p.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">{p.desc}</p>
                  <ul className="space-y-2.5">
                    {p.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 size={15} className="text-accent-emerald shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <MockPanelSimulator />
          </ScrollReveal>
        </div>
      </section>

      {/* Domain Visualizer */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">Who We Help</div>
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary font-display tracking-tight">
                Engineers across <span className="text-aurora">every domain</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {Object.keys(stackDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveStackTab(key)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                    activeStackTab === key
                      ? 'bg-gradient-to-r from-accent-violet to-accent-cyan text-white shadow-lg shadow-accent-violet/25'
                      : 'bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-text-primary hover:border-accent-violet/20'
                  }`}
                >
                  {stackDetails[key].title}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-8 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <h3 className="text-2xl font-bold text-text-primary mb-4 font-display">{currentStack.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">{currentStack.description}</p>
                  <div>
                    <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-2 font-mono">Roles we place:</span>
                    <div className="flex flex-wrap gap-2">
                      {currentStack.roles.map((role, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-text-secondary font-mono">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 bg-surface rounded-2xl p-6 border border-white/[0.04]">
                  <span className="text-xs font-bold text-accent-violet uppercase tracking-wider block mb-3 font-mono">What we optimize for:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentStack.keywords.map((kw, i) => (
                      <span key={i} className="keyword-tag">
                        <CheckCircle2 size={11} /> {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <ScrollReveal>
          <div className="gradient-divider mb-12 max-w-lg mx-auto" />
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 font-display">Ready to get started?</h3>
          <p className="text-text-secondary max-w-lg mx-auto mb-8">
            Pick a plan that fits your situation, or talk to us first — no pressure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton><Link to="/pricing" className="btn-aurora flex items-center gap-2">See Pricing <ArrowRight size={16} /></Link></MagneticButton>
            <MagneticButton><Link to="/contact" className="btn-ghost">Talk to Us</Link></MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
