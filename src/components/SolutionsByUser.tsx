import React, { useState } from 'react';
import { User, Building, Landmark, Network, CheckCircle2, ArrowRight } from 'lucide-react';
import { USER_SOLUTIONS } from '../data/mockData';

interface SolutionsByUserProps {
  onOpenEarlyAccess: () => void;
}

export const SolutionsByUser: React.FC<SolutionsByUserProps> = ({ onOpenEarlyAccess }) => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(USER_SOLUTIONS[0].id);

  const selected = USER_SOLUTIONS.find((s) => s.id === selectedSolutionId) || USER_SOLUTIONS[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'individual-agents':
        return User;
      case 'agencies':
        return Building;
      case 'brokerages':
        return Landmark;
      case 'enterprise':
        return Network;
      default:
        return Building;
    }
  };

  return (
    <section id="solutions" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Tailored Architectural Fits
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 text-balance">
            Engineered for Every Scale of Real Estate.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 text-balance leading-relaxed">
            Whether you are an individual top-producing agent, a high-velocity agency, an established brokerage, or a
            multi-national enterprise team, EstatePilot AI is architected for your operational workflow.
          </p>
        </div>

        {/* Clean Segmented Tab Navigation: Individual Agents, Agencies, Brokerages, Enterprise Teams */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-xl max-w-full overflow-x-auto scrollbar-none">
            {USER_SOLUTIONS.map((item) => {
              const Icon = getIcon(item.id);
              const isActive = selectedSolutionId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSolutionId(item.id)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-xs ring-1 ring-slate-900/5'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Solution Showcase Card */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Solution Detail & Benefits */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
                  {selected.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mt-1">
                  {selected.title}
                </h3>
                <p className="text-sm sm:text-base font-medium text-slate-700 mt-1">
                  {selected.subtitle}
                </p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {selected.description}
                </p>
                {selected.bestFor && (
                  <p className="text-xs text-indigo-700 bg-indigo-50/70 border border-indigo-100 p-2.5 rounded-lg mt-3">
                    <strong>Recommended Scope: </strong> {selected.bestFor}
                  </p>
                )}
              </div>

              {/* Key Benefits */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Core Operational Advantages:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selected.keyBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={onOpenEarlyAccess}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Request Solution Brief for {selected.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Pre-Configured Workflows Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 border border-slate-800 space-y-4">
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                Recommended AI Configuration
              </div>
              <h4 className="text-base font-bold text-white">Pre-Loaded Workflows for {selected.title}</h4>

              <div className="space-y-3">
                {selected.recommendedWorkflows.map((workflow, i) => (
                  <div
                    key={workflow}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-200 font-medium">
                      0{i + 1}. {workflow}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900">
                      Standard
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-lg text-xs text-indigo-200">
                Includes full onboarding concierge, historical data migration, and team orientation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
