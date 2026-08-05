import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, Zap, Target, Award, ChevronRight, TrendingUp, Users, BarChart2 } from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import AnimatedCounter from '../components/AnimatedCounter';

export default function About() {
  const [activePrinciple, setActivePrinciple] = useState(0);

  const principles = [
    {
      icon: <Zap size={22} />,
      title: 'Custom Work Only',
      desc: 'No automated tools or copy-paste templates. Every resume is rewritten by hand to match your real achievements, metrics, and the specific roles you target.',
      stat: '100%',
      statLabel: 'Hand-Crafted'
    },
    {
      icon: <Target size={22} />,
      title: 'Honest Coaching',
      desc: 'We don\'t tell you what you want to hear. We pinpoint your weak spots in interviews and work through them together until you walk in with real confidence.',
      stat: '3.4x',
      statLabel: 'Better Clearance'
    },
    {
      icon: <Award size={22} />,
      title: 'Fair Pricing',
      desc: 'Our success fee is tied directly to you getting hired. If you don\'t start a job, you don\'t pay the placement fee. Our incentives are aligned with yours.',
      stat: '$0',
      statLabel: 'If No Hire'
    }
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-16 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">
            About Hyrzilla
          </div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 font-display mb-6" delay={0.2}>
            Helping the right people get the roles they deserve.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 max-w-2xl mx-auto leading-relaxed">
              We started Hyrzilla because talented candidates get rejected for the wrong reasons — bad keyword formatting, poor resume structure, or interview nervousness. Your degree doesn't define you. Your skills, knowledge, and experience do.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Origin Story — Company Perspective */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl p-8 md:p-12 text-left relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E1040 0%, #2D1B6B 50%, #1A0B3B 100%)', border: '1px solid rgba(167,139,250,0.2)' }}>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                <div className="md:col-span-4">
                  <div className="w-20 h-20 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center mx-auto md:mx-0 mb-4">
                    <Users size={32} className="text-violet-300" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display text-center md:text-left">Why Hyrzilla Exists</h3>
                  <span className="text-xs font-bold text-violet-300 uppercase tracking-widest block font-mono mt-1 text-center md:text-left">Founded by Engineers & Talent Advisors</span>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-white/5 rounded-xl p-3 border border-violet-400/20 text-center">
                      <span className="text-lg font-extrabold text-violet-300 font-mono block">78%</span>
                      <span className="text-[10px] text-purple-300/60 font-mono">Resumes Filtered</span>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-violet-400/20 text-center">
                      <span className="text-lg font-extrabold text-violet-300 font-mono block">96%</span>
                      <span className="text-[10px] text-purple-300/60 font-mono">Our Pass Rate</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4 text-sm leading-relaxed" style={{ color: 'rgba(221,214,254,0.85)' }}>
                  <p>
                    We saw a broken hiring system. Market research showed that <span className="text-white font-semibold">78% of qualified resumes</span> never reach a human recruiter — they're filtered out by automated screeners before anyone reads them. Talented professionals with real skills were getting zero responses.
                  </p>
                  <p>
                    The problem wasn't their skills — it was how their experience was written. Vague sentences, missing metrics, poor keyword density. When we started helping people rewrite their resumes with real numbers, infrastructure scale, and specific outcomes, their callback rates jumped dramatically.
                  </p>
                  <p>
                    That's when we realized this could help thousands of candidates. Whether you have a degree or learned on your own, whether you come from a traditional background or a non-traditional path — if you have the skills, you deserve to be seen by hiring managers.
                  </p>
                  <div className="p-4 rounded-xl text-white font-medium italic" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(167,139,250,0.3)' }}>
                    "It shouldn't matter where you learned to code. What matters is what you can build, the problems you've solved, and the impact you've made."
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Principles — Interactive */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="aurora-badge mb-4 mx-auto w-fit">How We Think</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight">
                Our core <span className="text-aurora">principles</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Principle Selector */}
              <div className="lg:col-span-5 space-y-3">
                {principles.map((p, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActivePrinciple(i)}
                    className={`w-full p-5 rounded-2xl text-left transition-all duration-300 border ${
                      activePrinciple === i
                        ? 'bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-300 shadow-lg shadow-violet-500/10'
                        : 'bg-white/60 border-purple-200/40 hover:border-violet-200'
                    }`}
                    whileHover={{ x: activePrinciple === i ? 0 : 4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          activePrinciple === i
                            ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                            : 'bg-violet-100/80 border border-violet-200 text-violet-700'
                        }`}>
                          {p.icon}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-violet-700 uppercase tracking-widest font-mono block">0{i + 1}</span>
                          <h3 className="text-base font-bold text-indigo-950 font-display">{p.title}</h3>
                        </div>
                      </div>
                      <ChevronRight size={18} className={`text-violet-500 transition-transform ${activePrinciple === i ? 'rotate-90' : ''}`} />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Active Principle Detail */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePrinciple}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card-accent h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20`}>
                        {principles[activePrinciple].icon}
                      </div>
                      <h3 className="text-2xl font-bold text-indigo-950 mb-4 font-display">{principles[activePrinciple].title}</h3>
                      <p className="text-purple-900/80 text-sm leading-relaxed">{principles[activePrinciple].desc}</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-purple-200/50 flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-extrabold text-aurora font-mono">{principles[activePrinciple].stat}</span>
                        <span className="text-xs text-purple-900/60 font-mono ml-2">{principles[activePrinciple].statLabel}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-violet-100/60 border border-violet-200/60 flex items-center justify-center">
                        <TrendingUp size={20} className="text-violet-600" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <ScrollReveal>
          <div className="gradient-divider mb-12 max-w-sm mx-auto" />
          <ShieldCheck size={36} className="text-violet-600 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-950 mb-4 font-display">Let's talk about your career</h3>
          <p className="text-purple-900/80 max-w-lg mx-auto mb-8">Get in touch with us for a straightforward review of your situation.</p>
          <MagneticButton>
            <Link to="/contact" className="btn-aurora flex items-center gap-2 mx-auto w-fit">Get In Touch <ArrowRight size={16} /></Link>
          </MagneticButton>
        </ScrollReveal>
      </section>
    </div>
  );
}
