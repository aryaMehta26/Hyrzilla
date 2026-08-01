import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import { TrendingUp, ShieldCheck, Zap, Award, Target, ArrowRight, PieChart, BarChart2 } from 'lucide-react';

import TextReveal from '../components/TextReveal';
import ScrollReveal from '../components/ScrollReveal';
import MagneticButton from '../components/MagneticButton';

Chart.register(...registerables);

export default function WhyUs() {
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const pieInst = useRef(null);
  const barInst = useRef(null);

  useEffect(() => {
    const chartDefaults = () => {
      Chart.defaults.color = '#4C1D95';
      Chart.defaults.font.family = "'Inter', sans-serif";
    };
    chartDefaults();

    if (pieRef.current) {
      if (pieInst.current) pieInst.current.destroy();
      pieInst.current = new Chart(pieRef.current.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Full-Stack / Backend', 'Cloud / DevOps', 'Data Engineering', 'AI & Security'],
          datasets: [{
            data: [38, 28, 20, 14],
            backgroundColor: ['#7C3AED', '#4F46E5', '#059669', '#A78BFA'],
            borderColor: '#FFFFFF',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#4C1D95', font: { size: 11 }, padding: 16 }
            }
          }
        }
      });
    }

    if (barRef.current) {
      if (barInst.current) barInst.current.destroy();
      barInst.current = new Chart(barRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4+'],
          datasets: [{
            label: 'Callback Rate (%)',
            data: [12, 44, 78, 92],
            backgroundColor: 'rgba(124, 58, 237, 0.75)',
            borderColor: '#7C3AED',
            borderWidth: 1,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: 'rgba(167, 139, 250, 0.12)' }, beginAtZero: true, ticks: { callback: v => `${v}%` } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    return () => {
      if (pieInst.current) pieInst.current.destroy();
      if (barInst.current) barInst.current.destroy();
    };
  }, []);

  return (
    <div className="relative z-10 pt-28">
      {/* Hero */}
      <section className="py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="aurora-badge mb-6 mx-auto w-fit">
            Why Work With Us
          </div>
          <TextReveal className="text-4xl md:text-6xl font-extrabold tracking-tight text-indigo-950 font-display mb-6" delay={0.2}>
            Built by engineers who understand hiring.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-purple-900/80 max-w-2xl mx-auto leading-relaxed">
              We know what it's like to apply for dozens of jobs and get zero responses. We built Hyrzilla to give candidates a real edge in today's market.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Charts */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="aurora-badge mb-4 mx-auto w-fit font-mono">Our Results</div>
              <h2 className="text-3xl md:text-5xl font-bold text-indigo-950 font-display tracking-tight">
                Where candidates land & <span className="text-aurora">how fast</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="glass-card text-left">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-indigo-950 font-display">Placements by Domain</h3>
                  <PieChart size={20} className="text-violet-600" />
                </div>
                <div className="relative h-72"><canvas ref={pieRef}></canvas></div>
              </div>
              <div className="glass-card text-left">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-indigo-950 font-display">Interview Callback Timeline</h3>
                  <BarChart2 size={20} className="text-indigo-600" />
                </div>
                <div className="relative h-72"><canvas ref={barRef}></canvas></div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Differentiation */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="glass-card">
                <div className="w-10 h-10 rounded-xl bg-violet-100/80 border border-violet-200 flex items-center justify-center text-violet-700 mb-4 shadow-sm">
                  <Zap size={20} />
                </div>
                <h3 className="text-xl font-bold text-indigo-950 mb-3 font-display">No Copy-Paste Resumes</h3>
                <p className="text-purple-900/70 text-sm leading-relaxed">
                  We write every resume from scratch based on your actual achievements, infrastructure scale, and project impact.
                </p>
              </div>
              <div className="glass-card-accent">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-violet-500/20">
                  <Target size={20} />
                </div>
                <h3 className="text-xl font-bold text-indigo-950 mb-3 font-display">Realistic Interview Prep</h3>
                <p className="text-purple-900/80 text-sm leading-relaxed">
                  Practice system design and whiteboarding with experienced engineers who give you honest, actionable feedback.
                </p>
              </div>
              <div className="glass-card">
                <div className="w-10 h-10 rounded-xl bg-violet-100/80 border border-violet-200 flex items-center justify-center text-violet-700 mb-4 shadow-sm">
                  <Award size={20} />
                </div>
                <h3 className="text-xl font-bold text-indigo-950 mb-3 font-display">Aligned Incentives</h3>
                <p className="text-purple-900/70 text-sm leading-relaxed">
                  We only make money when you get hired. That keeps us focused on getting you real results, not just selling services.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <ScrollReveal>
          <div className="gradient-divider mb-12 max-w-sm mx-auto" />
          <ShieldCheck size={36} className="text-violet-600 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold text-indigo-950 mb-4 font-display">Ready to land your next role?</h3>
          <p className="text-purple-900/80 max-w-lg mx-auto mb-8">Take a look at our plans or get in touch with our team.</p>
          <MagneticButton>
            <Link to="/pricing" className="btn-aurora flex items-center gap-2 mx-auto w-fit">See Plans <ArrowRight size={16} /></Link>
          </MagneticButton>
        </ScrollReveal>
      </section>
    </div>
  );
}
