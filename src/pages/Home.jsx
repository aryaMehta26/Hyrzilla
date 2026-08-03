import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Chart, registerables } from 'chart.js';
import {
  ArrowRight, Zap, TrendingUp, Target, Award, ShieldCheck,
  FileText, Handshake, Sliders
} from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';
import ArchitectureVisualizer from '../components/ArchitectureVisualizer';
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
        start: 'top top+=80',
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
      Chart.defaults.color = '#4C1D95';
      Chart.defaults.font.family = "'Inter', sans-serif";

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Applying on Your Own', 'Traditional Recruiter', 'With Hyrzilla'],
          datasets: [{
            label: 'Callback Rate (%)',
            data: [1.8, 4.2, 28.5],
            backgroundColor: [
              'rgba(167, 139, 250, 0.25)',
              'rgba(167, 139, 250, 0.45)',
              '#7C3AED'
            ],
            borderColor: ['transparent', 'transparent', '#4F46E5'],
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
              backgroundColor: '#1E1B4B',
              titleColor: '#FFFFFF',
              bodyColor: '#C4B5FD',
              borderColor: 'rgba(167, 139, 250, 0.4)',
              borderWidth: 1,
              padding: 14,
              callbacks: { label: (c) => ` ${c.raw}% Callback Rate` }
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(167, 139, 250, 0.12)' },
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
      icon: <FileText size={22} />,
      title: 'Resume Rebuild',
      subtitle: 'We rewrite your resume — not with templates, but with real metrics from your experience.',
      desc: 'Most resumes get auto-rejected because they lack specific keywords and numbers. We fix that.',
      metric: '96%',
      metricLabel: 'Pass Rate After'
    },
    {
      icon: <Target size={22} />,
      title: 'Interview Prep',
      subtitle: 'Practice real technical interviews with people who have been on the other side of the table.',
      desc: 'Mock system design and behavioral interviews so you walk in with confidence.',
      metric: '3.4x',
      metricLabel: 'Better Clearance'
    },
    {
      icon: <Sliders size={22} />,
      title: 'Application Support',
      subtitle: 'We help you apply to the right roles, not just spray and pray across job boards.',
      desc: 'Targeted applications to roles that actually match your background. Quality over quantity.',
      metric: '150+',
      metricLabel: 'Weekly Apps'
    },
    {
      icon: <Handshake size={22} />,
      title: 'Offer Negotiation',
      subtitle: 'Most engineers leave money on the table. We make sure you don\'t.',
      desc: 'We help you evaluate offers, compare compensation packages, and negotiate confidently.',
      metric: '+$24.5K',
      metricLabel: 'Avg. Salary Lift'
    }
  ];

  return (
    <div className="relative z-10 pt-24">
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <div className="aurora-badge">
            IT Staffing & Career Advisory
          </div>
        </motion.div>

        <TextReveal className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.05] text-indigo-950 max-w-5xl font-display mb-8" delay={0.4}>
          We help engineers land better jobs, faster.
        </TextReveal>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg md:text-xl text-purple-900/80 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Hyrzilla is a placement advisory for software engineers, cloud professionals, and data specialists. We rebuild your resume, prep you for interviews, and actively help you get hired.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
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

        {/* ATS Simulator Widget */}
        <ScrollReveal className="w-full max-w-4xl mx-auto">
          <TiltCard className="rounded-3xl">
            <AtsSimulatorWidget />
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* ═══════════ RESUME REWRITER SECTION ═══════════ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">
                Resume Before & After
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight mb-4">
                See what a real <span className="text-aurora">resume rewrite</span> looks like
              </h2>
              <p className="text-purple-900/70 max-w-lg mx-auto text-base">
                Generic bullet points get filtered out. Specific, metrics-driven ones get callbacks. Here's the difference.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <TiltCard className="rounded-3xl">
              <AtsRewriterWidget />
            </TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ WORKFLOW SHOWCASE SECTION ═══════════ */}

      {/* MOBILE: vertical stack (hidden on md+) */}
      <section className="md:hidden py-12 px-5 bg-gradient-to-b from-purple-50 to-violet-50 border-y border-purple-200/60 my-8">
        <div className="mb-8 text-center">
          <div className="aurora-badge mb-3 mx-auto w-fit">How We Work</div>
          <h2 className="text-2xl font-bold font-display tracking-tight text-indigo-950 mb-2">
            From resume to <span className="text-aurora">signed offer</span>
          </h2>
          <p className="text-purple-900/70 text-sm">Four steps. One goal. Get you hired at a salary you deserve.</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center text-violet-700 shrink-0">
                  {step.icon}
                </div>
                <span className="text-[11px] font-bold text-violet-700 uppercase tracking-widest font-mono">Step 0{idx + 1}</span>
              </div>
              <h3 className="text-base font-bold text-indigo-950 mb-1 font-display">{step.title}</h3>
              <p className="text-xs text-purple-900/80 mb-3 leading-relaxed">{step.subtitle}</p>
              <div className="pt-3 border-t border-purple-200/50 flex items-center justify-between">
                <span className="text-lg font-extrabold text-aurora font-mono">{step.metric}</span>
                <span className="text-[11px] text-purple-900/60 font-mono">{step.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESKTOP: horizontal pinned scroll (hidden on mobile) */}
      <section
        ref={horizontalRef}
        className="hidden md:block relative overflow-hidden py-14 bg-gradient-to-r from-purple-100/90 via-violet-100/80 to-indigo-100/90 border-y border-purple-200/70 shadow-sm text-indigo-950 my-10"
      >
        <div className="flex items-center py-6">
          <div ref={horizontalTrackRef} className="flex gap-6 px-[8vw] items-center will-change-transform">
            {/* Intro Column */}
            <div className="flex-shrink-0 w-[36vw] min-w-[300px] flex flex-col justify-center pr-6">
              <div className="aurora-badge mb-3 w-fit">How We Work</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-3 text-indigo-950">
                From resume to <span className="text-aurora">signed offer</span>
              </h2>
              <p className="text-purple-900/80 text-sm max-w-sm">
                Four steps. One goal. Get you hired at a company and salary you actually deserve.
              </p>
            </div>
            {/* Step Cards */}
            {steps.map((step, idx) => (
              <div key={idx} className="flex-shrink-0 w-[350px] h-[360px]">
                <TiltCard className="h-full rounded-2xl">
                  <div className="glass-card flex flex-col justify-between h-full p-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-100/90 border border-violet-200 flex items-center justify-center text-violet-700 shadow-sm">
                          {step.icon}
                        </div>
                        <span className="text-xs font-bold text-violet-700 uppercase tracking-widest font-mono">Step 0{idx + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold text-indigo-950 mb-1 font-display">{step.title}</h3>
                      <p className="text-xs text-indigo-900/90 mb-2 font-medium">{step.subtitle}</p>
                      <p className="text-purple-900/70 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                    <div className="pt-4 border-t border-purple-200/50 flex items-center justify-between">
                      <span className="text-xl font-extrabold text-aurora font-mono">{step.metric}</span>
                      <span className="text-[11px] text-purple-900/60 font-mono">{step.metricLabel}</span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ INTERACTIVE PIPELINE NODE FLOW ═══════════ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">
                Interactive Pipeline
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight mb-4">
                How candidate applications <span className="text-aurora">reach hiring managers</span>
              </h2>
              <p className="text-purple-900/70 max-w-lg mx-auto text-base">
                Click through each stage to see how our placement support converts your application into interview rounds.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <ArchitectureVisualizer />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ ANIMATED STATS & MARKET INTEL ═══════════ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              <div className="glass-card text-center py-10">
                <AnimatedCounter target={96} suffix="%" className="text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-purple-900/70 mt-2 block font-mono">Resume Pass Rate</span>
              </div>
              <div className="glass-card text-center py-10">
                <AnimatedCounter target={3.4} suffix="x" decimals={1} className="text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-purple-900/70 mt-2 block font-mono">More Interviews</span>
              </div>
              <div className="glass-card text-center py-10">
                <AnimatedCounter target={24500} prefix="$" className="text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-purple-900/70 mt-2 block font-mono">Avg. Salary Increase</span>
              </div>
              <div className="glass-card text-center py-10">
                <AnimatedCounter target={78} suffix="%" className="text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-purple-900/70 mt-2 block font-mono">Resumes Auto-Rejected</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit">
                The Hiring Problem
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight mb-4">
                Why qualified engineers aren't getting callbacks
              </h2>
              <p className="text-purple-900/70 max-w-xl mx-auto">
                It's not your skills. It's how your resume talks about them. Most applications never reach a human.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              <div className="lg:col-span-7 glass-card text-left">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-indigo-950 font-display">Interview Callback Rates</h3>
                  <TrendingUp size={20} className="text-violet-600" />
                </div>
                <div className="relative h-72 mb-4">
                  <canvas ref={chartRef}></canvas>
                </div>
                <p className="text-sm text-purple-900/80">
                  <span className="text-indigo-950 font-semibold">The reality:</span> applying through portals without an optimized resume gives you less than a <span className="text-violet-700 font-semibold">2% chance</span> of hearing back.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-card flex-1">
                  <div className="w-10 h-10 rounded-xl bg-violet-100/80 border border-violet-200 flex items-center justify-center text-violet-700 mb-4 shadow-sm">
                    <Zap size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-indigo-950 mb-2 font-display">78% Never Seen by Humans</h4>
                  <p className="text-sm text-purple-900/70 leading-relaxed">
                    Automated filters scan for specific keywords and formats. If your resume doesn't match, it's rejected before anyone reads it.
                  </p>
                </div>
                <div className="glass-card-accent flex-1">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-violet-500/20">
                    <Award size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-indigo-950 mb-2 font-display">3.4x More Interviews</h4>
                  <p className="text-sm text-purple-900/80 leading-relaxed">
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

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-20 text-center px-6 relative">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="gradient-divider mb-12" />
            <ShieldCheck size={36} className="text-violet-600 mx-auto mb-6" />
            <h3 className="text-2xl md:text-4xl font-bold text-indigo-950 mb-4 font-display">No hidden fees. No surprises.</h3>
            <p className="text-purple-900/80 max-w-lg mx-auto mb-8">
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
