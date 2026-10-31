import React, { useState } from 'react';
import {
  Users,
  Building2,
  Sparkles,
  Bot,
  Inbox,
  CalendarCheck,
  Coins,
  Workflow,
  Target,
  PieChart,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { SOLUTION_FEATURES } from '../data/mockData';

interface SolutionSectionProps {
  onOpenEarlyAccess: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenEarlyAccess }) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    Users,
    Building2,
    Sparkles,
    Bot,
    Inbox,
    CalendarCheck,
    Coins,
    Workflow,
    Target,
    PieChart,
  };

  const selectedFeature = SOLUTION_FEATURES.find((f) => f.id === selectedFeatureId);

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Unified Operational Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 text-balance">
            Everything Your Real Estate Business Needs. <br className="hidden sm:inline" />
            One Intelligent Workspace.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 text-balance max-w-2xl mx-auto">
            A comprehensive operating system engineered from the ground up for agents, brokers, and multi-office
            brokerages.
          </p>
        </div>

        {/* 10 Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTION_FEATURES.map((feat, idx) => {
            const Icon = iconMap[feat.iconName] || Sparkles;
            const isMarquee = idx === 0 || idx === 3; // Prominent cards in Bento layout

            return (
              <div
                key={feat.id}
                onClick={() => setSelectedFeatureId(feat.id)}
                className={`group relative bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isMarquee ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-slate-50 via-white to-indigo-50/20' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {feat.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="line-clamp-1">{feat.benefit}</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Deep Dive Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-7 relative space-y-4">
            <button
              onClick={() => setSelectedFeatureId(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                {React.createElement(iconMap[selectedFeature.iconName] || Sparkles, { className: 'w-5 h-5' })}
              </div>
              <div>
                <span className="text-xs font-mono text-indigo-600">{selectedFeature.category}</span>
                <h4 className="text-xl font-bold text-slate-950">{selectedFeature.title}</h4>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              {selectedFeature.description}
            </p>

            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div className="text-xs font-semibold text-slate-900">Key Operational Benefit:</div>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedFeature.benefit}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">Included in all Early Access editions</span>
              <button
                onClick={() => {
                  setSelectedFeatureId(null);
                  onOpenEarlyAccess();
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request Early Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
