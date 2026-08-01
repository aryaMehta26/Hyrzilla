import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chart, registerables } from 'chart.js';
import {
  ArrowRight, Zap, TrendingUp, Target, Award, ShieldCheck,
  CheckCircle2, FileText, Handshake, Sliders
} from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import MarqueeStrip from '../components/MarqueeStrip';
import MagneticButton from '../components/MagneticButton';
import AtsSimulatorWidget from '../components/AtsSimulatorWidget';
import AtsRewriterWidget from '../components/AtsRewriterWidget';
import RequisitionHeatmap from '../components/RequisitionHeatmap';

gsap.registerPlugin(ScrollTrigger);
Chart.register(...registerables);

export default function Home() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  // Horizontal scroll showcase
  useEffect(() => {
    const section = horizontalRef.current;
    const track = horizontalTrackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  // Chart
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();
      const ctx = chartRef.current.getContext('2d');
      Chart.defaults.color = '#94A3B8';
      Chart.defaults.font.family = "'Inter', sans-serif";

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Applying on Your Own', 'Traditional Recruiter', 'With Hyrzilla'],
          datasets: [{
            label: 'Callback Rate (%)',
            data: [1.8, 4.2, 28.5],
            backgroundColor: [
              'rgba(148, 163, 184, 0.15)',
              'rgba(148, 163, 184, 0.25)',
              'rgba(139, 92, 246, 0.6)'
            ],
            borderColor: ['transparent', 'transparent', '#8B5CF6'],
            borderWidth: [0, 0, 1],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0A0F1E',
              titleColor: '#F1F5F9',
              bodyColor: '#94A3B8',
              borderColor: 'rgba(139, 92, 246, 0.3)',
              borderWidth: 1,
              padding: 14,
              callbacks: { label: (c) => ` ${c.raw}% Callback Rate` }
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(148, 163, 184, 0.06)' },
              beginAtZero: true,
              ticks: { callback: (v) => `${v}%` }
            },
            x: { grid: { display: false } }
          }
        }
      });
    }
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, []);

  const steps = [
    {
      icon: <FileText size={24} />,
      title: 'Resume Rebuild',
      subtitle: 'We rewrite your resume — not with templates, but with real metrics from your experience.',
      desc: 'Most resumes get auto-rejected because they lack the specific keywords and numbers hiring managers look for. We fix that.',
      metric: '96%',
      metricLabel: 'Pass Rate After'
    },
    {
      icon: <Target size={24} />,
      title: 'Interview Prep',
      subtitle: 'Practice real technical interviews with people who have been on the other side of the table.',
      desc: 'We run mock system design and behavioral interviews so you walk into your real ones with confidence, not anxiety.',
      metric: '3.4x',
      metricLabel: 'Better Clearance'
    },
    {
      icon: <Sliders size={24} />,
      title: 'Application Support',
      subtitle: 'We help you apply to the right roles, not just spray and pray across job boards.',
      desc: 'Targeted applications to roles that actually match your background. Quality over quantity.',
      metric: '150+',
      metricLabel: 'Weekly Apps'
    },
    {
      icon: <Handshake size={24} />,
      title: 'Offer Negotiation',
      subtitle: 'Most engineers leave money on the table. We make sure you don\'t.',
      desc: 'We help you evaluate offers, compare compensation packages, and negotiate confidently.',
      metric: '+$24.5K',
      metricLabel: 'Avg. Salary Lift'
    }
  ];

  return (
    <div className="relative z-10 pt-24">
      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="aurora-badge">
            IT Staffing & Career Advisory
          </div>
        </motion.div>

        <TextReveal className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.05] text-text-primary max-w-5xl font-display mb-8" delay={0.4}>
          We help engineers land better jobs, faster.
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Hyrzilla is a placement advisory for software engineers, cloud professionals, and data specialists. We rebuild your resume, prep you for interviews, and actively help you get hired.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          <MagneticButton>
            <Link to="/pricing" className="btn-aurora flex items-center gap-2">
              See Our Plans <ArrowRight size={16} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/services" className="btn-ghost">
              How It Works
            </Link>
          </MagneticButton>
        </motion.div>

        {/* ATS Simulator */}
        <ScrollReveal className="w-full max-w-4xl mx-auto">
          <AtsSimulatorWidget />
        </ScrollReveal>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <MarqueeStrip />

      {/* ═══════════ ATS REWRITER TOOL ═══════════ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">
                Resume Before & After
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary font-display tracking-tight mb-4">
                See what a real <span className="text-aurora">resume rewrite</span> looks like
              </h2>
              <p className="text-text-secondary max-w-lg mx-auto">
                Generic bullet points get filtered out. Specific, metrics-driven ones get callbacks. Here's the difference.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <AtsRewriterWidget />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ HORIZONTAL SCROLL SHOWCASE ═══════════ */}
      <section ref={horizontalRef} className="relative overflow-hidden">
        <div className="h-screen flex items-center">
          <div ref={horizontalTrackRef} className="flex gap-8 px-[10vw] will-change-transform">
            {/* Intro Card */}
            <div className="flex-shrink-0 w-[40vw] min-w-[340px] flex flex-col justify-center pr-8">
              <div className="aurora-badge mb-4 w-fit">How We Work</div>
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary font-display tracking-tight mb-4">
                From resume to <span className="text-aurora">signed offer</span>
              </h2>
              <p className="text-text-secondary text-base max-w-sm">
                Four steps. One goal. Get you hired at a company and salary you actually deserve.
              </p>
            </div>

            {/* Step Cards */}
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-[380px] glass-card flex flex-col justify-between h-[420px]"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-violet/20 to-accent-cyan/10 border border-white/[0.06] flex items-center justify-center text-accent-violet mb-6">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest block mb-1 font-mono">
                    Step {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-bold text-text-primary mb-1 font-display">{step.title}</h3>
                  <p className="text-sm text-text-primary/80 mb-3">{step.subtitle}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-aurora font-mono">{step.metric}</span>
                  <span className="text-xs text-text-tertiary font-mono">{step.metricLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ANIMATED STATS ═══════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="glass-card text-center py-10">
                <AnimatedCounter target={96} suffix="%" className="text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-text-tertiary mt-2 block font-mono">Resume Pass Rate</span>
              </div>
              <div className="glass-card text-center py-10">
                <AnimatedCounter target={3.4} suffix="x" decimals={1} className="text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-text-tertiary mt-2 block font-mono">More Interviews</span>
              </div>
              <div className="glass-card text-center py-10">
                <AnimatedCounter target={24500} prefix="$" className="text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-text-tertiary mt-2 block font-mono">Avg. Salary Increase</span>
              </div>
              <div className="glass-card text-center py-10">
                <AnimatedCounter target={78} suffix="%" className="text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-text-tertiary mt-2 block font-mono">Resumes Auto-Rejected</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ MARKET INTELLIGENCE ═══════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit">The Problem</div>
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary font-display tracking-tight mb-4">
                Why qualified engineers <span className="text-aurora">aren't getting callbacks</span>
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">
                It's not your skills. It's how your resume talks about them. Most applications never reach a human.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              <div className="lg:col-span-7 glass-card text-left">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-text-primary font-display">Interview Callback Rates</h3>
                  <TrendingUp size={20} className="text-accent-violet" />
                </div>
                <div className="relative h-72 mb-4">
                  <canvas ref={chartRef}></canvas>
                </div>
                <p className="text-sm text-text-secondary">
                  <span className="text-text-primary font-semibold">The reality:</span> applying through portals without an optimized resume gives you less than a <span className="text-accent-cyan font-semibold">2% chance</span> of hearing back.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-card flex-1">
                  <div className="w-10 h-10 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center text-accent-violet mb-4">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-text-primary mb-2 font-display">78% Never Seen by Humans</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Automated filters scan for specific keywords and formats. If your resume doesn't match, it's rejected before anyone reads it.
                  </p>
                </div>
                <div className="glass-card-accent flex-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-violet to-accent-cyan text-white flex items-center justify-center mb-4 shadow-lg shadow-accent-violet/20">
                    <Award size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-text-primary mb-2 font-display">3.4x More Interviews</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Candidates who work with us get significantly more interview calls because their resumes actually reach the right people.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <RequisitionHeatmap />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-24 text-center px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="gradient-divider mb-12" />
            <ShieldCheck size={36} className="text-accent-violet mx-auto mb-6" />
            <h3 className="text-2xl md:text-4xl font-bold text-text-primary mb-4 font-display">No hidden fees. No surprises.</h3>
            <p className="text-text-secondary max-w-lg mx-auto mb-8">
              You pay an upfront advisory fee, and the placement fee is due only after you actually start your new job.
            </p>
            <MagneticButton>
              <Link to="/pricing" className="btn-aurora flex items-center gap-2 mx-auto w-fit">
                View Plans & Pricing <ArrowRight size={16} />
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
