import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, Info } from 'lucide-react';
import { PRICING_TIERS } from '../data/mockData';

interface PricingPreviewProps {
  onOpenEarlyAccess: () => void;
}

export const PricingPreview: React.FC<PricingPreviewProps> = ({ onOpenEarlyAccess }) => {
  const [annualBilling, setAnnualBilling] = useState(true);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Early Access Membership & Editions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 text-balance">
            Transparent Editions. Guaranteed Founding Terms.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 text-balance leading-relaxed">
            Choose the operational tier built for your team. All pilot partners lock in lifetime preferential rates and
            concierge migration support.
          </p>

          {/* Illustrative Notice Banner */}
          <div className="inline-flex items-center gap-2 text-xs text-indigo-900 bg-indigo-50/80 border border-indigo-200/80 px-4 py-2 rounded-xl mt-2 text-left">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>Illustrative Pricing Notice:</strong> All fees below are illustrative estimates for planning
              purposes and will be finalized upon agreement during the Early Access onboarding process.
            </span>
          </div>

          {/* Billing Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${!annualBilling ? 'text-slate-950' : 'text-slate-500'}`}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-900 transition-colors duration-200 ease-in-out focus:outline-hidden"
              role="switch"
              aria-checked={annualBilling}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  annualBilling ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold ${annualBilling ? 'text-slate-950' : 'text-slate-500'} flex items-center gap-1.5`}>
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 4 Pricing Cards Grid: Starter, Professional, Agency, Enterprise */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const displayPrice =
              tier.id === 'enterprise'
                ? 'Custom'
                : annualBilling
                ? tier.illustrativeAnnualPrice
                : tier.illustrativeMonthlyPrice;

            return (
              <div
                key={tier.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  tier.highlighted
                    ? 'bg-slate-950 text-white shadow-xl ring-2 ring-indigo-600 lg:-translate-y-2'
                    : 'bg-white text-slate-900 border border-slate-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    {tier.tierBadge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold ${tier.highlighted ? 'text-white' : 'text-slate-950'}`}>
                      {tier.name}
                    </h3>
                    {!tier.highlighted && (
                      <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {tier.tierBadge}
                      </span>
                    )}
                  </div>

                  <p className={`text-xs ${tier.highlighted ? 'text-slate-400' : 'text-slate-500'} mb-4 min-h-[36px]`}>
                    {tier.headline}
                  </p>

                  <div className="mb-5 pb-5 border-b border-slate-200/40">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-extrabold font-mono tracking-tight ${tier.highlighted ? 'text-white' : 'text-slate-950'}`}>
                        {displayPrice}
                      </span>
                      {tier.id !== 'enterprise' && (
                        <span className={`text-xs ${tier.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                          / mo (illustrative)
                        </span>
                      )}
                    </div>
                    <div className={`text-[11px] mt-1 ${tier.highlighted ? 'text-indigo-300' : 'text-indigo-700'}`}>
                      {tier.targetAudience}
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-8">
                    <div className={`text-[11px] font-semibold uppercase tracking-wider ${tier.highlighted ? 'text-slate-400' : 'text-slate-600'}`}>
                      Core Capabilities:
                    </div>
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.highlighted ? 'text-indigo-400' : 'text-emerald-600'}`} />
                        <span className={tier.highlighted ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={onOpenEarlyAccess}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      tier.highlighted
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                        : 'bg-slate-950 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Request {tier.name} Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          All editions include isolated database tenancy, human-in-the-loop review safeguards, and SSL encryption.
        </div>
      </div>
    </section>
  );
};
