import React from 'react';
import { Layers, Zap, LineChart, Building } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const values = [
    {
      title: 'One Intelligent Platform',
      description: 'Unified CRM, inventory, conversations, and deal tracking in one workspace.',
      icon: Layers,
    },
    {
      title: 'AI-Powered Workflows',
      description: 'Autonomous lead qualification, dynamic matching, and showing management.',
      icon: Zap,
    },
    {
      title: 'Real-Time Business Insights',
      description: 'Continuous visibility into conversion velocity, pipelines, and revenue.',
      icon: LineChart,
    },
    {
      title: 'Built for Growing Teams',
      description: 'Scales from ambitious solo top-producers to multi-branch enterprises.',
      icon: Building,
    },
  ];

  return (
    <section className="py-12 border-y border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-indigo-600 shrink-0 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">{v.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{v.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
