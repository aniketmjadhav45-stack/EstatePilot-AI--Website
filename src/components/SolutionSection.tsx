import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  Check
} from 'lucide-react';
import { SOLUTION_FEATURES } from '../data/mockData';

interface SolutionSectionProps {
  onOpenEarlyAccess: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenEarlyAccess }) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

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

  const categories = [
    { id: 'all', label: 'All 10 Modules' },
    { id: 'Relationship Management', label: 'Relationships & Inbox' },
    { id: 'Inventory & Listings', label: 'Inventory & Matching' },
    { id: 'Autonomous Operations', label: 'AI Fleet & Automations' },
    { id: 'Financial Operations', label: 'Pipeline & Analytics' },
  ];

  const filteredFeatures = SOLUTION_FEATURES.filter((feat) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'Relationship Management') {
      return feat.category === 'Relationship Management' || feat.category === 'Unified Communications' || feat.category === 'Growth & Campaigns';
    }
    if (categoryFilter === 'Inventory & Listings') {
      return feat.category === 'Inventory & Listings' || feat.category === 'Algorithmic Alignment';
    }
    if (categoryFilter === 'Autonomous Operations') {
      return feat.category === 'Autonomous Operations' || feat.category === 'Custom Rules & Triggers' || feat.category === 'Showing Logistics';
    }
    if (categoryFilter === 'Financial Operations') {
      return feat.category === 'Financial Operations' || feat.category === 'Executive Intelligence';
    }
    return true;
  });

  const selectedFeature = SOLUTION_FEATURES.find((f) => f.id === selectedFeatureId);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Comprehensive Product Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 text-balance">
            Everything Your Real Estate Business Needs. <br className="hidden sm:inline" />
            One Intelligent Workspace.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 text-balance max-w-2xl mx-auto">
            A comprehensive operating system engineered from the ground up for agents, brokers, and multi-office
            brokerages. Every module is deeply interconnected.
          </p>

          {/* Module Category Filter */}
          <div className="mt-8 flex justify-center overflow-x-auto scrollbar-none py-1">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-white text-slate-950 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards Grid with Framer Motion Entrance Animations */}
        <motion.div
          key={categoryFilter}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFeatures.map((feat) => {
            const Icon = iconMap[feat.iconName] || Sparkles;

            return (
              <motion.div
                layout
                key={feat.id}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
                  borderColor: 'rgba(99, 102, 241, 0.4)',
                  transition: { duration: 0.2 },
                }}
                onClick={() => setSelectedFeatureId(feat.id)}
                className="group relative bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs transition-colors duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-all">
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

                  {/* Deep Specs Preview */}
                  {feat.deepSpecs && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5">
                      {feat.deepSpecs.slice(0, 2).map((spec) => (
                        <div key={spec} className="flex items-start gap-1.5 text-xs text-slate-500">
                          <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{spec}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Feature Deep Dive Modal with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setSelectedFeatureId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-7 relative space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedFeatureId(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  {React.createElement(iconMap[selectedFeature.iconName] || Sparkles, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <span className="text-xs font-mono text-indigo-600">{selectedFeature.category}</span>
                  <h4 className="text-xl font-bold text-slate-950">{selectedFeature.title}</h4>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {selectedFeature.description}
              </p>

              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
                <div className="text-xs font-semibold text-slate-900">Key Operational Benefit:</div>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedFeature.benefit}</p>
              </div>

              {selectedFeature.deepSpecs && (
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                    Detailed Module Specifications:
                  </div>
                  <div className="space-y-2">
                    {selectedFeature.deepSpecs.map((spec) => (
                      <div key={spec} className="p-2.5 bg-slate-50 border border-slate-200/60 rounded-lg flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
