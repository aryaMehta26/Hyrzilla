import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, ArrowRight, ShieldCheck, Zap, FileText, Target, Award, HelpCircle } from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';
import AnimatedCounter from '../components/AnimatedCounter';
import { useRef } from 'react';

function AnimatedStatCard({ icon, label, title, desc, stat, statSuffix, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const r = 30;
  const circ = 2 * Math.PI * r;
  const pct = stat / 100;

  return (
    <motion.div
      ref={ref}
      className="glass-card relative overflow-hidden group"
      whileHover={{ y: -6, boxShadow: '0 20px 45px -10px rgba(124,58,237,0.15)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />

      <div className="flex items-start gap-4">
        {/* Progress Ring */}
        <div className="shrink-0 relative" style={{ width: 72, height: 72 }}>
          <svg width={72} height={72} className="-rotate-90">
            <circle cx={36} cy={36} r={r} stroke="rgba(167,139,250,0.15)" strokeWidth={5} fill="none" />
            <motion.circle
              cx={36} cy={36} r={r}
              stroke={color}
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={inView ? { strokeDashoffset: circ * (1 - pct) } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-extrabold font-mono" style={{ color }}>
              {inView ? <AnimatedCounter target={stat} suffix={statSuffix} className="inline" /> : '0'}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
              animate={inView ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {icon}
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color }}>{label}</span>
          </div>
          <h3 className="text-base font-bold text-indigo-950 mb-1 font-display">{title}</h3>
          <p className="text-purple-900/70 text-xs leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Insights() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "How does your process work?", a: "We start by reviewing your background and completely rewriting your resume to highlight your technical metrics. Then we set up 1-on-1 mock interview sessions, help you target the right job applications, and guide you through offer negotiation once callbacks start coming in." },
    { q: "What is the difference between the upfront fee and the placement fee?", a: "The upfront fee covers our time spent rebuilding your resume, setting up mock interview coaching, and creating your application strategy. The placement fee (10%-15%) is only due after you accept a job offer and start working." },
    { q: "How do you rewrite my resume?", a: "We take your existing experience and reframe your accomplishments around real metrics — system scale, latency reductions, uptime percentages, and database throughput. This helps your resume pass automated screeners and catches the attention of hiring managers." },
    { q: "What roles do you support?", a: "We work with candidates in Full-Stack & Backend Engineering, Cloud & DevOps, Data Engineering, AI/ML, Cybersecurity, QA Automation, and other tech domains." },
    { q: "How long does it take to start getting interview calls?", a: "Resume rewriting and profile setup takes 3 to 5 business days. Once we launch your applications, candidates typically start getting callback emails within 2 to 3 weeks." },
    { q: "Do you help with salary negotiation?", a: "Yes. Once you receive an offer, we help you evaluate total compensation (base salary, equity grants, sign-on bonus) and provide scripts and strategies to negotiate effectively." },
    { q: "What happens if I don't get hired?", a: "If you don't accept a job offer during our work together, you owe zero placement fees. Our placement fee is 100% contingent on you starting a new role." },
    { q: "Can I pay the placement fee in monthly installments?", a: "Yes, we offer flexible monthly installment options once your new paycheck starts coming in. Installment plans may carry a nominal processing surcharge." },
    { q: "Are there any additional costs like background checks?", a: "Background check and drug test fees may apply as required by the hiring company. These are third-party costs and are not included in our advisory or placement fees." }
  ];

  const trends = [
    { icon: <Zap size={18} />, label: 'Reality 01', title: 'Automated Filters Are Rough', desc: 'Over 75% of tech resumes are filtered out automatically before any human recruiter reads them.', stat: 75, statSuffix: '%', color: '#7C3AED' },
    { icon: <FileText size={18} />, label: 'Reality 02', title: 'Specific Metrics Matter', desc: 'Vague bullet points like "built backend services" get ignored. Hiring managers look for specific scale and metrics.', stat: 92, statSuffix: '%', color: '#4F46E5' },
    { icon: <Target size={18} />, label: 'Reality 03', title: 'Interview Prep Is Crucial', desc: 'Practicing real system design questions beforehand makes a massive difference in your confidence and pass rate.', stat: 3, statSuffix: '.4x', color: '#059669' },
    { icon: <Award size={18} />, label: 'Reality 04', title: 'Pay for Outcomes', desc: 'Placement services should align with your success. You shouldn\'t pay heavy fees until you actually land a job.', stat: 0, statSuffix: '', color: '#7C3AED' },
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-16 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">Questions & Answers</div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 font-display mb-6" delay={0.2}>
            Everything you need to know.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 max-w-2xl mx-auto leading-relaxed">
              Have questions about how Hyrzilla works, how pricing is structured, or how we rewrite resumes? We've got answers.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Trends — Interactive Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit font-mono">Market Context</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight">
                How hiring actually <span className="text-aurora">works today</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {trends.map((t, i) => (
                <AnimatedStatCard key={i} {...t} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="w-10 h-10 rounded-xl bg-violet-100/80 border border-violet-200 flex items-center justify-center text-violet-700 mx-auto mb-4 shadow-sm">
                <HelpCircle size={20} />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight mb-4">
                Frequently Asked <span className="text-aurora">Questions</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <ScrollReveal key={index} delay={index * 0.03}>
                  <motion.div
                    className="glass-card p-6 transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <button onClick={() => setOpenFaq(isOpen ? null : index)} className="w-full flex items-center justify-between text-left focus:outline-none">
                      <span className="text-base md:text-lg font-bold text-indigo-950 pr-4 font-display">{faq.q}</span>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={20} className="text-violet-600 shrink-0" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 pt-4 border-t border-purple-200/50 text-purple-900/80 text-sm leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <ScrollReveal>
          <div className="gradient-divider mb-12 max-w-sm mx-auto" />
          <ShieldCheck size={36} className="text-violet-600 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-950 mb-4 font-display">Still have questions?</h3>
          <p className="text-purple-900/80 max-w-lg mx-auto mb-8">Reach out to us directly and we'll be happy to walk you through everything.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton><Link to="/pricing" className="btn-aurora flex items-center gap-2">See Pricing <ArrowRight size={16} /></Link></MagneticButton>
            <MagneticButton><Link to="/contact" className="btn-ghost">Contact Us</Link></MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
