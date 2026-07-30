import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Zap, Sliders, Target, ShieldCheck, ChevronDown, 
  ArrowRight, Sparkles, FileText, Award, HelpCircle 
} from 'lucide-react';

export default function Insights() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does Hyrzilla's candidate placement model work?",
      a: "We work directly with software engineers, cloud architects, and data leads to overhaul their technical resume, optimize portal positioning, conduct 1-on-1 mock interviews, and assist with active application outreach. Upfront plan fees cover initial profile architecture, with a placement success fee due only after your job start date."
    },
    {
      q: "What is the difference between the upfront fee and the placement success fee?",
      a: "The upfront plan fee ($499, $1,499, or $2,499) covers dedicated advisory bandwidth, custom resume rebuilding, LinkedIn optimization, and mock interview coaching. The placement percentage (15%, 12%, or 10%) is payable strictly after you accept an offer and begin your job."
    },
    {
      q: "How do you optimize my resume for modern ATS keyword algorithms?",
      a: "We analyze target job descriptions in your core stack (Full-Stack, Cloud/DevOps, Data, AI) and restructure your accomplishments into high-impact, ATS-parseable metrics that pass automated keyword filters and immediately highlight your technical capability to engineering managers."
    },
    {
      q: "What technical stacks do you specialize in?",
      a: "We specialize in high-demand engineering domains: Full-Stack & Backend (React, Node, Python, Java, Go), Cloud & DevOps (AWS, Azure, K8s, Terraform), Data Engineering (PySpark, SQL, Snowflake), AI/ML, Cybersecurity, and QA Automation."
    },
    {
      q: "How long does the average placement support process take?",
      a: "Profile calibration and resume architecture are completed within 3 to 5 business days. Once deployed, candidates typically begin securing interview callbacks within 2 to 3 weeks."
    },
    {
      q: "Will you help me negotiate my final offer and compensation package?",
      a: "Yes. Our Strategic Acceleration and Executive Partnership plans include offer evaluation, counter-offer scripting, base/equity negotiation guidance, and onboarding background verification support."
    }
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero Section */}
      <section className="py-20 text-center bg-bgDark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[rgba(37,232,122,0.25)] bg-[rgba(10,24,16,0.8)] backdrop-blur-xl mb-6 shadow-emeraldGlow">
            <Sparkles size={14} className="text-brandGreen animate-pulse" />
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              2026 US Tech Market Report & Candidate FAQ
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Cut through the noise. <br />
            <span className="h-green-gradient italic">Navigate 2026 Tech Hiring.</span>
          </h1>

          <p className="text-lg text-tMuted max-w-2xl mx-auto leading-relaxed">
            In a hiring market shaped by automated ATS filters, AI screening, and skills-based evaluation, explore the key trends driving engineering recruitment and find answers to common candidate questions.
          </p>
        </div>
      </section>

      {/* 2026 Talent Trends Report Section (Distinct Accent Background) */}
      <section className="py-24 bg-accentBg border-y border-[rgba(37,232,122,0.16)] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[rgba(37,232,122,0.2)] bg-[rgba(37,232,122,0.08)] text-xs font-bold text-brandGreen uppercase tracking-widest mb-4">
              Market Trends 2026
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Key Trends Shaping <span className="h-green-gradient italic">Tech Placement</span>
            </h2>
            <p className="text-tMuted text-base md:text-lg max-w-xl mx-auto">
              Understand what is really determining candidate success in today's US technical market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Trend 1 */}
            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <Zap size={22} />
              </div>
              <span className="text-xs font-bold text-brandGreen tracking-widest uppercase">Trend 01</span>
              <h3 className="text-xl font-bold text-tMain my-2">The Algorithmic ATS Barrier</h3>
              <p className="text-tMuted text-sm leading-relaxed">
                Over 78% of unoptimized tech resumes are automatically filtered out by recruitment AI before a human recruiter sees them. Passing keyword thresholds is step one for securing interviews.
              </p>
            </div>

            {/* Trend 2 */}
            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <FileText size={22} />
              </div>
              <span className="text-xs font-bold text-brandGreen tracking-widest uppercase">Trend 02</span>
              <h3 className="text-xl font-bold text-tMain my-2">Hard Stack Technical Framing</h3>
              <p className="text-tMuted text-sm leading-relaxed">
                Generic titles ("Senior Developer") fail to attract callbacks. Hiring managers now look for stack-specific technical framing: exact cloud services, database scale, and framework metrics.
              </p>
            </div>

            {/* Trend 3 */}
            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <Target size={22} />
              </div>
              <span className="text-xs font-bold text-brandGreen tracking-widest uppercase">Trend 03</span>
              <h3 className="text-xl font-bold text-tMain my-2">Mock Interview Simulation Clearance</h3>
              <p className="text-tMuted text-sm leading-relaxed">
                Technical interview clearance rates jump by 3.4x when candidates perform realistic 1-on-1 mock panel simulations prior to actual company screenings.
              </p>
            </div>

            {/* Trend 4 */}
            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <Award size={22} />
              </div>
              <span className="text-xs font-bold text-brandGreen tracking-widest uppercase">Trend 04</span>
              <h3 className="text-xl font-bold text-tMain my-2">Outcome-Based Success Agreements</h3>
              <p className="text-tMuted text-sm leading-relaxed">
                The modern tech placement industry is shifting toward outcome-aligned advisory: minimal upfront costs with success fees payable only after the candidate starts their new role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section (Dark Background) */}
      <section className="py-24 bg-bgDark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mx-auto mb-4 shadow-emeraldGlow">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked <span className="h-green-gradient italic">Questions</span>
            </h2>
            <p className="text-tMuted text-base md:text-lg max-w-xl mx-auto">
              Everything you need to know about our candidate enrollment, resume building, and placement process.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bento-card-react border border-[rgba(37,232,122,0.16)] transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-lg font-bold text-tMain pr-4">{faq.q}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-brandGreen shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
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
                        <p className="mt-4 pt-4 border-t border-[rgba(37,232,122,0.14)] text-tMuted text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 text-center bg-accentBg border-t border-[rgba(37,232,122,0.16)]">
        <div className="max-w-3xl mx-auto px-6">
          <ShieldCheck size={36} className="text-brandGreen mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-tMain mb-4">Ready to accelerate your job search?</h3>
          <p className="text-tMuted text-base max-w-lg mx-auto mb-8">
            Select an enrollment plan or reach out to our team for a personalized career consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pricing" className="px-8 py-3.5 rounded-full bg-brandGreen text-black font-semibold shadow-emeraldGlow flex items-center gap-2">
              View Candidate Pricing <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="px-8 py-3.5 rounded-full border border-[rgba(37,232,122,0.3)] bg-cardBg text-tMain font-semibold hover:border-brandGreen transition-all">
              Contact Advisory Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
