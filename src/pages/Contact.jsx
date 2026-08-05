import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send, AlertCircle, Loader2, User, Mail, Phone, Briefcase, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', inquiryType: 'acceleration',
    domain: 'software', experience: '3-5', linkedin: '', message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const payload = {
      full_name: formData.name, email: formData.email, phone: formData.phone,
      selected_plan: formData.inquiryType, tech_domain: formData.domain,
      experience_years: formData.experience, linkedin_url: formData.linkedin,
      message: formData.message, status: 'New Lead'
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

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', inquiryType: 'acceleration', domain: 'software', experience: '3-5', linkedin: '', message: '' });
  };

  const fields = [
    { label: 'Full Name', type: 'text', key: 'name', placeholder: 'e.g. John Mitchell', required: true, icon: <User size={16} /> },
    { label: 'Email Address', type: 'email', key: 'email', placeholder: 'john@example.com', required: true, icon: <Mail size={16} /> },
    { label: 'Phone / WhatsApp', type: 'tel', key: 'phone', placeholder: '+1 (555) 123-4567', required: true, icon: <Phone size={16} /> },
    { label: 'Plan You Are Considering', type: 'select', key: 'inquiryType', icon: <Briefcase size={16} />, options: [
      { value: 'readiness', label: 'Market Readiness ($499 + 15%)' },
      { value: 'acceleration', label: 'Strategic Acceleration ($1,499 + 12%)' },
      { value: 'executive', label: 'Executive Partnership ($2,499 + 10%)' },
      { value: 'general', label: 'Just Have Questions' }
    ]},
    { label: 'Primary Field', type: 'select', key: 'domain', required: true, icon: <MapPin size={16} />, options: [
      { value: 'software', label: 'Full-Stack / Backend Engineering' },
      { value: 'cloud', label: 'Cloud / DevOps' },
      { value: 'data', label: 'Data Engineering' },
      { value: 'cyber', label: 'Cybersecurity' },
      { value: 'other', label: 'Other Field' }
    ]},
    { label: 'Years of Experience', type: 'select', key: 'experience', icon: <Clock size={16} />, options: [
      { value: '0-2', label: '0 - 2 Years' },
      { value: '3-5', label: '3 - 5 Years' },
      { value: '6-9', label: '6 - 9 Years' },
      { value: '10+', label: '10+ Years' }
    ]},
  ];

  return (
    <div className="relative z-10 pt-28">
      <section className="py-16 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">Get In Touch</div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 font-display mb-6" delay={0.2}>
            Let's talk about your search.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 max-w-2xl mx-auto leading-relaxed">
              Fill out the form below and we'll get back to you within 24 hours to discuss your situation and answer any questions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Info Panel */}
              <div className="lg:col-span-4 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="rounded-3xl p-6 text-white relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #1E1040 0%, #2D1B6B 50%, #1A0B3B 100%)' }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                  <h3 className="text-lg font-bold font-display mb-3">What happens next?</h3>
                  <div className="space-y-4">
                    {[
                      { step: '01', text: 'We review your submission within 24 hours' },
                      { step: '02', text: 'A quick call to understand your goals' },
                      { step: '03', text: 'Personalized plan & resume strategy' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-xs font-bold text-violet-300 font-mono bg-violet-500/20 px-2 py-1 rounded-lg border border-violet-400/30">{item.step}</span>
                        <p className="text-sm text-purple-200/90 leading-relaxed">{item.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="glass-card p-5"
                >
                  <p className="text-sm text-purple-900/80 leading-relaxed">
                    <span className="text-indigo-950 font-semibold">No commitment required.</span> We'll walk you through everything before you decide on a plan.
                  </p>
                </motion.div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-8">
                <div className="glass-card p-6 md:p-8 text-left">
                  {errorMsg && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs flex items-center gap-2 font-mono">
                      <AlertCircle size={16} className="shrink-0" /> <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {fields.map((f) => (
                        <motion.div
                          key={f.key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 font-mono">
                            <span className="text-violet-500">{f.icon}</span> {f.label}
                          </label>
                          {f.type === 'select' ? (
                            <select
                              value={formData[f.key]}
                              onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                              onFocus={() => setFocusedField(f.key)}
                              onBlur={() => setFocusedField(null)}
                              className={`glass-input transition-all duration-300 ${focusedField === f.key ? 'ring-2 ring-violet-400/30 border-violet-400' : ''}`}
                              required={f.required}
                            >
                              {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                          ) : (
                            <input
                              type={f.type}
                              required={f.required}
                              placeholder={f.placeholder}
                              value={formData[f.key]}
                              onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                              onFocus={() => setFocusedField(f.key)}
                              onBlur={() => setFocusedField(null)}
                              className={`glass-input transition-all duration-300 ${focusedField === f.key ? 'ring-2 ring-violet-400/30 border-violet-400' : ''}`}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 font-mono">
                        <span className="text-violet-500"><Briefcase size={16} /></span> LinkedIn Profile URL (Optional)
                      </label>
                      <input
                        type="url" placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        onFocus={() => setFocusedField('linkedin')}
                        onBlur={() => setFocusedField(null)}
                        className={`glass-input transition-all duration-300 ${focusedField === 'linkedin' ? 'ring-2 ring-violet-400/30 border-violet-400' : ''}`}
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 font-mono">
                        <span className="text-violet-500"><Mail size={16} /></span> Anything specific you'd like us to know?
                      </label>
                      <textarea
                        rows={3} placeholder="Tell us about your current situation, target roles, or questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className={`glass-input transition-all duration-300 ${focusedField === 'message' ? 'ring-2 ring-violet-400/30 border-violet-400' : ''}`}
                      />
                    </div>

                    <motion.button
                      type="submit" disabled={loading}
                      className="btn-aurora w-full py-4 disabled:opacity-50 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (<>Submitting <Loader2 size={16} className="animate-spin" /></>) : (<>Send Message <Send size={16} /></>)}
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Confirmation Modal */}
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
              className="glass-card max-w-md w-full text-center p-8 bg-white/95"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center text-2xl mx-auto mb-5 shadow-sm">
                <Check size={28} />
              </div>
              <h3 className="text-2xl font-bold text-indigo-950 mb-3 font-display">Message Sent!</h3>
              <p className="text-purple-900/80 text-sm leading-relaxed mb-6">
                Thanks for reaching out. We'll get back to you via <span className="text-violet-700 font-semibold">WhatsApp or Email</span> within 24 hours.
              </p>
              <button onClick={handleModalClose} className="btn-aurora w-full py-3">Got It</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
