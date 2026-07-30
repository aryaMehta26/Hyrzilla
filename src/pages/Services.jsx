import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Target, Sliders, Handshake, CheckCircle2, ArrowRight, Code2, Cpu, Database, Shield } from 'lucide-react';

export default function Services() {
  return (
    <div className="relative z-10 pt-28">
      <section className="py-20 text-center bg-bgDark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-5 py-2 rounded-full border border-[rgba(37,232,122,0.2)] bg-cardBg backdrop-blur-md mb-6">
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              Candidate Career Services
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Candidate <span className="h-green-gradient italic">Placement Solutions.</span>
          </h1>
          <p className="text-lg text-tMuted max-w-2xl mx-auto">
            Comprehensive, end-to-end career guidance built for software engineers, data architects, and cloud specialists looking to land top technical roles.
          </p>
        </div>
      </section>

      {/* Talent Solutions Grid (Distinct Contrast Background) */}
      <section className="py-24 bg-accentBg border-y border-[rgba(37,232,122,0.16)] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[rgba(37,232,122,0.2)] bg-[rgba(37,232,122,0.08)] text-xs font-bold text-brandGreen uppercase tracking-widest mb-4">
              Our Core Services
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Everything You Need to <span className="h-green-gradient italic">Get Hired</span>
            </h2>
            <p className="text-tMuted text-base md:text-lg max-w-xl mx-auto">
              From ATS keyword optimization to salary negotiation, we support every phase of your job hunt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <FileText size={22} />
              </div>
              <h4 className="text-xl font-bold text-tMain mb-3">1. Resume Architecture & Profile Optimization</h4>
              <p className="text-tMuted text-sm leading-relaxed mb-4">
                We overhaul your resume format and technical keyword balance to pass modern applicant tracking systems and captivate engineering managers.
              </p>
              <ul className="space-y-2 text-sm text-tMuted">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Hard Tech Stack & Framework Framing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Quantified Metrics & Accomplishments</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> LinkedIn & Portal Optimization</li>
              </ul>
            </div>

            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <Target size={22} />
              </div>
              <h4 className="text-xl font-bold text-tMain mb-3">2. Active Application Placement & Outreach</h4>
              <p className="text-tMuted text-sm leading-relaxed mb-4">
                We assist with active job application placement across relevant technical positions, matching your experience level to active hiring requisitions.
              </p>
              <ul className="space-y-2 text-sm text-tMuted">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Stack-Specific Requisition Matching</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Daily Application Outreach</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Real-time Application Tracking</li>
              </ul>
            </div>

            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <Sliders size={22} />
              </div>
              <h4 className="text-xl font-bold text-tMain mb-3">3. 1-on-1 Mock Interview Prep</h4>
              <p className="text-tMuted text-sm leading-relaxed mb-4">
                Conduct specialized 1-on-1 mock technical panels and behavioral screening prep so you enter interviews confident and fully prepared.
              </p>
              <ul className="space-y-2 text-sm text-tMuted">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Technical Architecture Simulation</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Behavioral STAR Framework Practice</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Detailed Performance Feedback</li>
              </ul>
            </div>

            <div className="bento-card-react">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(37,232,122,0.12)] border border-[rgba(37,232,122,0.3)] flex items-center justify-center text-brandGreen mb-4 shadow-emeraldGlow">
                <Handshake size={22} />
              </div>
              <h4 className="text-xl font-bold text-tMain mb-3">4. Offer Guidance & Salary Negotiation</h4>
              <p className="text-tMuted text-sm leading-relaxed mb-4">
                Evaluate multiple offer letters, negotiate base salary and equity, and receive guidance on background check onboarding.
              </p>
              <ul className="space-y-2 text-sm text-tMuted">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Compensation Breakdown Evaluation</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Strategic Counter-Offer Scripting</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brandGreen" /> Onboarding Verification Guidance</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link to="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brandGreen text-black font-semibold shadow-emeraldGlow">
              View Candidate Pricing Plans <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Domains We Support (Dark Background) */}
      <section className="py-24 bg-bgDark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Tech Domains We <span className="h-green-gradient italic">Specialized In</span>
            </h2>
            <p className="text-tMuted text-base md:text-lg max-w-xl mx-auto">
              Our career optimization is tailored to high-demand technical specializations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bento-card-react">
              <Code2 size={24} className="text-brandGreen mb-3" />
              <h4 className="text-lg font-bold text-tMain mb-2">Full-Stack & Backend</h4>
              <p className="text-xs text-tMuted leading-relaxed">React, Node.js, Python, Java, Go, Microservices Architecture.</p>
            </div>

            <div className="bento-card-react">
              <Cpu size={24} className="text-brandGreen mb-3" />
              <h4 className="text-lg font-bold text-tMain mb-2">Cloud & DevOps</h4>
              <p className="text-xs text-tMuted leading-relaxed">AWS, Azure, GCP, Kubernetes, Terraform, CI/CD Pipelines.</p>
            </div>

            <div className="bento-card-react">
              <Database size={24} className="text-brandGreen mb-3" />
              <h4 className="text-lg font-bold text-tMain mb-2">Data Engineering & Analytics</h4>
              <p className="text-xs text-tMuted leading-relaxed">PySpark, SQL, Snowflake, Airflow, ETL Pipelines, BI.</p>
            </div>

            <div className="bento-card-react">
              <Sliders size={24} className="text-brandGreen mb-3" />
              <h4 className="text-lg font-bold text-tMain mb-2">AI & Machine Learning</h4>
              <p className="text-xs text-tMuted leading-relaxed">PyTorch, TensorFlow, LLMs, Computer Vision, MLOps.</p>
            </div>

            <div className="bento-card-react">
              <Shield size={24} className="text-brandGreen mb-3" />
              <h4 className="text-lg font-bold text-tMain mb-2">Cybersecurity</h4>
              <p className="text-xs text-tMuted leading-relaxed">SOC Operations, IAM, Penetration Testing, Cloud Security.</p>
            </div>

            <div className="bento-card-react">
              <CheckCircle2 size={24} className="text-brandGreen mb-3" />
              <h4 className="text-lg font-bold text-tMain mb-2">QA & Automation</h4>
              <p className="text-xs text-tMuted leading-relaxed">Selenium, Cypress, Playwright, API Testing, Performance Testing.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
