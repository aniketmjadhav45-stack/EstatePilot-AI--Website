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
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Search,
  Check,
  ArrowUpRight,
  MessageSquare,
  FileText
} from 'lucide-react';
import { SAMPLE_LEADS, SAMPLE_PROPERTIES, UPCOMING_VISITS, PIPELINE_STAGES } from '../data/mockData';

export const InteractiveDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'listings' | 'pipeline' | 'copilot'>('overview');
  const [approvedActionId, setApprovedActionId] = useState<string | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string>(SAMPLE_LEADS[0].id);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const selectedLead = SAMPLE_LEADS.find((l) => l.id === selectedLeadId) || SAMPLE_LEADS[0];

  const handleApproveAction = (actionId: string) => {
    setApprovedActionId(actionId);
    setTimeout(() => {
      // Keep feedback visible
    }, 4000);
  };

  return (
    <div className="w-full bg-slate-900/95 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Application Bar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Window controls & Workspace label */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="text-white font-semibold">Belgrave & Co. International</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">Global Luxury Operating System</span>
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
            <span>AI ENGINE LIVE</span>
          </div>
        </div>
      </div>

      {/* Internal Navigation & View Tabs */}
      <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Executive Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Lead Intelligence</span>
            <span className="font-mono text-[10px] bg-indigo-950/80 text-indigo-300 px-1.5 py-0.2 rounded-full">5 Hot</span>
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'listings'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Portfolio Listings</span>
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'pipeline'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Sales Pipeline</span>
            <span className="font-mono text-[10px] text-emerald-400 tabular-nums">$113.2M</span>
          </button>
          <button
            onClick={() => setActiveTab('copilot')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'copilot'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Pilot Copilot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <span>Active Q4 Period</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300 font-mono tabular-nums">48 Closed / 14 Pending</span>
        </div>
      </div>

      {/* Main Dynamic View Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* VIEW 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Operational Metrics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div className="text-xs text-slate-400">Active Deal Volume</div>
                <div className="text-xl font-bold font-mono tabular-nums text-white mt-1">$113,200,000</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                  <span>+18.4% vs last quarter</span>
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div className="text-xs text-slate-400">Pre-Qualified Buyers</div>
                <div className="text-xl font-bold font-mono tabular-nums text-white mt-1">142 Active</div>
                <div className="text-[11px] text-indigo-400 flex items-center gap-1 mt-1">
                  <span>92% match confidence</span>
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div className="text-xs text-slate-400">Avg Inbound Response</div>
                <div className="text-xl font-bold font-mono tabular-nums text-white mt-1">42 Seconds</div>
                <div className="text-[11px] text-slate-400 mt-1">AI Conversation Agent 24/7</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
                <div className="text-xs text-slate-400">Tours This Week</div>
                <div className="text-xl font-bold font-mono tabular-nums text-white mt-1">26 Scheduled</div>
                <div className="text-[11px] text-emerald-400 mt-1">100% Calendar Confirmed</div>
              </div>
            </div>

            {/* Split Grid: Left = Leads & Copilot Action / Right = Today Showings & Pipeline */}
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
                        <div className="text-xs font-semibold text-indigo-200">AI Copilot Recommendation</div>
                        <div className="text-[11px] text-slate-400">Requires Broker Approval Before Dispatch</div>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-indigo-300 bg-indigo-950/80 border border-indigo-800 px-2 py-0.5 rounded">
                      High Confidence 98%
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 mt-3 leading-relaxed">
                    <strong className="text-white">Elena Rostova</strong> just re-inspected the floorplan and HOA covenants for{' '}
                    <span className="text-indigo-300">The Solstice Penthouse 42B</span> for the 4th time today. Proof-of-funds verified at $4.5M.
                  </p>

                  <div className="mt-3 p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg text-xs text-slate-300 space-y-1.5 font-sans">
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
                      <h4 className="text-sm font-semibold text-white">Live Inbound & Lead Scoring</h4>
                      <p className="text-xs text-slate-400">Real-time intent extraction across all discovery portals</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>View all 142</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800/60 mt-2">
                    {SAMPLE_LEADS.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLeadId(lead.id);
                          setActiveTab('leads');
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
                      <h4 className="text-sm font-semibold text-white">Today's Showing Schedule</h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400">3 Verified Today</span>
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
                          <span className="truncate">{visit.agentName}</span>
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

        {/* VIEW 2: LEADS & INBOUND */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-white">Lead Intelligence & Behavioral Scoring</h3>
                <p className="text-xs text-slate-400">
                  AI continuously monitors buyer readiness, proof-of-funds, and property match vectors
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-2.5 py-1 text-xs rounded-md ${
                    filterStatus === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All (5)
                </button>
                <button
                  onClick={() => setFilterStatus('Hot')}
                  className={`px-2.5 py-1 text-xs rounded-md ${
                    filterStatus === 'Hot' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hot Only (2)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left: Lead Directory */}
              <div className="lg:col-span-5 space-y-2">
                {SAMPLE_LEADS.filter((l) => (filterStatus === 'all' ? true : l.status === filterStatus)).map((lead) => (
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
                      <span className="text-slate-400">{lead.lastActivity}</span>
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
                    <div className="text-slate-400">Current Lead Status</div>
                    <div className="text-emerald-400 font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{selectedLead.status} · Pre-Qualified</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="text-xs font-medium text-slate-300 mb-2">Automated Action Quick-Trigger</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApproveAction(`action-${selectedLead.id}`)}
                      className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>
                        {approvedActionId === `action-${selectedLead.id}`
                          ? 'Dossier Dispatched ✓'
                          : 'Send Curated Off-Market Dossier'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleApproveAction(`schedule-${selectedLead.id}`)}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Book Private Showing</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: LISTINGS & INVENTORY */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Curated Luxury Portfolio</h3>
                <p className="text-xs text-slate-400">Direct MLS sync + off-market private broker inventory</p>
              </div>
              <div className="text-xs text-slate-400 font-mono">4 Featured Residences</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_PROPERTIES.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all group"
                >
                  {/* Visual Architectural Simulation Header */}
                  <div className={`h-36 bg-gradient-to-br ${prop.gradientBg} p-4 flex flex-col justify-between relative`}>
                    <div className="flex items-center justify-between z-10">
                      <span className="text-xs font-mono text-indigo-300 bg-slate-950/70 px-2 py-0.5 rounded border border-indigo-900/60">
                        {prop.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-white bg-slate-950/70 px-2.5 py-0.5 rounded">
                        {prop.price}
                      </span>
                    </div>

                    {/* Architectural Wireframe Accent Lines */}
                    <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                      <svg viewBox="0 0 400 200" className="w-full h-full text-indigo-400 stroke-current" fill="none">
                        <line x1="20" y1="180" x2="380" y2="180" strokeWidth="1" />
                        <line x1="80" y1="180" x2="80" y2="40" strokeWidth="1" />
                        <line x1="80" y1="40" x2="260" y2="40" strokeWidth="1" />
                        <line x1="260" y1="40" x2="260" y2="180" strokeWidth="1" />
                        <line x1="120" y1="180" x2="120" y2="80" strokeWidth="1" />
                        <line x1="120" y1="80" x2="220" y2="80" strokeWidth="1" />
                        <line x1="220" y1="80" x2="220" y2="180" strokeWidth="1" />
                      </svg>
                    </div>

                    <div className="z-10">
                      <div className="text-[11px] text-slate-300 font-mono">{prop.city}</div>
                      <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {prop.title}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
                      <span>{prop.specs.beds} Beds</span>
                      <span>·</span>
                      <span>{prop.specs.baths} Baths</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{prop.specs.sqft.toLocaleString()} Sq Ft</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-indigo-400">
                        <Users className="w-3.5 h-3.5" />
                        <span className="font-mono font-medium">{prop.matchedBuyersCount} Active Buyers Matched</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{prop.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: PIPELINE & DEALS */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Deal Progression & Escrow Radar</h3>
                <p className="text-xs text-slate-400">Real-time contingency monitoring, commission splits, and closing forecasts</p>
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
                      {stage.count}
                    </span>
                  </div>
                  <div className="text-lg font-bold font-mono text-indigo-300 tabular-nums">{stage.totalValue}</div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className={`h-full ${stage.color} rounded-full w-full`} />
                  </div>

                  {/* Sample Mock Deal Card in this stage */}
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

        {/* VIEW 5: AI COPILOT LIVE */}
        {activeTab === 'copilot' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">EstatePilot Assistant Command</h3>
                  <p className="text-xs text-slate-400">Autonomous real estate task orchestration with human-in-the-loop review</p>
                </div>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-2 py-0.5 rounded">
                Strict Safe Execution Mode
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-300">Contract Clause Radar</span>
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-300">
                  Scanned 14 pages of draft escrow purchase agreement for 8400 Skyline Crest. No unvetted seller concessions detected.
                </p>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Standard CAR/AIR Compliant</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-300">WhatsApp Inbound AI</span>
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-300">
                  Handled overseas buyer inquiry in Japanese at 02:15 AM regarding seismic retrofitting specifications and HOA balance sheet.
                </p>
                <div className="text-[11px] text-indigo-400 flex items-center gap-1 pt-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Transferred to S. Jenkins</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-300">Price Drop Broadcast</span>
                  <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <p className="text-xs text-slate-300">
                  Pre-drafted private broker notification for Marina Haven price adjustment ($3.8M → $3.6M) to 142 vetted luxury buyer brokers.
                </p>
                <div className="text-[11px] text-amber-400 flex items-center gap-1 pt-1 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>Queued for Listing Broker</span>
                </div>
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
          <span>INTELLIGENCE MODEL: ESTATE-OS-V2</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Interactive Preview · Data Illustrative</span>
        </div>
      </div>
    </div>
  );
};
