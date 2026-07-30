import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Chart, registerables } from 'chart.js';
import { 
  CheckCircle2, ArrowRight, Zap, TrendingUp, Sliders, Target, 
  Handshake, ShieldCheck, Sparkles, Award, FileText, Check 
} from 'lucide-react';

Chart.register(...registerables);

// Interactive 3D Card Component
function TiltCard({ children, className = '', borderGlow = false }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bento-card-react ${borderGlow ? 'border-[rgba(37,232,122,0.4)] shadow-emeraldGlow' : ''} ${className}`}
    >
      {borderGlow && <div className="border-beam" />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Home() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroY = useTransform(smoothProgress, [0, 0.25], [0, -60]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.3]);
  const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 0.94]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      Chart.defaults.color = '#A1B5A8';
      Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Unoptimized Applications', 'Standard Job Portal Outreach', 'Hyrzilla Candidate Strategy'],
          datasets: [{
            label: 'Interview Callback Rate (%)',
            data: [1.8, 4.2, 28.5],
            backgroundColor: [
              'rgba(255, 255, 255, 0.18)',
              'rgba(255, 255, 255, 0.45)',
              'rgba(37, 232, 122, 0.9)'
            ],
            borderColor: '#25E87A',
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
              backgroundColor: 'rgba(4, 9, 6, 0.95)',
              titleColor: '#fff',
              bodyColor: '#A1B5A8',
              borderColor: 'rgba(37, 232, 122, 0.3)',
              borderWidth: 1,
              padding: 12,
              callbacks: {
                label: (context) => ` Callback Rate: ${context.raw}%`
              }
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(37,232,122,0.06)' },
              beginAtZero: true,
              ticks: { callback: (val) => `${val}%` }
            },
            x: { grid: { display: false } }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div ref={containerRef} className="relative z-10 pt-28">
      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="py-24 md:py-32 text-center relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[rgba(37,232,122,0.3)] bg-[rgba(10,24,16,0.85)] backdrop-blur-xl mb-8 shadow-emeraldGlow"
          >
            <Sparkles size={14} className="text-brandGreen animate-pulse" />
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              Tech Placement & Career Acceleration
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Accelerating tech careers. <br />
            <span className="h-green-gradient italic">Landing top engineering roles.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-tMuted max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Hyrzilla equips software engineers, data architects, and cloud leads with ATS resume architecture, 1-on-1 mock interview coaching, and active application placement to secure top offers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-5"
          >
            <Link
              to="/pricing"
              className="px-8 py-4 rounded-full text-base font-semibold bg-brandGreen text-black hover:scale-105 transition-all shadow-emeraldGlow flex items-center gap-2"
            >
              Explore Candidate Plans <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 rounded-full text-base font-semibold border border-[rgba(37,232,122,0.3)] bg-cardBg text-tMain hover:border-brandGreen hover:bg-[rgba(37,232,122,0.08)] transition-all"
            >
              View Services
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Market Intelligence Section (Distinct Contrast Background) */}
      <section className="py-24 bg-accentBg border-y border-[rgba(37,232,122,0.16)] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[rgba(37,232,122,0.25)] bg-[rgba(37,232,122,0.08)] text-xs font-bold text-brandGreen uppercase tracking-widest mb-4">
              Market Intelligence
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              The Reality of the <span className="h-green-gradient italic">US Tech Job Market</span>
            </h2>
            <p className="text-tMuted text-base md:text-lg max-w-2xl mx-auto">
              In today's hiring landscape, over 75% of qualified engineers get filtered out before a human recruiter ever opens their resume. Strategic positioning changes the game.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Story Chart */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <TiltCard borderGlow={true}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-tMain">Application Success Rate Benchmark</h3>
                  <TrendingUp size={22} className="text-brandGreen" />
                </div>
                <div className="relative h-72 mb-6">
                  <canvas ref={chartRef}></canvas>
                </div>
                <p className="text-sm text-tMuted leading-relaxed">
                  <strong className="text-tMain">The Cold Application Bottleneck:</strong> Traditional job portal applications yield a <strong className="text-brandGreen">&lt;1.8% callback rate</strong> due to automated keyword filters and generic resume formatting.
                </p>
              </TiltCard>
            </motion.div>

            {/* Key Data Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <motion.div variants={itemVariants} className="flex-1">
                <TiltCard className="h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                    <Zap size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-tMain mb-2">78% Filtered by ATS Algorithms</h4>
                  <p className="text-sm text-tMuted leading-relaxed">
                    Without tailored technical keyword architecture, even highly senior engineers fail initial keyword screenings.
                  </p>
                </TiltCard>
              </motion.div>

              <motion.div variants={itemVariants} className="flex-1">
                <TiltCard borderGlow={true} className="h-full bg-[rgba(14,34,23,0.85)]">
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.2)] border border-brandGreen flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                    <Award size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-brandGreen mb-2">3.4x Higher Interview Rate</h4>
                  <p className="text-sm text-tMuted leading-relaxed">
                    Candidates paired with Hyrzilla profile optimization and interview coaching secure significantly more screening calls and offer rounds.
                  </p>
                </TiltCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Candidate Services Bento Section (Dark Background) */}
      <section className="py-24 bg-bgDark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[rgba(37,232,122,0.2)] bg-[rgba(37,232,122,0.08)] text-xs font-bold text-brandGreen uppercase tracking-widest mb-4">
              Comprehensive Support
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Designed Exclusively for <span className="h-green-gradient italic">Job Seekers</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Service 1 */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                  <FileText size={22} />
                </div>
                <h3 className="text-xl font-bold text-tMain mb-3">Resume Architecture & ATS Optimization</h3>
                <p className="text-tMuted text-sm leading-relaxed mb-4">
                  We overhaul your resume format and technical keyword balance to pass modern applicant tracking systems and captivate engineering managers.
                </p>
                <ul className="space-y-2 text-sm text-tMuted">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Hard Tech Stack Framing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Quantified Metrics & Accomplishments</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> High-Impact Formatting</li>
                </ul>
              </TiltCard>
            </motion.div>

            {/* Service 2 */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                  <Target size={22} />
                </div>
                <h3 className="text-xl font-bold text-tMain mb-3">1-on-1 Mock Interview Prep</h3>
                <p className="text-tMuted text-sm leading-relaxed mb-4">
                  Practice technical domain questions and behavioral scenarios with experienced mentors to eliminate anxiety and clear interview rounds.
                </p>
                <ul className="space-y-2 text-sm text-tMuted">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Technical Architecture Simulation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Behavioral STAR Framework Practice</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Detailed Performance Feedback</li>
                </ul>
              </TiltCard>
            </motion.div>

            {/* Service 3 */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                  <Sliders size={22} />
                </div>
                <h3 className="text-xl font-bold text-tMain mb-3">Active Job Application Placement</h3>
                <p className="text-tMuted text-sm leading-relaxed mb-4">
                  We assist with active application submission across top job boards and portal requisitions tailored to your tech stack.
                </p>
                <ul className="space-y-2 text-sm text-tMuted">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Stack-Specific Requisition Matching</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Daily Application Outreach</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Real-time Application Tracking</li>
                </ul>
              </TiltCard>
            </motion.div>

            {/* Service 4 */}
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                  <Handshake size={22} />
                </div>
                <h3 className="text-xl font-bold text-tMain mb-3">Offer & Salary Negotiation</h3>
                <p className="text-tMuted text-sm leading-relaxed mb-4">
                  Evaluate multiple offer letters, negotiate base salary and equity, and receive guidance on background check onboarding.
                </p>
                <ul className="space-y-2 text-sm text-tMuted">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Compensation Breakdown Evaluation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Strategic Counter-Offer Scripting</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Onboarding Verification Guidance</li>
                </ul>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3D Framework Steps (Distinct Accent Background) */}
      <section className="py-24 bg-accentBg border-y border-[rgba(37,232,122,0.16)] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              The Hyrzilla <span className="h-green-gradient italic">Framework</span>
            </h2>
            <p className="text-tMuted text-base md:text-lg max-w-xl mx-auto">
              A structured, transparent methodology engineered for rapid career placement.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                  <Sliders size={22} />
                </div>
                <span className="text-xs font-bold text-brandGreen tracking-widest uppercase">01</span>
                <h3 className="text-xl font-bold text-tMain my-3">Profile Calibration</h3>
                <p className="text-sm text-tMuted leading-relaxed">
                  We analyze your technical accomplishments and restructure your resume and portfolio to pass modern keyword filters and captivate recruiters.
                </p>
              </TiltCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                  <Target size={22} />
                </div>
                <span className="text-xs font-bold text-brandGreen tracking-widest uppercase">02</span>
                <h3 className="text-xl font-bold text-tMain my-3">Interview Simulation</h3>
                <p className="text-sm text-tMuted leading-relaxed">
                  Conduct realistic mock technical panels and behavioral coaching to eliminate interview anxiety and ensure round clearance.
                </p>
              </TiltCard>
            </motion.div>

            <motion.div variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                  <Handshake size={22} />
                </div>
                <span className="text-xs font-bold text-brandGreen tracking-widest uppercase">03</span>
                <h3 className="text-xl font-bold text-tMain my-3">Placement & Onboarding</h3>
                <p className="text-sm text-tMuted leading-relaxed">
                  We assist with active application outreach, salary negotiation, and onboarding support to secure your ideal compensation package.
                </p>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-20 text-center bg-bgDark">
        <div className="max-w-4xl mx-auto px-6">
          <ShieldCheck size={36} className="text-brandGreen mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-tMain mb-4">Transparent Candidate Plans</h3>
          <p className="text-tMuted text-base max-w-xl mx-auto mb-8">
            Candidate plans start from $499 upfront with success fees due only upon job start.
          </p>
          <div className="flex justify-center">
            <Link to="/pricing" className="px-8 py-4 rounded-full text-base font-semibold bg-brandGreen text-black shadow-emeraldGlow flex items-center gap-2">
              View Candidate Pricing Plans <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
