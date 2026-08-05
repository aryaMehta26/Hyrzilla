import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, CheckCircle2, ShieldCheck, ArrowRight, Send, Loader2, Check, Users, Briefcase, FileCheck, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';

export default function ForCompanies() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    companyName: '', contactName: '', email: '', phone: '',
    rolesNeeded: '', teamSize: '10-50', message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const payload = {
      full_name: `${formData.contactName} (${formData.companyName})`,
      email: formData.email,
      phone: formData.phone,
      selected_plan: 'company_recruitment',
      tech_domain: formData.rolesNeeded,
      experience_years: formData.teamSize,
      message: `Company: ${formData.companyName} | Roles: ${formData.rolesNeeded} | Team: ${formData.teamSize} | Message: ${formData.message}`,
      status: 'Company Lead'
    };

    try {
      const url = 'https://llbgtukjwtpaqgrulpdh.supabase.co';
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYmd0dWtqd3RwYXFncnVscGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MTY2MTksImV4cCI6MjA2Njk5MjYxOX0';

      const resTest = await supabase.from('candidates_test').insert([payload]);
      if (resTest.error) console.warn('candidates_test:', resTest.error.message);

      const resProd = await supabase.from('candidates_prod').insert([payload]);
      if (resProd.error) console.warn('candidates_prod:', resProd.error.message);

      if (resTest.error || resProd.error) {
        for (const table of ['candidates_test', 'candidates_prod']) {
          await fetch(`${url}/rest/v1/${table}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': anonKey, 'Authorization': `Bearer ${anonKey}`, 'Prefer': 'return=minimal' },
            body: JSON.stringify(payload)
          }).catch(err => console.error(`REST ${table}:`, err));
        }
      }

      setLoading(false);
      setShowModal(true);
    } catch (err) {
      console.error('Submission error:', err);
      setLoading(false);
      setShowModal(true);
    }
  };

  const companySteps = [
    {
      icon: <FileCheck size={22} />,
      label: 'Step 01',
      title: 'Share Requirements & Sign Agreement',
      desc: 'Tell us the technical roles, stack, and seniority you need. Review and sign our talent partnership agreement.',
      color: '#7C3AED'
    },
    {
      icon: <Users size={22} />,
      label: 'Step 02',
      title: 'Receive Pre-Vetted Candidates',
      desc: 'We match candidates whose technical experience, system design skills, and availability fit your exact requirements.',
      color: '#4F46E5'
    },
    {
      icon: <Briefcase size={22} />,
      label: 'Step 03',
      title: 'Interview & Select',
      desc: 'Run your interview loops. We coordinate scheduling and ensure candidate alignment throughout the hiring process.',
      color: '#059669'
    },
    {
      icon: <DollarSign size={22} />,
      label: 'Step 04',
      title: 'Placement Fee on Candidate\'s 1st Day',
      desc: 'We generate an invoice for 10%–15% of the candidate\'s annual package, payable on the candidate\'s official start date.',
      color: '#7C3AED'
    }
  ];

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-16 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">
            <Building2 size={14} className="inline mr-1" /> Employer & Corporate Hiring
          </div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 dark:text-purple-100 font-display mb-6" delay={0.2}>
            Pre-vetted tech talent for your engineering teams.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 dark:text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
              Skip hundreds of irrelevant resumes. Hyrzilla connects hiring companies with thoroughly vetted candidates who match your exact stack and scale needs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works for Companies */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit">Corporate Recruitment Process</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 dark:text-purple-100 font-display tracking-tight">
                How we partner with <span className="text-aurora">hiring firms</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
              {companySteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="glass-card relative overflow-hidden"
                  whileHover={{ y: -6, boxShadow: '0 20px 45px -10px rgba(124,58,237,0.15)' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                    style={{ background: step.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  />
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white mb-4 shadow-md" style={{ background: step.color }}>
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest font-mono block mb-1" style={{ color: step.color }}>{step.label}</span>
                  <h3 className="text-lg font-bold text-indigo-950 dark:text-purple-100 mb-2 font-display">{step.title}</h3>
                  <p className="text-purple-900/70 dark:text-purple-200/70 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Key Partnership Rules */}
          <ScrollReveal>
            <div className="glass-card-accent p-8 text-left mb-16">
              <h3 className="text-xl font-bold text-indigo-950 dark:text-purple-100 mb-4 font-display flex items-center gap-2">
                <ShieldCheck className="text-violet-600" size={24} /> Key Talent Partnership Terms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-purple-900/80 dark:text-purple-200/80">
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-purple-200/40">
                  <span className="font-bold text-indigo-950 dark:text-purple-100 block mb-1">10% - 15% Placement Fee</span>
                  <p className="text-xs">Success fee calculated as 10%-15% of the candidate's first-year annual base salary.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-purple-200/40">
                  <span className="font-bold text-indigo-950 dark:text-purple-100 block mb-1">Payable on Start Date</span>
                  <p className="text-xs">Invoice generated upon agreement signing; payment due exclusively on the candidate's first working day.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-purple-200/40">
                  <span className="font-bold text-indigo-950 dark:text-purple-100 block mb-1">Direct Contact Policy</span>
                  <p className="text-xs">All candidate evaluations and scheduling proceed through Hyrzilla until formal interview rounds are scheduled.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Company Contact Form */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="glass-card p-8 text-left">
              <div className="text-center mb-8">
                <div className="aurora-badge mb-3 mx-auto w-fit">Hiring Inquiry</div>
                <h3 className="text-2xl md:text-3xl font-bold text-indigo-950 dark:text-purple-100 font-display">Partner with Hyrzilla</h3>
                <p className="text-xs text-purple-900/70 dark:text-purple-200/70 mt-1">Fill out your hiring needs below and our corporate talent team will reach out within 24 hours.</p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-indigo-950 dark:text-purple-100 uppercase tracking-wider mb-2 font-mono">Company Name</label>
                    <input
                      type="text" required placeholder="e.g. Acme Cloud Inc."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigo-950 dark:text-purple-100 uppercase tracking-wider mb-2 font-mono">Contact Person</label>
                    <input
                      type="text" required placeholder="e.g. Sarah Jenkins (Head of Talent)"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="glass-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-indigo-950 dark:text-purple-100 uppercase tracking-wider mb-2 font-mono">Work Email</label>
                    <input
                      type="email" required placeholder="sarah@acmecloud.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigo-950 dark:text-purple-100 uppercase tracking-wider mb-2 font-mono">Phone / WhatsApp</label>
                    <input
                      type="tel" required placeholder="+1 (555) 987-6543"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="glass-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-indigo-950 dark:text-purple-100 uppercase tracking-wider mb-2 font-mono">Roles You Are Hiring For</label>
                    <input
                      type="text" required placeholder="e.g. Senior DevOps, Full-Stack Lead"
                      value={formData.rolesNeeded}
                      onChange={(e) => setFormData({ ...formData, rolesNeeded: e.target.value })}
                      className="glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-indigo-950 dark:text-purple-100 uppercase tracking-wider mb-2 font-mono">Company Size</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="glass-input"
                    >
                      <option value="1-10">1 - 10 employees</option>
                      <option value="10-50">10 - 50 employees</option>
                      <option value="50-200">50 - 200 employees</option>
                      <option value="200+">200+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-950 dark:text-purple-100 uppercase tracking-wider mb-2 font-mono">Hiring Timeline & Details</label>
                  <textarea
                    rows={3} placeholder="Tell us about your technical stack, hiring timeline, or specific candidate criteria..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="glass-input"
                  />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="btn-aurora w-full py-4 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (<>Submitting <Loader2 size={16} className="animate-spin" /></>) : (<>Submit Corporate Hiring Inquiry <Send size={16} /></>)}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-indigo-950/40 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-md w-full text-center p-8 bg-white/95 dark:bg-slate-900/95"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center text-2xl mx-auto mb-5 shadow-sm">
                <Check size={28} />
              </div>
              <h3 className="text-2xl font-bold text-indigo-950 dark:text-purple-100 mb-3 font-display">Inquiry Received!</h3>
              <p className="text-purple-900/80 dark:text-purple-200/80 text-sm leading-relaxed mb-6">
                Thank you for your interest in Hyrzilla corporate recruitment. Our talent advisor will contact you within 24 hours to present candidate profiles.
              </p>
              <button onClick={() => setShowModal(false)} className="btn-aurora w-full py-3">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
