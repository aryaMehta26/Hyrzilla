import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function WhyUs() {
  const chartRolesRef = useRef(null);
  const chartPlansRef = useRef(null);

  useEffect(() => {
    let rolesChart, plansChart;

    Chart.defaults.color = '#A1B5A8';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    if (chartRolesRef.current) {
      const ctx = chartRolesRef.current.getContext('2d');
      rolesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Cloud Infra', 'Data Eng', 'AI / ML', 'Full-Stack', 'Cybersecurity'],
          datasets: [{
            label: 'Placements',
            data: [142, 118, 85, 210, 64],
            backgroundColor: 'rgba(37, 232, 122, 0.85)',
            borderColor: '#25E87A',
            borderWidth: 1,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(37,232,122,0.06)' }, beginAtZero: true },
            x: { grid: { display: false } }
          }
        }
      });
    }

    if (chartPlansRef.current) {
      const ctx = chartPlansRef.current.getContext('2d');
      plansChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Market Readiness ($499)', 'Strategic Acceleration ($1499)', 'Executive Partnership ($2499)'],
          datasets: [{
            data: [25, 55, 20],
            backgroundColor: [
              'rgba(255, 255, 255, 0.8)',
              'rgba(37, 232, 122, 0.9)',
              'rgba(37, 232, 122, 0.5)'
            ],
            borderColor: '#040906',
            borderWidth: 4,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true, pointStyle: 'circle' } }
          },
          cutout: '75%'
        }
      });
    }

    return () => {
      if (rolesChart) rolesChart.destroy();
      if (plansChart) plansChart.destroy();
    };
  }, []);

  return (
    <div className="relative z-10 pt-32">
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-block px-5 py-2 rounded-full border border-[rgba(37,232,122,0.2)] bg-cardBg backdrop-blur-md mb-6">
            <span className="text-xs font-semibold text-brandGreen tracking-wider uppercase">
              Proven Placement Results
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Driven by <span className="h-green-gradient italic">results.</span>
          </h1>
          <p className="text-lg text-tMuted max-w-2xl mx-auto">
            We measure our success through the tech careers we accelerate and the engineering placements we help secure.
          </p>
        </div>
      </section>

      {/* Data Visualization */}
      <section className="py-24 bg-accentBg border-y border-[rgba(37,232,122,0.14)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bento-card-react mb-8">
            <h3 className="text-2xl font-bold text-tMain mb-2">Technical Placement Distribution</h3>
            <p className="text-tMuted text-sm mb-8">Overview of technical roles placed across core engineering domains.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-bgDark/85 border border-[rgba(37,232,122,0.14)]">
                <h4 className="text-sm font-semibold text-tMuted text-center mb-6">Placements by Domain (Trailing 12 Months)</h4>
                <div className="relative h-72"><canvas ref={chartRolesRef}></canvas></div>
              </div>
              <div className="p-6 rounded-2xl bg-bgDark/85 border border-[rgba(37,232,122,0.14)]">
                <h4 className="text-sm font-semibold text-tMuted text-center mb-6">Advisory Plan Selection Breakdown</h4>
                <div className="relative h-72"><canvas ref={chartPlansRef}></canvas></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              What Our <span className="h-green-gradient italic">Clients Say</span>
            </h2>
            <p className="text-tMuted text-base md:text-lg max-w-xl mx-auto">
              Feedback from software engineers and tech leads who work with Hyrzilla.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bento-card-react flex flex-col justify-between">
              <p className="text-tMuted text-sm leading-relaxed mb-6">
                "Hyrzilla helped restructure my resume and LinkedIn profile. The interview coaching gave me the exact push I needed to land my senior cloud role."
              </p>
              <div>
                <h4 className="font-bold text-tMain">Sarah L.</h4>
                <p className="text-xs text-tSub">Cloud Engineer</p>
              </div>
            </div>

            <div className="bento-card-react flex flex-col justify-between">
              <p className="text-tMuted text-sm leading-relaxed mb-6">
                "Clear communication from day one. Their mock interview feedback was realistic and directly prepared me for my technical screening calls."
              </p>
              <div>
                <h4 className="font-bold text-tMain">Michael R.</h4>
                <p className="text-xs text-tSub">Full-Stack Developer</p>
              </div>
            </div>

            <div className="bento-card-react flex flex-col justify-between">
              <p className="text-tMuted text-sm leading-relaxed mb-6">
                "Saves so much time on job applications. Their team kept me updated on callbacks and helped negotiate my final compensation package."
              </p>
              <div>
                <h4 className="font-bold text-tMain">Priya K.</h4>
                <p className="text-xs text-tSub">Data Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
