import React from 'react';
import { Cable, Cpu, LineChart, Check } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Connect',
      subtitle: 'Bring your leads, properties, and business tools together.',
      icon: Cable,
      description:
        'Seamlessly ingest property portal feeds (Zillow, Realtor, Rightmove, JamesEdition), sync your MLS/off-market portfolio, and link communication channels like WhatsApp, Gmail, and calendar schedules into one secure hub.',
      bullets: [
        'Automated real-time lead ingestion from all portals',
        'Direct MLS and off-market inventory sync',
        'Multi-calendar and inbox integration in minutes',
      ],
    },
    {
      step: '02',
      title: 'Automate',
      subtitle: 'Let AI assist with qualification, matching, follow-ups, and workflows.',
      icon: Cpu,
      description:
        'Specialist AI agents evaluate incoming leads in real time, extract intent, calculate budget matches against available inventory, and draft personalized communications—always queued for your review.',
      bullets: [
        'Instant multi-parameter buyer qualification',
        'Discreet buyer-to-property inventory matching',
        'Context-aware follow-up scheduling with human approval',
      ],
    },
    {
      step: '03',
      title: 'Grow',
      subtitle: 'Make better decisions with unified data and actionable insights.',
      icon: LineChart,
      description:
        'Eliminate pipeline blind spots. Monitor closing velocity, agent conversion rates, and contingency deadlines in real time to accelerate transaction velocity and grow your brokerage revenue.',
      bullets: [
        'Comprehensive deal pipeline and escrow radar',
        'Lead channel attribution down to closed commission',
        'Executive reporting across individual agents and branches',
      ],
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Streamlined Implementation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 text-balance">
            How EstatePilot AI Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 text-balance leading-relaxed">
            Transitioning your real estate operations to intelligence takes days, not months.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative bg-slate-50/80 rounded-2xl border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-mono text-slate-300">
                      {s.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-950 mb-2">{s.title}</h3>
                  <div className="text-sm font-semibold text-indigo-700 mb-3">{s.subtitle}</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{s.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-200/70 space-y-2">
                  {s.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
