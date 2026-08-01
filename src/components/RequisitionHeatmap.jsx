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
      <div className="flex items-center justify-between border-b border-purple-200/50 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-violet-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-violet-800 font-mono">
            Tech Hiring & Salary Trends
          </span>
        </div>
        <span className="text-xs text-purple-900/60 font-mono">Market Data</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(hubs).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedHub(key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedHub === key
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20'
                : 'bg-white/80 border border-purple-200/60 text-purple-900/70 hover:text-indigo-950'
            }`}
          >
            {hubs[key].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/40">
          <span className="text-xs font-semibold text-purple-900/60 uppercase tracking-wider block mb-1 font-mono">Open Roles:</span>
          <div className="text-lg font-extrabold text-indigo-950 font-mono">{current.activeReqs}</div>
        </div>
        <div className="p-4 rounded-xl bg-purple-100/60 border border-purple-200/80">
          <span className="text-xs font-semibold text-violet-800 uppercase tracking-wider block mb-1 font-mono">Base Salary Range:</span>
          <div className="text-lg font-extrabold text-aurora font-mono">{current.avgSalary}</div>
        </div>
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/40">
          <span className="text-xs font-semibold text-purple-900/60 uppercase tracking-wider block mb-1 font-mono">Market Activity:</span>
          <div className="text-sm font-bold text-violet-700 font-mono mt-1">{current.heatLevel}</div>
        </div>
      </div>

      <div>
        <span className="text-xs font-bold text-purple-900/80 uppercase tracking-wider block mb-2 font-mono">High-Demand Skillsets in {current.name}:</span>
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
