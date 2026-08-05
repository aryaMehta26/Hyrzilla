import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight, Zap, TrendingUp, Target, Award, ShieldCheck,
  FileText, Handshake, Sliders, ChevronLeft, ChevronRight, Users, Building2
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

/* ── Animated Bar (replaces Chart.js) ── */
function AnimatedBar({ label, value, max, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const pct = (value / max) * 100;
  return (
    <div ref={ref} className="flex-1 flex flex-col items-center gap-3">
      <div className="relative w-full h-52 bg-purple-100/40 rounded-xl overflow-hidden border border-purple-200/30">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-t-lg"
          style={{ background: color }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${pct}%` } : {}}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 text-sm font-extrabold font-mono text-white"
          style={{ bottom: `${Math.max(pct - 8, 4)}%` }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {value}%
        </motion.span>
      </div>
      <span className="text-xs text-purple-900/70 font-medium text-center leading-tight">{label}</span>
    </div>
  );
}

/* ── Animated Progress Ring ── */
function ProgressRing({ value, label, suffix = '%', size = 100, strokeWidth = 8, color = '#7C3AED' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const pct = typeof value === 'number' && value <= 100 ? value / 100 : 1;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} stroke="rgba(167,139,250,0.15)" strokeWidth={strokeWidth} fill="none" />
          <motion.circle
            cx={size/2} cy={size/2} r={r}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ * (1 - pct) } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-extrabold text-indigo-950 font-mono">
            {inView ? <AnimatedCounter target={value} suffix={suffix} className="inline" /> : `0${suffix}`}
          </span>
        </div>
      </div>
      <span className="text-xs text-purple-900/70 font-mono text-center">{label}</span>
    </div>
  );
}

export default function Home() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselTimer = useRef(null);

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
      subtitle: 'Most people leave money on the table. We make sure you don\'t.',
      desc: 'We help you evaluate offers, compare compensation packages, and negotiate confidently.',
      metric: '+$24.5K',
      metricLabel: 'Avg. Salary Lift'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    carouselTimer.current = setInterval(() => {
      setCarouselIdx(prev => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(carouselTimer.current);
  }, []);

  const goTo = (idx) => {
    setCarouselIdx(idx);
    clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(() => {
      setCarouselIdx(prev => (prev + 1) % steps.length);
    }, 4500);
  };

  return (
    <div className="relative z-10 pt-24">
      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-6">
          <div className="aurora-badge">IT Staffing & Career Advisory</div>
        </motion.div>

        <TextReveal className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.05] text-indigo-950 max-w-5xl font-display mb-8" delay={0.4}>
          We help tech professionals land better jobs, faster.
        </TextReveal>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="text-lg md:text-xl text-purple-900/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Hyrzilla is a placement advisory for tech professionals — developers, cloud architects, data specialists, and beyond. We rebuild your resume, prep you for interviews, and actively help you get hired.
        </motion.p>

        {/* Dual CTAs: Candidate + Company */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.5 }} className="flex flex-wrap justify-center gap-4 mb-16">
          <MagneticButton>
            <Link to="/pricing" className="btn-aurora flex items-center gap-2">
              <Users size={16} /> I'm a Candidate <ArrowRight size={16} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/for-companies" className="btn-ghost flex items-center gap-2">
              <Building2 size={16} /> I'm Hiring
            </Link>
          </MagneticButton>
        </motion.div>

        <ScrollReveal className="w-full max-w-4xl mx-auto">
          <TiltCard className="rounded-3xl">
            <AtsSimulatorWidget />
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* ═══════════ RESUME REWRITER ═══════════ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">Resume Before & After</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight mb-4">
                See what a real <span className="text-aurora">resume rewrite</span> looks like
              </h2>
              <p className="text-purple-900/70 max-w-lg mx-auto text-base">Generic bullet points get filtered out. Specific, metrics-driven ones get callbacks.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <TiltCard className="rounded-3xl"><AtsRewriterWidget /></TiltCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ HOW WE WORK — AUTO CAROUSEL ═══════════ */}
      <section className="py-16 px-6 bg-gradient-to-b from-purple-50/80 to-violet-50/60 border-y border-purple-200/50 my-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="aurora-badge mb-3 mx-auto w-fit">How We Work</div>
              <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-indigo-950 mb-3">
                From resume to <span className="text-aurora">signed offer</span>
              </h2>
              <p className="text-purple-900/70 text-sm max-w-md mx-auto">Four steps. One goal. Get you hired at a salary you deserve.</p>
            </div>
          </ScrollReveal>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className="relative h-1.5 rounded-full overflow-hidden transition-all" style={{ width: carouselIdx === i ? 48 : 20, background: carouselIdx === i ? '#7C3AED' : 'rgba(167,139,250,0.3)' }}>
                {carouselIdx === i && (
                  <motion.div className="absolute inset-0 bg-indigo-500 rounded-full origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4.5, ease: 'linear' }} key={carouselIdx} />
                )}
              </button>
            ))}
          </div>

          {/* Carousel Card */}
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselIdx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="glass-card p-6 md:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-violet-100/90 border border-violet-200 flex items-center justify-center text-violet-700 shadow-sm">
                        {steps[carouselIdx].icon}
                      </div>
                      <span className="text-xs font-bold text-violet-700 uppercase tracking-widest font-mono">Step 0{carouselIdx + 1}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => goTo((carouselIdx - 1 + steps.length) % steps.length)} className="w-8 h-8 rounded-lg bg-white/80 border border-purple-200/60 flex items-center justify-center text-purple-800 hover:bg-violet-100 transition-colors"><ChevronLeft size={16} /></button>
                      <button onClick={() => goTo((carouselIdx + 1) % steps.length)} className="w-8 h-8 rounded-lg bg-white/80 border border-purple-200/60 flex items-center justify-center text-purple-800 hover:bg-violet-100 transition-colors"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-indigo-950 mb-2 font-display">{steps[carouselIdx].title}</h3>
                  <p className="text-sm text-indigo-900/90 mb-2 font-medium">{steps[carouselIdx].subtitle}</p>
                  <p className="text-purple-900/70 text-sm leading-relaxed mb-6">{steps[carouselIdx].desc}</p>
                  <div className="pt-4 border-t border-purple-200/50 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-aurora font-mono">{steps[carouselIdx].metric}</span>
                    <span className="text-xs text-purple-900/60 font-mono">{steps[carouselIdx].metricLabel}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ INTERACTIVE PIPELINE ═══════════ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">Interactive Pipeline</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight mb-4">
                How candidate applications <span className="text-aurora">reach hiring managers</span>
              </h2>
              <p className="text-purple-900/70 max-w-lg mx-auto text-base">Click through each stage to see how our placement support converts your application into interview rounds.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <ArchitectureVisualizer />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ ANIMATED STATS ═══════════ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              <div className="glass-card text-center py-8">
                <AnimatedCounter target={96} suffix="%" className="text-3xl md:text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-purple-900/70 mt-2 block font-mono">Resume Pass Rate</span>
              </div>
              <div className="glass-card text-center py-8">
                <AnimatedCounter target={3.4} suffix="x" decimals={1} className="text-3xl md:text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-purple-900/70 mt-2 block font-mono">More Interviews</span>
              </div>
              <div className="glass-card text-center py-8">
                <span className="text-3xl md:text-4xl font-extrabold text-aurora font-mono block whitespace-nowrap">
                  <AnimatedCounter target={24500} prefix="$" className="inline" />
                </span>
                <span className="text-xs text-purple-900/70 mt-2 block font-mono">Avg. Salary Increase</span>
              </div>
              <div className="glass-card text-center py-8">
                <AnimatedCounter target={78} suffix="%" className="text-3xl md:text-4xl font-extrabold text-aurora font-mono block" />
                <span className="text-xs text-purple-900/70 mt-2 block font-mono">Resumes Auto-Rejected</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit">The Hiring Problem</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight mb-4">
                Why qualified candidates aren't getting callbacks
              </h2>
              <p className="text-purple-900/70 max-w-xl mx-auto">It's not your skills. It's how your resume talks about them. Most applications never reach a human.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Animated Bar Chart */}
              <div className="lg:col-span-7 glass-card text-left">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-indigo-950 font-display">Interview Callback Rates</h3>
                  <TrendingUp size={20} className="text-violet-600" />
                </div>
                <div className="flex gap-4 mb-6">
                  <AnimatedBar label="Applying on Your Own" value={1.8} max={30} color="rgba(167,139,250,0.4)" delay={0.1} />
                  <AnimatedBar label="Traditional Recruiter" value={4.2} max={30} color="rgba(167,139,250,0.65)" delay={0.3} />
                  <AnimatedBar label="With Hyrzilla" value={28.5} max={30} color="linear-gradient(180deg, #7C3AED, #4F46E5)" delay={0.5} />
                </div>
                <p className="text-sm text-purple-900/80">
                  <span className="text-indigo-950 font-semibold">The reality:</span> applying through portals without an optimized resume gives you less than a <span className="text-violet-700 font-semibold">2% chance</span> of hearing back.
                </p>
              </div>

              {/* Animated Info Cards with Progress Rings */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <motion.div className="glass-card flex-1" whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(124,58,237,0.15)' }} transition={{ duration: 0.3 }}>
                  <div className="flex items-start gap-4">
                    <ProgressRing value={78} label="" size={70} strokeWidth={6} color="#7C3AED" />
                    <div>
                      <h4 className="text-base font-bold text-indigo-950 mb-1 font-display">Never Seen by Humans</h4>
                      <p className="text-xs text-purple-900/70 leading-relaxed">Automated filters scan for specific keywords. If your resume doesn't match, it's rejected before anyone reads it.</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div className="glass-card-accent flex-1" whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(124,58,237,0.2)' }} transition={{ duration: 0.3 }}>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-[70px] h-[70px] rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <span className="text-xl font-extrabold font-mono">3.4x</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-indigo-950 mb-1 font-display">More Interviews</h4>
                      <p className="text-xs text-purple-900/80 leading-relaxed">Candidates who work with us get significantly more callbacks because their resumes actually reach the right people.</p>
                    </div>
                  </div>
                </motion.div>
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
            <p className="text-purple-900/80 max-w-lg mx-auto mb-8">You pay an upfront advisory fee, and the placement fee is due only after you actually start your new job.</p>
            <MagneticButton>
              <Link to="/pricing" className="btn-aurora flex items-center gap-2 mx-auto w-fit">View Plans & Pricing <ArrowRight size={16} /></Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
