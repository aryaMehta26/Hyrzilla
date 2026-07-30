import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';

export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'talent',
    domain: '',
    experience: '3-5',
    linkedin: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'talent',
      domain: '',
      experience: '3-5',
      linkedin: '',
      message: ''
    });
  };

  return (
    <div className="relative z-10 pt-28">
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-5 py-2 rounded-full border border-[rgba(37,232,122,0.2)] bg-cardBg backdrop-blur-md mb-6">
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Let's start the <span className="h-green-gradient italic">conversation.</span>
          </h1>
          <p className="text-lg text-tMuted max-w-2xl mx-auto">
            Fill out the form below to reach out to our team. Have questions about candidate plans, resume architecture, or placement support? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-24 bg-accentBg border-y border-[rgba(37,232,122,0.16)] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bento-card-react">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-tMuted mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bgDark/90 border border-[rgba(37,232,122,0.14)] text-tMain placeholder-tSub focus:border-brandGreen focus:outline-none focus:ring-2 focus:ring-brandGlow transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-tMuted mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bgDark/90 border border-[rgba(37,232,122,0.14)] text-tMain placeholder-tSub focus:border-brandGreen focus:outline-none focus:ring-2 focus:ring-brandGlow transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-tMuted mb-2">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210 / +1..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bgDark/90 border border-[rgba(37,232,122,0.14)] text-tMain placeholder-tSub focus:border-brandGreen focus:outline-none focus:ring-2 focus:ring-brandGlow transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-tMuted mb-2">Selected Enrollment Plan</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bgDark/90 border border-[rgba(37,232,122,0.14)] text-tMain focus:border-brandGreen focus:outline-none focus:ring-2 focus:ring-brandGlow transition-all text-sm"
                  >
                    <option value="readiness">Market Readiness ($499 + 15%)</option>
                    <option value="acceleration">Strategic Acceleration ($1,499 + 12%)</option>
                    <option value="executive">Executive Partnership ($2,499 + 10%)</option>
                    <option value="general">General Question / Career Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-tMuted mb-2">Primary Tech Domain</label>
                  <select
                    required
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bgDark/90 border border-[rgba(37,232,122,0.14)] text-tMain focus:border-brandGreen focus:outline-none focus:ring-2 focus:ring-brandGlow transition-all text-sm"
                  >
                    <option value="" disabled>Select your core stack...</option>
                    <option value="cloud">Cloud / DevOps (AWS, Azure, K8s)</option>
                    <option value="data">Data Engineering / Science (PySpark, SQL)</option>
                    <option value="software">Full-Stack / Backend Engineering</option>
                    <option value="cyber">Cybersecurity</option>
                    <option value="other">Other Tech Stack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-tMuted mb-2">Years of Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bgDark/90 border border-[rgba(37,232,122,0.14)] text-tMain focus:border-brandGreen focus:outline-none focus:ring-2 focus:ring-brandGlow transition-all text-sm"
                  >
                    <option value="0-2">0 - 2 Years</option>
                    <option value="3-5">3 - 5 Years</option>
                    <option value="6-9">6 - 9 Years</option>
                    <option value="10+">10+ Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-tMuted mb-2">LinkedIn / Portfolio URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-bgDark/90 border border-[rgba(37,232,122,0.14)] text-tMain placeholder-tSub focus:border-brandGreen focus:outline-none focus:ring-2 focus:ring-brandGlow transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-tMuted mb-2">Message / Details</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your background, Target roles, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-bgDark/90 border border-[rgba(37,232,122,0.14)] text-tMain placeholder-tSub focus:border-brandGreen focus:outline-none focus:ring-2 focus:ring-brandGlow transition-all text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-brandGreen text-black font-semibold text-sm shadow-emeraldGlow hover:shadow-emeraldGlowLg transition-all flex items-center justify-center gap-2"
              >
                Submit Inquiry <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-bgDark/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[rgba(9,20,14,0.95)] border border-[rgba(37,232,122,0.3)] rounded-3xl p-8 max-w-md w-full text-center shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(37,232,122,0.16)]">
            <div className="w-16 h-16 rounded-full bg-[rgba(37,232,122,0.15)] border border-brandGreen text-brandGreen flex items-center justify-center text-2xl mx-auto mb-5 shadow-emeraldGlow">
              <Check size={28} />
            </div>
            <h3 className="text-2xl font-bold text-tMain mb-3">Inquiry Submitted!</h3>
            <p className="text-tMuted text-sm leading-relaxed mb-6">
              Thank you for reaching out. Our advisory team has received your submission and will get in touch with you via <strong className="text-brandGreen">WhatsApp / Email</strong> within 24 hours.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl bg-brandGreen text-black font-semibold text-sm shadow-emeraldGlow"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
