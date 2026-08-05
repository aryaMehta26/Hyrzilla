import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, ShieldCheck, Zap, Award, Target, ArrowRight, PieChart, BarChart2 } from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import AnimatedCounter from '../components/AnimatedCounter';

/* ── Animated Doughnut Segment ── */
function AnimatedDoughnut({ data, colors, labels, size = 240 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const total = data.reduce((a, b) => a + b, 0);
  const r = size / 2 - 20;
  const circ = 2 * Math.PI * r;
  let cumulativeOffset = 0;

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(167,139,250,0.1)" strokeWidth={22} fill="none" />
        {data.map((val, i) => {
          const pct = val / total;
          const dashLen = circ * pct;
          const offset = circ * cumulativeOffset;
          cumulativeOffset += pct;
          return (
            <motion.circle
              key={i}
              cx={size/2} cy={size/2} r={r}
              stroke={colors[i]}
              strokeWidth={22}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dashLen - 4} ${circ - dashLen + 4}`}
              initial={{ strokeDashoffset: circ }}
              animate={inView ? { strokeDashoffset: -offset } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        {labels.map((label, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-xs font-mono"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: colors[i] }} />
            <span className="text-purple-900/70">{label} ({data[i]}%)</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Animated Growing Bars ── */
function AnimatedBarChart({ data, labels, maxVal }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <div ref={ref} className="flex items-end gap-4 h-56">
      {data.map((val, i) => {
        const pct = (val / maxVal) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <motion.span
              className="text-xs font-extrabold font-mono text-indigo-950"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.15 }}
            >
              {val}%
            </motion.span>
            <div className="w-full bg-purple-100/30 rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-t-lg"
                style={{ background: `linear-gradient(180deg, #7C3AED ${100 - pct}%, #4F46E5)` }}
                initial={{ height: 0 }}
                animate={inView ? { height: `${pct}%` } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="text-[11px] text-purple-900/70 font-medium text-center">{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function WhyUs() {
  const diffCards = [
    {
      icon: <Zap size={22} />,
      title: 'No Copy-Paste Resumes',
      desc: 'We write every resume from scratch based on your actual achievements, infrastructure scale, and project impact.',
      stat: '100%',
      statLabel: 'Custom Written',
      color: '#7C3AED'
    },
    {
      icon: <Target size={22} />,
      title: 'Realistic Interview Prep',
      desc: 'Practice system design and whiteboarding with experienced engineers who give you honest, actionable feedback.',
      stat: '3.4x',
      statLabel: 'Better Clearance',
      color: '#4F46E5'
    },
    {
      icon: <Award size={22} />,
      title: 'Aligned Incentives',
      desc: 'We only make money when you get hired. That keeps us focused on getting you real results, not just selling services.',
      stat: '$0',
      statLabel: 'If No Hire',
      color: '#059669'
    }
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-16 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">Why Work With Us</div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 font-display mb-6" delay={0.2}>
            Built by people who understand hiring.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 max-w-2xl mx-auto leading-relaxed">
              We know what it's like to apply for dozens of jobs and get zero responses. We built Hyrzilla to give candidates a real edge in today's market.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Animated Charts */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit font-mono">Our Results</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight">
                Where candidates land & <span className="text-aurora">how fast</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="glass-card text-center">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-indigo-950 font-display">Placements by Domain</h3>
                  <PieChart size={20} className="text-violet-600" />
                </div>
                <AnimatedDoughnut
                  data={[38, 28, 20, 14]}
                  colors={['#7C3AED', '#4F46E5', '#059669', '#A78BFA']}
                  labels={['Full-Stack / Backend', 'Cloud / DevOps', 'Data Engineering', 'AI & Security']}
                />
              </div>
              <div className="glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-indigo-950 font-display">Interview Callback Timeline</h3>
                  <BarChart2 size={20} className="text-indigo-600" />
                </div>
                <AnimatedBarChart
                  data={[12, 44, 78, 92]}
                  labels={['Week 1', 'Week 2', 'Week 3', 'Week 4+']}
                  maxVal={100}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Differentiation — Interactive Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">What Sets Us Apart</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight">
                Why candidates <span className="text-aurora">choose us</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {diffCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="glass-card relative overflow-hidden"
                  whileHover={{ y: -8, boxShadow: '0 24px 50px -12px rgba(124,58,237,0.18)' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: card.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  />
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`, boxShadow: `0 4px 15px ${card.color}33` }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, delay: i * 0.1 }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-indigo-950 mb-3 font-display">{card.title}</h3>
                  <p className="text-purple-900/70 text-sm leading-relaxed mb-6">{card.desc}</p>
                  <div className="pt-4 border-t border-purple-200/40 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-aurora font-mono">{card.stat}</span>
                    <span className="text-xs text-purple-900/60 font-mono">{card.statLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <ScrollReveal>
          <div className="gradient-divider mb-12 max-w-sm mx-auto" />
          <ShieldCheck size={36} className="text-violet-600 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-950 mb-4 font-display">Ready to land your next role?</h3>
          <p className="text-purple-900/80 max-w-lg mx-auto mb-8">Take a look at our plans or get in touch with our team.</p>
          <MagneticButton>
            <Link to="/pricing" className="btn-aurora flex items-center gap-2 mx-auto w-fit">See Plans <ArrowRight size={16} /></Link>
          </MagneticButton>
        </ScrollReveal>
      </section>
    </div>
  );
}
