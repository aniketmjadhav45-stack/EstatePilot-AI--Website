import React, { useState } from 'react';
import {
  Users,
  Building,
  Calendar,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Clock,
  Send,
  Search,
  Check,
  Building2,
  PieChart,
  Bot,
  ShieldCheck,
  ChevronRight,
  Filter,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Car
} from 'lucide-react';
import {
  SAMPLE_LEADS,
  SAMPLE_PROPERTIES,
  PROPERTY_MATCHES,
  UPCOMING_VISITS,
  PIPELINE_STAGES,
  REVENUE_METRICS,
  AI_AGENTS,
} from '../data/mockData';
import { PropertyVisual } from './ArchitecturalVisuals';

type DashboardTab =
  | 'overview'
  | 'crm'
  | 'properties'
  | 'matching'
  | 'agents'
  | 'pipeline'
  | 'visits'
  | 'analytics';

export const InteractiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [approvedActionId, setApprovedActionId] = useState<string | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string>(SAMPLE_LEADS[0].id);
  const [leadFilter, setLeadFilter] = useState<'all' | 'Hot' | 'Warm'>('all');

  const selectedLead = SAMPLE_LEADS.find((l) => l.id === selectedLeadId) || SAMPLE_LEADS[0];

  const handleApproveAction = (actionId: string) => {
    setApprovedActionId(actionId);
  };

  const navTabs: { id: DashboardTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Executive Overview', icon: Sparkles },
    { id: 'crm', label: 'CRM & Lead Intel', icon: Users, badge: '5 Active' },
    { id: 'properties', label: 'Property Portfolio', icon: Building2 },
    { id: 'matching', label: 'AI Property Matching', icon: Sparkles, badge: '98% Top' },
    { id: 'agents', label: 'AI Agent Center', icon: Bot, badge: '8 Fleet' },
    { id: 'pipeline', label: 'Sales Pipeline', icon: TrendingUp },
    { id: 'visits', label: 'Appointments & Visits', icon: Calendar },
    { id: 'analytics', label: 'Revenue Analytics', icon: PieChart },
  ];

  return (
    <div className="w-full bg-slate-900/95 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Application Bar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Window controls & Workspace label */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="text-white font-semibold">Belgrave & Co. International</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">EstatePilot Operational Workspace</span>
          </div>
        </div>

        {/* Right: Search & System indicator */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-400">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-400 text-xs">Search 1,420 listings & contacts...</span>
            <kbd className="text-[10px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-mono">⌘K</kbd>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px] tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>AI AGENTS SYNCED</span>
          </div>
        </div>
      </div>

      {/* Internal Navigation & View Tabs */}
      <div className="bg-slate-900/90 px-3 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-indigo-950/80 text-indigo-200' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Dynamic View Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* MODULE 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Operational Metrics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div className="text-xs text-slate-400">Total Pipeline Value</div>
                <div className="text-xl font-bold font-mono tabular-nums text-white mt-1">$113,200,000</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                  <span>+18.4% vs last quarter</span>
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div className="text-xs text-slate-400">Pre-Qualified Buyers</div>
                <div className="text-xl font-bold font-mono tabular-nums text-white mt-1">142 In System</div>
                <div className="text-[11px] text-indigo-400 flex items-center gap-1 mt-1">
                  <span>94% match confidence</span>
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div className="text-xs text-slate-400">Avg Inbound Response</div>
                <div className="text-xl font-bold font-mono tabular-nums text-white mt-1">42 Seconds</div>
                <div className="text-[11px] text-slate-400 mt-1">Autonomous 24/7 routing</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div className="text-xs text-slate-400">Confirmed Showings</div>
                <div className="text-xl font-bold font-mono tabular-nums text-white mt-1">26 This Week</div>
                <div className="text-[11px] text-emerald-400 mt-1">Zero calendar conflicts</div>
              </div>
            </div>

            {/* Split Grid: Left = Lead Intelligence & Action / Right = Showings & Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column (7 cols): AI Copilot Action & Priority Inbound */}
              <div className="lg:col-span-7 space-y-4">
                {/* AI Assistant Action Highlight Card */}
                <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-xl p-4.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-indigo-200">AI Lead Action Recommendation</div>
                        <div className="text-[11px] text-slate-400">Requires Broker Approval Before Dispatch</div>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-indigo-300 bg-indigo-950/80 border border-indigo-800 px-2 py-0.5 rounded">
                      98% Intent Confidence
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 mt-3 leading-relaxed">
                    <strong className="text-white">Elena Rostova</strong> just re-inspected floor plans and HOA covenants for{' '}
                    <span className="text-indigo-300">The Solstice Penthouse 42B</span> for the 4th time today. Proof-of-funds verified at $4.5M.
                  </p>

                  <div className="mt-3 p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg text-xs text-slate-300 space-y-1 font-sans">
                    <div className="text-slate-400 text-[11px]">Suggested VIP Tour Invitation Draft:</div>
                    <p className="italic text-slate-300">
                      “Elena, I noticed your interest in the unobstructed bay view from Penthouse 42B. Would you prefer a private twilight walk-through this Thursday at 5:30 PM with champagne on the terrace?”
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Human Approval Gate Active</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {approvedActionId === 'elena-action' ? (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
                          <Check className="w-3.5 h-3.5" />
                          <span>Approved & Sent via WhatsApp</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApproveAction('elena-action')}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Approve & Send Draft</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Priority Leads Table View */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Live Inbound & Intent Scoring</h4>
                      <p className="text-xs text-slate-400">Automatic intent extraction across all discovery portals</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('crm')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Explore CRM</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800/60 mt-2">
                    {SAMPLE_LEADS.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLeadId(lead.id);
                          setActiveTab('crm');
                        }}
                        className="py-3 flex items-center justify-between gap-3 hover:bg-slate-900/50 px-2 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white truncate">{lead.name}</span>
                            <span className="text-xs font-mono tabular-nums text-indigo-400 font-semibold">
                              {lead.matchScore}% Match
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 truncate">
                            <span className="font-mono text-slate-300">{lead.budget}</span>
                            <span className="text-slate-600">·</span>
                            <span className="truncate">{lead.intent}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                              lead.status === 'Hot'
                                ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                                : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                            }`}
                          >
                            {lead.status}
                          </span>
                          <div className="text-[10px] text-slate-500 mt-1 font-mono">{lead.lastActivity.split('·')[0]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Today's Showings & Deal Progression */}
              <div className="lg:col-span-5 space-y-4">
                {/* Upcoming Showings & Visits */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <h4 className="text-sm font-semibold text-white">Upcoming Property Visits</h4>
                    </div>
                    <button
                      onClick={() => setActiveTab('visits')}
                      className="text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      View Calendar
                    </button>
                  </div>

                  <div className="space-y-3 mt-3">
                    {UPCOMING_VISITS.slice(0, 3).map((visit) => (
                      <div key={visit.id} className="p-3 bg-slate-900/60 border border-slate-800/70 rounded-lg text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-indigo-400 font-semibold">{visit.time}</span>
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {visit.status}
                          </span>
                        </div>
                        <div className="font-medium text-white truncate">{visit.propertyTitle}</div>
                        <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                          <span>Client: {visit.clientName}</span>
                          <span className="text-slate-600">·</span>
                          <span className="truncate">{visit.type}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 bg-slate-950/60 p-1.5 rounded border border-slate-800/40">
                          {visit.accessNotes}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pipeline Summary */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <h4 className="text-sm font-semibold text-white">Pipeline Velocity</h4>
                    <span className="text-xs font-mono text-emerald-400 font-medium">$113.2M Active</span>
                  </div>
                  <div className="space-y-2.5 mt-3">
                    {PIPELINE_STAGES.map((stage) => (
                      <div key={stage.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300">{stage.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 font-mono text-[11px]">{stage.count} deals</span>
                            <span className="text-white font-mono font-semibold text-xs tabular-nums">{stage.totalValue}</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-800/70 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${stage.color} rounded-full`}
                            style={{
                              width:
                                stage.id === 'p1' ? '85%' : stage.id === 'p2' ? '60%' : stage.id === 'p3' ? '40%' : '28%',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: CRM & LEAD INTELLIGENCE */}
        {activeTab === 'crm' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-white">CRM & Lead Intelligence Module</h3>
                <p className="text-xs text-slate-400">
                  Real-time intent extraction, budget verification, and behavioral timeline tracking
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                <button
                  onClick={() => setLeadFilter('all')}
                  className={`px-2.5 py-1 text-xs rounded-md ${
                    leadFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All (5)
                </button>
                <button
                  onClick={() => setLeadFilter('Hot')}
                  className={`px-2.5 py-1 text-xs rounded-md ${
                    leadFilter === 'Hot' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hot Deals (2)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left: Lead Directory */}
              <div className="lg:col-span-5 space-y-2">
                {SAMPLE_LEADS.filter((l) => (leadFilter === 'all' ? true : l.status === leadFilter)).map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedLeadId === lead.id
                        ? 'bg-slate-800/90 border-indigo-500 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white">{lead.name}</div>
                      <span className="text-xs font-mono font-bold text-indigo-400">{lead.matchScore}% Match</span>
                    </div>
                    <div className="text-xs font-mono text-slate-300 mt-0.5">{lead.budget}</div>
                    <div className="text-xs text-slate-400 mt-1 truncate">{lead.intent}</div>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="text-slate-400 truncate max-w-[180px]">{lead.source}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          lead.status === 'Hot' ? 'bg-rose-950/70 text-rose-300' : 'bg-amber-950/70 text-amber-300'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Selected Lead Detailed Dossier & Copilot Action */}
              <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-white">{selectedLead.name}</h4>
                      <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full font-mono">
                        {selectedLead.matchScore}% Confidence
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      <span>{selectedLead.email}</span>
                      <span>·</span>
                      <span>{selectedLead.phone}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Target Budget</div>
                    <div className="text-sm font-mono font-semibold text-white">{selectedLead.budget}</div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900/80 border border-indigo-500/20 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Lead Intelligence Summary</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{selectedLead.aiInsight}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg">
                    <div className="text-slate-400">Preferred Architecture</div>
                    <div className="text-white font-medium mt-1">{selectedLead.preferredType}</div>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg">
                    <div className="text-slate-400">Inbound Acquisition Channel</div>
                    <div className="text-emerald-400 font-medium mt-1">{selectedLead.source}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="text-xs font-medium text-slate-300 mb-2">Automated Action Quick-Trigger</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApproveAction(`crm-action-${selectedLead.id}`)}
                      className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>
                        {approvedActionId === `crm-action-${selectedLead.id}`
                          ? 'Dossier Dispatched ✓'
                          : 'Send Curated Off-Market Dossier'}
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab('visits')}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Schedule Showing Visit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 3: PROPERTY PORTFOLIO (WITH HIGH-END ARCHITECTURAL RENDERS) */}
        {activeTab === 'properties' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Property Portfolio & Inventory Hub</h3>
                <p className="text-xs text-slate-400">Direct MLS sync + off-market private broker inventory with architectural floorplans</p>
              </div>
              <div className="text-xs text-slate-400 font-mono">4 Featured Residences Active</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all group"
                >
                  <div className="h-44 w-full relative overflow-hidden">
                    <PropertyVisual
                      type={
                        prop.id === 'prop-1'
                          ? 'villa'
                          : prop.id === 'prop-2'
                          ? 'penthouse'
                          : prop.id === 'prop-3'
                          ? 'alpine'
                          : 'coastal'
                      }
                      showBadge={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[11px] font-mono text-indigo-200 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-indigo-900/60 shadow-xs">
                        {prop.status}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-xs font-mono font-bold text-white bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded shadow-xs">
                        {prop.price}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 z-10 right-3">
                      <div className="text-[10px] text-slate-300 font-mono">{prop.city}</div>
                      <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                        {prop.title}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-800/80 pb-2.5">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Bed className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{prop.specs.beds} Beds</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Bath className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{prop.specs.baths} Baths</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium font-mono tabular-nums">
                        <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{prop.specs.sqft.toLocaleString()} Sq Ft</span>
                      </span>
                      <span className="font-mono text-slate-400 text-[11px]">{prop.daysOnMarket}d on Market</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
                        <Users className="w-3.5 h-3.5" />
                        <span className="font-mono">{prop.matchedBuyersCount} Active Buyers Matched</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{prop.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 4: AI PROPERTY MATCHING */}
        {activeTab === 'matching' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">AI Property Matching Engine</h3>
                <p className="text-xs text-slate-400">
                  Bi-directional buyer-inventory alignment analyzing 28 multi-dimensional parameters
                </p>
              </div>
              <div className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-800">
                Live Alignment Algorithm
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROPERTY_MATCHES.map((match) => (
                <div key={match.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4.5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-white">{match.propertyTitle}</div>
                      <div className="text-xs text-indigo-300 font-medium mt-0.5">Matched Buyer: {match.buyerName}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                      {match.matchPercentage}% Alignment
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Criteria Match Points:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {match.matchCriteria.map((c) => (
                        <span key={c} className="text-[11px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <span className="text-slate-400 font-medium">Suggested Action: </span>
                    {match.suggestedAction}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">Status: {match.status}</span>
                    <button
                      onClick={() => handleApproveAction(`match-${match.id}`)}
                      className="px-3 py-1 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <span>{approvedActionId === `match-${match.id}` ? 'Pitch Sent ✓' : 'Dispatch Match Brief'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 5: AI AGENT CENTER */}
        {activeTab === 'agents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">AI Agent Center (Fleet Operations)</h3>
                <p className="text-xs text-slate-400">8 dedicated specialists running autonomous real estate operations under human oversight</p>
              </div>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                All 8 Agents Healthy & Active
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {AI_AGENTS.map((agent) => (
                <div key={agent.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{agent.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  </div>
                  <div className="text-[11px] text-indigo-300 font-mono truncate">{agent.shortRole}</div>
                  <p className="text-xs text-slate-400 leading-snug line-clamp-3">{agent.description}</p>
                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                    Guardrail: {agent.safetyCheck.slice(0, 50)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 6: SALES PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Sales Pipeline & Escrow Milestones</h3>
                <p className="text-xs text-slate-400">Real-time contingency tracking, transaction coordination, and closing radar</p>
              </div>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                $113.2M Total Active Value
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {PIPELINE_STAGES.map((stage) => (
                <div key={stage.id} className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{stage.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                      {stage.count} deals
                    </span>
                  </div>
                  <div className="text-lg font-bold font-mono text-indigo-300 tabular-nums">{stage.totalValue}</div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${stage.color} rounded-full w-full`} />
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-lg text-xs space-y-1">
                    <div className="font-medium text-slate-200">
                      {stage.id === 'p1'
                        ? 'Skyline Villa Inquiry'
                        : stage.id === 'p2'
                        ? 'Solstice Penthouse 42B'
                        : stage.id === 'p3'
                        ? 'Glass Pavilion LOI'
                        : 'Marina Haven Escrow'}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {stage.id === 'p1'
                        ? '$8.45M · E. Rostova'
                        : stage.id === 'p2'
                        ? '$4.25M · M. Vance'
                        : stage.id === 'p3'
                        ? '$11.9M · K. Takahashi'
                        : '$3.60M · Dr. Thorne'}
                    </div>
                    <div className="text-[10px] text-indigo-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{stage.id === 'p4' ? 'Closing in 6 days' : 'Contingencies clear'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 7: APPOINTMENTS AND SITE VISITS */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Appointments & Site Visits Module</h3>
                <p className="text-xs text-slate-400">Automated lockbox code issuance, showing route coordination, and client debriefs</p>
              </div>
              <div className="text-xs font-mono text-indigo-400 bg-indigo-950 px-2.5 py-1 rounded border border-indigo-800">
                4 Active Tour Schedules
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UPCOMING_VISITS.map((visit) => (
                <div key={visit.id} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400">{visit.time}</span>
                      <span className="text-xs text-slate-400">({visit.date})</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {visit.status}
                    </span>
                  </div>

                  <div className="font-bold text-white text-sm">{visit.propertyTitle}</div>
                  <div className="text-xs text-slate-300">
                    Client: <strong className="text-white">{visit.clientName}</strong> · Host: {visit.agentName}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">Format: {visit.type}</div>

                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Access & Gate Protocol:</div>
                    <p className="mt-0.5 text-slate-300">{visit.accessNotes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 8: REVENUE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Revenue Analytics & Brokerage Intelligence</h3>
                <p className="text-xs text-slate-400">Closed transaction volume, gross commissions, and quarterly pacing forecasts</p>
              </div>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
                YTD Volume: $184.9M
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              {REVENUE_METRICS.map((item) => (
                <div key={item.month} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-2">
                  <div className="text-xs font-bold text-white">{item.month}</div>
                  <div className="text-sm font-mono font-bold text-indigo-300 tabular-nums">${item.closedVolume}M</div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${(item.closedVolume / 50) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Comm: {item.commissionGross}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <div className="text-slate-400">Showing-to-Offer Conversion</div>
                <div className="text-lg font-bold font-mono text-white">31.4%</div>
                <div className="text-[11px] text-emerald-400">+6.2% on AI-matched properties</div>
              </div>
              <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <div className="text-slate-400">Average Days on Market</div>
                <div className="text-lg font-bold font-mono text-white">18.2 Days</div>
                <div className="text-[11px] text-indigo-400">42% faster than regional MLS average</div>
              </div>
              <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                <div className="text-slate-400">Inbound Channel ROI</div>
                <div className="text-lg font-bold font-mono text-white">8.4x Yield</div>
                <div className="text-[11px] text-slate-400">Direct portal attribution tracking</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Bottom System Status Bar */}
      <div className="bg-slate-950/90 px-4 py-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-3">
          <span>WORKSPACE: BELGRAVE-US-WEST</span>
          <span>·</span>
          <span>INTELLIGENCE CORE: ESTATE-OS-V2</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Interactive Preview · All 7 Core Modules Active</span>
        </div>
      </div>
    </div>
  );
};
