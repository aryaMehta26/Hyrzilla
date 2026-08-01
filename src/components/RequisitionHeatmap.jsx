import React, { useState } from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';

export default function RequisitionHeatmap() {
  const [selectedHub, setSelectedHub] = useState('sf');

  const hubs = {
    sf: {
      name: 'SF Bay Area',
      activeReqs: '4,280+',
      avgSalary: '$165K - $245K',
      topStacks: ['AWS & Cloud Architecture', 'PySpark & Data Pipelines', 'Full-Stack React/Node', 'ML & AI Infrastructure'],
      heatLevel: 'High Demand'
    },
    nyc: {
      name: 'New York Metro',
      activeReqs: '3,890+',
      avgSalary: '$155K - $230K',
      topStacks: ['FinTech Distributed Systems', 'DevOps & Kubernetes', 'PostgreSQL & SQL', 'Security & IAM'],
      heatLevel: 'High Demand'
    },
    austin: {
      name: 'Austin / Texas',
      activeReqs: '2,640+',
      avgSalary: '$140K - $210K',
      topStacks: ['Cloud Infrastructure', 'Java & Microservices', 'Snowflake & Analytics', 'Application Security'],
      heatLevel: 'Strong Demand'
    },
    remote: {
      name: 'US Remote',
      activeReqs: '5,120+',
      avgSalary: '$145K - $220K',
      topStacks: ['Full-Stack Node / Python', 'Terraform & DevOps', 'Data Engineering', 'Production AI'],
      heatLevel: 'Peak Demand'
    }
  };

  const current = hubs[selectedHub];

  return (
    <div className="glass-card my-8 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-accent-cyan" />
          <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan font-mono">
            Tech Hiring & Salary Trends
          </span>
        </div>
        <span className="text-xs text-text-tertiary font-mono">Market Data</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(hubs).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedHub(key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedHub === key
                ? 'bg-gradient-to-r from-accent-violet to-accent-cyan text-white shadow-lg shadow-accent-violet/20'
                : 'bg-white/[0.03] border border-white/[0.06] text-text-tertiary hover:text-text-secondary'
            }`}
          >
            {hubs[key].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-surface border border-white/[0.04]">
          <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1 font-mono">Open Roles:</span>
          <div className="text-lg font-extrabold text-text-primary font-mono">{current.activeReqs}</div>
        </div>
        <div className="p-4 rounded-xl bg-accent-violet/[0.04] border border-accent-violet/10">
          <span className="text-xs font-semibold text-accent-violet uppercase tracking-wider block mb-1 font-mono">Base Salary Range:</span>
          <div className="text-lg font-extrabold text-aurora font-mono">{current.avgSalary}</div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-white/[0.04]">
          <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1 font-mono">Market Activity:</span>
          <div className="text-sm font-bold text-accent-cyan font-mono mt-1">{current.heatLevel}</div>
        </div>
      </div>

      <div>
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2 font-mono">High-Demand Skillsets in {current.name}:</span>
        <div className="flex flex-wrap gap-2">
          {current.topStacks.map((st, i) => (
            <span key={i} className="keyword-tag">
              <CheckCircle2 size={11} /> {st}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
