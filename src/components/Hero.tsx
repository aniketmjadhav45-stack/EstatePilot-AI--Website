import React from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import { InteractiveDashboard } from './InteractiveDashboard';

interface HeroProps {
  onOpenEarlyAccess: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEarlyAccess }) => {
  const handleScrollToProduct = () => {
    const el = document.getElementById('product-overview') || document.getElementById('problem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="product" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle ambient gradient mesh in the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40 blur-3xl -z-10">
        <div className="w-[600px] h-[350px] bg-indigo-300/40 rounded-full mx-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Copy Container */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Refined unboxed kicker / pre-headline */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>The Global Real Estate Operating System</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 text-balance leading-[1.12]">
            Your Real Estate, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700">
              Powered by Intelligence.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed text-balance max-w-2xl mx-auto">
            Manage leads, properties, customer conversations, and deals with one intelligent platform built for the future of real estate.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenEarlyAccess}
              className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer group"
            >
              <span>Get Early Access</span>
              <ArrowRight className="w-4 h-4 text-indigo-300 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('spatial-studio');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-5 py-3.5 text-base font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/90 border border-indigo-200 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Interactive 3D Twin</span>
            </button>
            <button
              onClick={handleScrollToProduct}
              className="w-full sm:w-auto px-5 py-3.5 text-base font-medium text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Explore Platform</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Unboxed Trust Kicker */}
          <div className="pt-2 text-xs text-slate-600 flex items-center justify-center gap-2">
            <span>Built for Top Producers</span>
            <span aria-hidden="true">·</span>
            <span>Independent Brokerages</span>
            <span aria-hidden="true">·</span>
            <span>Global Agencies</span>
          </div>
        </div>

        {/* Dashboard Mockup Display */}
        <div id="product-overview" className="mt-12 sm:mt-16 relative">
          <div className="relative mx-auto max-w-6xl">
            <InteractiveDashboard />
          </div>
        </div>
      </div>
    </section>
  );
};
