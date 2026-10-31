import React from 'react';
import {
  Share2,
  Clock,
  Database,
  CalendarX2,
  BarChart2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface ProblemSectionProps {
  onOpenEarlyAccess: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenEarlyAccess }) => {
  const problems = [
    {
      title: 'Leads Scattered Across Channels',
      icon: Share2,
      impact: 'Up to 34% of high-intent inquiries are delayed or lost',
      description:
        'Buyer leads pour in from property portals, WhatsApp, direct email, phone calls, social DMs, and open-house sign-in sheets. Without unified routing, agents juggle multiple inboxes while high-value buyers wait.',
    },
    {
      title: 'Manual, Repetitive Follow-Ups',
      icon: Clock,
      impact: '15+ hours lost weekly per agent on repetitive typing',
      description:
        'Agents spend their most valuable selling hours re-typing generic follow-up emails, copying property details into messages, and manually chasing past clients instead of conducting private showings.',
    },
    {
      title: 'Disconnected Property & Customer Data',
      icon: Database,
      impact: 'Buyers receive mismatched listings and stale inventory',
      description:
        'Listing inventory lives in one spreadsheet, buyer preferences in another, and conversation history inside individual agent phones. When a new property drops, finding the right buyer takes days instead of seconds.',
    },
    {
      title: 'Missed Appointments & Lost Opportunities',
      icon: CalendarX2,
      impact: 'Costly showing delays and unconfirmed client tours',
      description:
        'Coordinating calendars between listing agents, buyer representatives, sellers, and building concierges is fraught with friction. Unverified gate codes and miscommunicated schedules kill momentum.',
    },
    {
      title: 'Limited Visibility into Sales Performance',
      icon: BarChart2,
      impact: 'Brokerage leaders operate on lagging indicators and guesswork',
      description:
        'Managing brokers lack real-time transparency into pipeline velocity, pending contingencies, and lead attribution. You cannot fix pipeline bottlenecks you cannot see.',
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-28 bg-slate-100/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-700 flex items-center gap-2 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>The Cost of Tool Fragmentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 text-balance leading-tight">
            Real Estate Operations Shouldn’t Be Fragmented.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Real estate professionals lose deals not from a lack of client demand, but from operational chaos:
            disconnected systems, missed messages, and hundreds of hours wasted on administrative friction.
          </p>
        </div>

        {/* 5 Problem Cards in Asymmetric Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-2 bg-gradient-to-br from-white to-slate-50/50' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-rose-700 bg-rose-50/80 px-2 py-0.5 rounded">
                      Operational Bottleneck 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{p.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Business Impact:</span>
                  <span className="text-rose-700 font-semibold text-right">{p.impact}</span>
                </div>
              </div>
            );
          })}

          {/* Solution Invitation Card */}
          <div className="bg-slate-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
                Unified Architecture
              </div>
              <h3 className="text-xl font-bold text-white mb-2">One System to Replace the Patchwork</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                EstatePilot AI brings leads, inventory, communications, and deal management into a single, cohesive
                operational core.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={onOpenEarlyAccess}
                className="w-full py-2.5 px-4 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Early Platform Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
