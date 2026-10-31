import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingPreviewProps {
  onOpenEarlyAccess: () => void;
}

export const PricingPreview: React.FC<PricingPreviewProps> = ({ onOpenEarlyAccess }) => {
  const tiers = [
    {
      name: 'Solo Specialist',
      tierBadge: 'Top Producer',
      headline: 'For high-volume independent agents',
      priceNotice: 'Early Access Founding Rate',
      features: [
        'Full AI CRM with behavioral lead scoring',
        '24/7 Inbound Customer Conversation Agent',
        'Showing logistics & automated follow-ups',
        'MLS feed integration & property catalog',
        'Standard email & WhatsApp routing',
      ],
      popular: false,
    },
    {
      name: 'Brokerage & Agency',
      tierBadge: 'Most Selected',
      headline: 'For growing teams and boutique firms',
      priceNotice: 'Early Access Founding Rate',
      features: [
        'Everything in Solo Specialist',
        'Up to 25 licensed agents included',
        'Off-market internal pocket matching engine',
        'Role-based permissions & commission tracking',
        'Multi-channel inbound lead round-robin',
        'Priority agent fleet execution queue',
      ],
      popular: true,
    },
    {
      name: 'Enterprise Network',
      tierBadge: 'Multi-Branch & Global',
      headline: 'For multi-office firms and regional brands',
      priceNotice: 'Custom Pilot Terms',
      features: [
        'Unlimited offices, agents, and listings',
        'Dedicated isolated database tenancy',
        'Custom ERP & legacy back-office integration',
        'Dedicated client success architect',
        'Custom workflow design & SLA guarantees',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Founding Member Enrollment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 text-balance">
            Transparent Editions. Guaranteed Founding Terms.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 text-balance leading-relaxed">
            Early Access partners lock in lifetime preferential rates, dedicated white-glove onboarding, and direct input
            into our product roadmap.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                tier.popular
                  ? 'bg-slate-950 text-white shadow-xl ring-2 ring-indigo-600 lg:-translate-y-2'
                  : 'bg-white text-slate-900 border border-slate-200/90 shadow-xs hover:shadow-md'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {tier.tierBadge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-xl font-bold ${tier.popular ? 'text-white' : 'text-slate-950'}`}>
                    {tier.name}
                  </h3>
                  {!tier.popular && (
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {tier.tierBadge}
                    </span>
                  )}
                </div>

                <p className={`text-xs ${tier.popular ? 'text-slate-400' : 'text-slate-500'} mb-6`}>
                  {tier.headline}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-200/40">
                  <div className={`text-2xl font-extrabold font-mono ${tier.popular ? 'text-white' : 'text-slate-950'}`}>
                    {tier.priceNotice}
                  </div>
                  <div className={`text-xs mt-1 ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    Reserved for Q4 pilot onboarding cohort
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className={`text-xs font-semibold uppercase tracking-wider ${tier.popular ? 'text-slate-400' : 'text-slate-600'}`}>
                    Included Capabilities:
                  </div>
                  {tier.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.popular ? 'text-indigo-400' : 'text-emerald-600'}`} />
                      <span className={tier.popular ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={onOpenEarlyAccess}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Request Early Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
