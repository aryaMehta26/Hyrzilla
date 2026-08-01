import React from 'react';

const keywords = [
  'Terraform IaC', 'Kubernetes Helm', 'AWS EKS/ECS', 'PySpark ETL',
  'React / Next.js', 'Docker Microservices', 'CI/CD Pipelines', 'PostgreSQL',
  'Snowflake Warehouse', 'Redis Caching', 'GraphQL API', 'System Design',
  'LLM Fine-Tuning', 'MLflow', 'Zero Trust', 'STAR Framework',
  'Distributed Systems', 'Apache Airflow', 'Delta Lake', 'RAG Architecture',
  'Vector DB', 'PyTorch', 'Prometheus', 'Grafana', 'OAuth2 / OIDC',
];

export default function MarqueeStrip() {
  const doubledKeywords = [...keywords, ...keywords];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-white/[0.04]">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#050816] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#050816] to-transparent pointer-events-none" />

      <div className="marquee-track">
        {doubledKeywords.map((kw, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-2 mx-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs font-medium text-text-secondary whitespace-nowrap font-mono"
          >
            <span className="w-1 h-1 rounded-full bg-accent-violet opacity-60" />
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}
