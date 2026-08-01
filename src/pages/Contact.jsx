import React, { useState } from 'react';
import { Check, Send, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
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
    { label: 'Full Name', type: 'text', key: 'name', placeholder: 'e.g. Rahul Sharma', required: true, half: true },
    { label: 'Email Address', type: 'email', key: 'email', placeholder: 'rahul@example.com', required: true, half: true },
    { label: 'Phone / WhatsApp', type: 'tel', key: 'phone', placeholder: '+91 98765 43210', required: true, half: true },
    { label: 'Plan You Are Considering', type: 'select', key: 'inquiryType', half: true, options: [
      { value: 'readiness', label: 'Market Readiness ($499 + 15%)' },
      { value: 'acceleration', label: 'Strategic Acceleration ($1,499 + 12%)' },
      { value: 'executive', label: 'Executive Partnership ($2,499 + 10%)' },
      { value: 'general', label: 'Just Have Questions' }
    ]},
    { label: 'Primary Field', type: 'select', key: 'domain', required: true, half: true, options: [
      { value: 'software', label: 'Full-Stack / Backend Engineering' },
      { value: 'cloud', label: 'Cloud / DevOps' },
      { value: 'data', label: 'Data Engineering' },
      { value: 'cyber', label: 'Cybersecurity' },
      { value: 'other', label: 'Other Field' }
    ]},
    { label: 'Years of Experience', type: 'select', key: 'experience', half: true, options: [
      { value: '0-2', label: '0 - 2 Years' },
      { value: '3-5', label: '3 - 5 Years' },
      { value: '6-9', label: '6 - 9 Years' },
      { value: '10+', label: '10+ Years' }
    ]},
  ];

  return (
    <div className="relative z-10 pt-28">
      <section className="py-20 text-center px-6">
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

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="glass-card p-8 text-left">
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs flex items-center gap-2 font-mono">
                  <AlertCircle size={16} className="shrink-0" /> <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fields.map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 font-mono">{f.label}</label>
                      {f.type === 'select' ? (
                        <select
                          value={formData[f.key]}
                          onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                          className="glass-input"
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
                          className="glass-input"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 font-mono">LinkedIn Profile URL (Optional)</label>
                  <input
                    type="url" placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="glass-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 font-mono">Anything specific you'd like us to know?</label>
                  <textarea
                    rows={4} placeholder="Tell us a bit about your current situation, target roles, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="glass-input"
                  />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="btn-aurora w-full py-4 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (<>Submitting <Loader2 size={16} className="animate-spin" /></>) : (<>Send Message <Send size={16} /></>)}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-indigo-950/40 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="glass-card max-w-md w-full text-center p-8 bg-white/95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center text-2xl mx-auto mb-5 shadow-sm">
              <Check size={28} />
            </div>
            <h3 className="text-2xl font-bold text-indigo-950 mb-3 font-display">Message Sent!</h3>
            <p className="text-purple-900/80 text-sm leading-relaxed mb-6">
              Thanks for reaching out. We'll get back to you via <span className="text-violet-700 font-semibold">WhatsApp or Email</span> within 24 hours.
            </p>
            <button onClick={handleModalClose} className="btn-aurora w-full py-3">Got It</button>
          </div>
        </div>
      )}
    </div>
  );
}
