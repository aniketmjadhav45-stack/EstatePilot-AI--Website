import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Home,
  MessageSquare,
  Clock,
  Calendar,
  TrendingUp,
  Megaphone,
  BarChart3,
  Sparkles,
  ShieldAlert,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  LayoutGrid,
  Sliders
} from 'lucide-react';
import { AI_AGENTS } from '../data/mockData';
import { AiAgent } from '../types';

interface AiAgentCenterProps {
  onOpenEarlyAccess: () => void;
}

export const AiAgentCenter: React.FC<AiAgentCenterProps> = ({ onOpenEarlyAccess }) => {
  const [activeAgentId, setActiveAgentId] = useState<string>(AI_AGENTS[0].id);
  const [viewMode, setViewMode] = useState<'grid' | 'interactive'>('grid');
  const [simulatingAgentId, setSimulatingAgentId] = useState<string | null>(null);
  const [simulationComplete, setSimulationComplete] = useState<string | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    UserCheck,
    Home,
    MessageSquare,
    Clock,
    Calendar,
    TrendingUp,
    Megaphone,
    BarChart3,
  };

  const activeAgent = AI_AGENTS.find((a) => a.id === activeAgentId) || AI_AGENTS[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const agentCardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const handleSimulate = (agent: AiAgent) => {
    setSimulatingAgentId(agent.id);
    setSimulationComplete(null);
    setTimeout(() => {
      setSimulatingAgentId(null);
      setSimulationComplete(agent.id);
    }, 1200);
  };

  return (
    <section id="ai-agents" className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence with Human Oversight</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance">
            Meet Your Real Estate AI Team.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 text-balance leading-relaxed">
            A coordinated fleet of 8 specialized AI agents assisting with repetitive qualification, matching, follow-ups,
            and showing operations—while you retain full control over legal contracts and sensitive negotiations.
          </p>

          {/* View Mode Toggle */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All 8 Agent Cards</span>
            </button>
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Agent Sandbox</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: PREMIUM AGENT CARDS GRID WITH FRAMER MOTION ENTRANCE */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
              className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {AI_AGENTS.map((agent) => {
                const Icon = iconMap[agent.iconName] || Sparkles;
                return (
                  <motion.div
                    key={agent.id}
                    variants={agentCardVariants}
                    whileHover={{
                      y: -6,
                      borderColor: 'rgba(99, 102, 241, 0.55)',
                      boxShadow: '0 16px 32px -8px rgba(79, 70, 229, 0.3)',
                      transition: { duration: 0.2 },
                    }}
                    className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:bg-slate-900 transition-colors group cursor-default"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-600/30 transition-all">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">
                          Active Fleet
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {agent.name}
                        </h3>
                        <div className="text-xs text-indigo-400 font-mono mt-0.5">{agent.shortRole}</div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">{agent.description}</p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                        <div className="text-[11px] font-semibold uppercase text-slate-400">Core Workflows:</div>
                        {agent.keyWorkflows.slice(0, 2).map((w) => (
                          <div key={w} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{w}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        <span>Human Review Gate</span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveAgentId(agent.id);
                          setViewMode('interactive');
                        }}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Test Action</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="interactive"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
            {/* Left: 8 Agent Directory (5 cols) */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1 mb-2">
                Select Specialist Agent:
              </div>
              {AI_AGENTS.map((agent) => {
                const Icon = iconMap[agent.iconName] || Sparkles;
                const isActive = activeAgentId === agent.id;

                return (
                  <div
                    key={agent.id}
                    onClick={() => {
                      setActiveAgentId(agent.id);
                      setSimulationComplete(null);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                        : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">{agent.name}</div>
                        <div className="text-xs text-slate-400 truncate">{agent.shortRole}</div>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-mono shrink-0 ${
                        isActive ? 'text-indigo-300 bg-indigo-950 border border-indigo-800' : 'text-slate-500'
                      }`}
                    >
                      Active
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right: Detailed Agent Dossier & Interactive Simulator (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    {React.createElement(iconMap[activeAgent.iconName] || Sparkles, { className: 'w-6 h-6' })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeAgent.name}</h3>
                    <p className="text-xs text-indigo-300 font-mono mt-0.5">{activeAgent.shortRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Permission-Aware Gating</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">{activeAgent.description}</p>

              {/* Core Workflows */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Automated Capabilities
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeAgent.keyWorkflows.map((w) => (
                    <div key={w} className="flex items-start gap-2 p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{w}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Human Oversight Guardrail */}
              <div className="p-3.5 bg-amber-950/30 border border-amber-800/50 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Human-in-the-Loop Guardrail:</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">{activeAgent.safetyCheck}</p>
              </div>

              {/* Interactive Agent Simulator */}
              <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Simulate Real Estate Trigger:</span>
                  <span className="font-mono text-slate-500">Live Agent Test Sandbox</span>
                </div>

                <div className="text-xs bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-slate-400 text-[11px]">Event Detected:</div>
                  <div className="text-white font-medium italic">"{activeAgent.sampleAction.trigger}"</div>
                </div>

                {simulationComplete === activeAgent.id && (
                  <div className="text-xs bg-indigo-950/60 border border-indigo-700/60 p-3 rounded-lg text-indigo-200 space-y-1 animate-in fade-in">
                    <div className="flex items-center gap-1.5 font-semibold text-indigo-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Action Processed:</span>
                    </div>
                    <div className="leading-relaxed">{activeAgent.sampleAction.actionResult}</div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleSimulate(activeAgent)}
                    disabled={simulatingAgentId === activeAgent.id}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {simulatingAgentId === activeAgent.id ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Simulating Agent Execution...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Simulate {activeAgent.name.split(' ')[0]} Response</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={onOpenEarlyAccess}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Deploy to your team</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>
  );
};
