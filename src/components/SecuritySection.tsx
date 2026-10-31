import React from 'react';
import { Shield, Lock, UserCheck, CheckSquare, History } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      title: 'Organization-Level Data Isolation',
      icon: Shield,
      description:
        'Your brokerage data, client contact records, off-market listings, and financial terms are strictly compartmentalized in isolated tenant boundaries. Your data is never shared across client organizations.',
    },
    {
      title: 'Granular Role-Based Access (RBAC)',
      icon: UserCheck,
      description:
        'Define explicit permissions for listing agents, buyer representatives, transaction coordinators, managing brokers, and executive partners. Team members only see what they are authorized to see.',
    },
    {
      title: 'Permission-Aware AI Actions',
      icon: Lock,
      description:
        'AI agents strictly inherit the access boundaries of the active user. An agent assigned to an associate will never expose private brokerage financials or off-market listings restricted to partners.',
    },
    {
      title: 'Human Approval for Sensitive Operations',
      icon: CheckSquare,
      description:
        'Autonomous capabilities handle drafting and sorting, but critical real estate actions—such as dispatching counter-offers, binding contracts, or modifying price records—require explicit broker approval.',
    },
    {
      title: 'Comprehensive Activity & Audit History',
      icon: History,
      description:
        'Every suggestion, automated message, configuration modification, and client interaction creates a permanent, inspectable activity log with timestamps and user accountability.',
    },
  ];

  return (
    <section id="security" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Enterprise Architecture & Governance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 text-balance">
            Intelligence with Control.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 text-balance leading-relaxed">
            AI should amplify your team’s expertise without introducing security risks or operational ambiguity.
            EstatePilot AI is built on principles of verifiable human authority and rigorous data segregation.
          </p>
        </div>

        {/* Security Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`bg-slate-50/70 rounded-2xl border border-slate-200/90 p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow ${
                  idx === 0 ? 'lg:col-span-2 bg-gradient-to-br from-slate-50 to-indigo-50/30' : ''
                }`}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-700 shadow-xs mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">{pillar.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Verified Operational Protocol</span>
                </div>
              </div>
            );
          })}

          {/* Governance Commitment Summary Box */}
          <div className="bg-slate-950 text-white rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
                Our Architectural Guarantee
              </div>
              <h3 className="text-xl font-bold text-white mb-2">You Own Your Data. Period.</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Your listings, buyer databases, and proprietary deal histories are never used to train public models or
                accessible by competing brokerage firms.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full cryptographic data ownership</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
