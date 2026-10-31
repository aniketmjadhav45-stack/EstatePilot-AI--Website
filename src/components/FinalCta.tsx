import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onOpenEarlyAccess: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenEarlyAccess }) => {
  return (
    <section className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Limited Early Access Cohort</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-tight">
          Build Your Real Estate Business on Intelligence.
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto text-balance leading-relaxed">
          Be among the first to experience a smarter way to manage real estate.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenEarlyAccess}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Get Early Access</span>
            <ArrowRight className="w-4 h-4 text-indigo-600 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="pt-6 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-3">
          <span>Priority white-glove onboarding</span>
          <span className="text-slate-600">·</span>
          <span>Zero migration fees from legacy CRMs</span>
          <span className="text-slate-600">·</span>
          <span>Human-in-the-loop safety guaranteed</span>
        </div>
      </div>
    </section>
  );
};
