import React from 'react';

export default function Terms() {
  return (
    <div className="relative z-10 pt-32 pb-24">
      <section className="py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-5 py-2 rounded-full border border-[rgba(37,232,122,0.2)] bg-cardBg backdrop-blur-md mb-6">
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              Legal Information
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Terms & <span className="h-green-gradient italic">Conditions</span>
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="bento-card-react space-y-6 text-tMuted text-sm leading-relaxed">
          <p className="text-xs text-tSub border-b border-[rgba(37,232,122,0.14)] pb-4">
            Effective Date: January 1, 2026 · Last Updated: November 2026
          </p>

          <p>These Terms and Conditions ("Terms") govern your use of Hyrzilla LLC's advisory and staffing services. By engaging with Hyrzilla, you agree to be bound by these Terms.</p>

          <h2 className="text-lg font-bold text-tMain pt-4">1. Scope of Services</h2>
          <p>Hyrzilla LLC operates as an IT talent advisory and enterprise staffing firm, providing two primary service categories:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Talent Solutions:</strong> Technical profile architecture, resume optimization, interview strategy, application support, and placement assistance for engineering professionals.</li>
            <li><strong>Corporate Solutions:</strong> Sourcing, vetting, and contingency placement of technical talent for hiring employers.</li>
          </ul>

          <div className="p-4 rounded-xl bg-[rgba(37,232,122,0.06)] border border-[rgba(37,232,122,0.2)] text-brandGreen">
            💡 <strong>Consultative Delivery:</strong> Hyrzilla provides strategic advisory services designed to maximize market placement. Hiring and compensation decisions reside with the employer.
          </div>

          <h2 className="text-lg font-bold text-tMain pt-4">2. Candidate Advisory Agreements</h2>
          <h3 className="font-semibold text-tMain">2.1 Enrollment Fees</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Market Readiness Plan:</strong> $499 upfront</li>
            <li><strong>Strategic Acceleration Plan:</strong> $1,499 upfront</li>
            <li><strong>Executive Partnership Plan:</strong> $2,499 upfront</li>
          </ul>

          <h3 className="font-semibold text-tMain pt-2">2.2 Success Fee Structure</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Market Readiness Plan:</strong> 15% of annual salary</li>
            <li><strong>Strategic Acceleration Plan:</strong> 12% of annual salary</li>
            <li><strong>Executive Partnership Plan:</strong> 10% of annual salary</li>
          </ul>

          <h2 className="text-lg font-bold text-tMain pt-4">3. Corporate Staffing Terms</h2>
          <p>Corporate clients operate on a strict 100% contingency basis with zero upfront fees. Placement fees are realized exclusively upon the successful start date of a candidate hired through Hyrzilla.</p>

          <h2 className="text-lg font-bold text-tMain pt-4">4. Contact Inquiries</h2>
          <p>For questions regarding these Terms or formal service agreements, please contact legal@hyrzilla.com.</p>
        </div>
      </div>
    </div>
  );
}
