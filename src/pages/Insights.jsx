import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, ShieldCheck, Zap, FileText, Target, Award, HelpCircle } from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';

export default function Insights() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "How does your process work?", a: "We start by reviewing your background and completely rewriting your resume to highlight your technical metrics. Then we set up 1-on-1 mock interview sessions, help you target the right job applications, and guide you through offer negotiation once callbacks start coming in." },
    { q: "What is the difference between the upfront fee and the placement fee?", a: "The upfront fee covers our time spent rebuilding your resume, setting up mock interview coaching, and creating your application strategy. The placement fee (10%-15%) is only due after you accept a job offer and start working." },
    { q: "How do you rewrite my resume?", a: "We take your existing experience and reframe your accomplishments around real metrics — system scale, latency reductions, uptime percentages, and database throughput. This helps your resume pass automated screeners and catches the attention of engineering managers." },
    { q: "What engineering roles do you support?", a: "We work with candidates in Full-Stack & Backend Engineering, Cloud & DevOps, Data Engineering, AI/ML, Cybersecurity, and QA Automation." },
    { q: "How long does it take to start getting interview calls?", a: "Resume rewriting and profile setup takes 3 to 5 business days. Once we launch your applications, candidates typically start getting callback emails within 2 to 3 weeks." },
    { q: "Do you help with salary negotiation?", a: "Yes. Once you receive an offer, we help you evaluate total compensation (base salary, equity grants, sign-on bonus) and provide scripts and strategies to negotiate effectively." },
    { q: "What happens if I don't get hired?", a: "If you don't accept a job offer during our work together, you owe zero placement fees. Our placement fee is 100% contingent on you starting a new role." },
    { q: "Can I pay the placement fee in monthly installments?", a: "Yes, we offer flexible monthly installment options once your new paycheck starts coming in." }
  ];

  const trends = [
    { icon: <Zap size={20} />, label: 'Reality 01', title: 'Automated Filters Are Rough', desc: 'Over 75% of tech resumes are filtered out automatically before any human recruiter reads them.' },
    { icon: <FileText size={20} />, label: 'Reality 02', title: 'Specific Metrics Matter', desc: 'Vague bullet points like "built backend services" get ignored. Hiring managers look for specific scale and metrics.' },
    { icon: <Target size={20} />, label: 'Reality 03', title: 'Interview Prep Is Crucial', desc: 'Practicing real system design questions beforehand makes a massive difference in your confidence and pass rate.' },
    { icon: <Award size={20} />, label: 'Reality 04', title: 'Pay for Outcomes', desc: 'Placement services should align with your success. You shouldn\'t pay heavy fees until you actually land a job.' },
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">
            Questions & Answers
          </div>
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

      {/* Trends */}
      <section className="py-24 px-6">
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
                <div key={i} className="glass-card">
                  <div className="w-10 h-10 rounded-xl bg-violet-100/80 border border-violet-200 flex items-center justify-center text-violet-700 mb-4 shadow-sm">
                    {t.icon}
                  </div>
                  <span className="text-xs font-bold text-violet-700 tracking-widest uppercase font-mono block mb-1">{t.label}</span>
                  <h3 className="text-xl font-bold text-indigo-950 mb-2 font-display">{t.title}</h3>
                  <p className="text-purple-900/70 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
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
                  <div className="glass-card p-6 transition-all">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left focus:outline-none"
                    >
                      <span className="text-base md:text-lg font-bold text-indigo-950 pr-4 font-display">{faq.q}</span>
                      <ChevronDown 
                        size={20} 
                        className={`text-violet-600 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      />
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
                          <p className="mt-4 pt-4 border-t border-purple-200/50 text-purple-900/80 text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
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
