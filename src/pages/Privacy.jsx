import React from 'react';

export default function Privacy() {
  return (
    <div className="relative z-10 pt-32 pb-24">
      <section className="py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-5 py-2 rounded-full border border-[rgba(37,232,122,0.2)] bg-cardBg backdrop-blur-md mb-6">
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              Data Operations
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Privacy <span className="h-green-gradient italic">Policy</span>
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="bento-card-react space-y-6 text-tMuted text-sm leading-relaxed">
          <p className="text-xs text-tSub border-b border-[rgba(37,232,122,0.14)] pb-4">
            Effective Date: January 1, 2026 · Last Updated: November 2026
          </p>

          <p>Hyrzilla LLC ("Hyrzilla," "we," "us," or "our") respects your privacy and is committed to protecting your personal data.</p>

          <h2 className="text-lg font-bold text-tMain pt-4">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Identity Data:</strong> Name, email address, phone/WhatsApp number, and LinkedIn profiles.</li>
            <li><strong>Professional Data:</strong> Resumes, technical portfolios, employment history, and interview screening notes.</li>
          </ul>

          <h2 className="text-lg font-bold text-tMain pt-4">2. Utilization of Data</h2>
          <p>We process your data exclusively to facilitate profile optimization, candidate placement, and corporate recruitment matching.</p>

          <h2 className="text-lg font-bold text-tMain pt-4">3. Data Security</h2>
          <p>We implement robust cryptographic and operational security measures to prevent unauthorized access to your data.</p>
        </div>
      </div>
    </div>
  );
}
