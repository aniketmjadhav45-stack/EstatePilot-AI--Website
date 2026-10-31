import React, { useState } from 'react';
import {
  Home,
  Bed,
  Bath,
  Maximize2,
  Car,
  MapPin,
  Sparkles,
  ArrowRight,
  Compass,
  FileText,
  Calendar,
  Users,
  Eye,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { PropertyVisual } from './ArchitecturalVisuals';

interface PropertyShowcaseProps {
  onOpenEarlyAccess: () => void;
}

interface ShowcaseItem {
  id: string;
  visualType: 'villa' | 'penthouse' | 'alpine' | 'coastal';
  title: string;
  address: string;
  city: string;
  price: string;
  pricePerSqFt: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  garage: number;
  style: string;
  status: 'Exclusive Off-Market' | 'Active MLS Sync' | 'Under Private Contract';
  matchedBuyers: number;
  aiInsight: string;
  highlights: string[];
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({ onOpenEarlyAccess }) => {
  const [selectedId, setSelectedId] = useState<string>('villa-1');
  const [viewMode, setViewMode] = useState<'elevation' | 'floorplan'>('elevation');

  const properties: ShowcaseItem[] = [
    {
      id: 'villa-1',
      visualType: 'villa',
      title: 'The Glass Pavilion at Obsidian Ridge',
      address: '8400 Skyline Crest Way',
      city: 'Beverly Hills, CA 90210',
      price: '$8,450,000',
      pricePerSqFt: '$1,173 / sq ft',
      beds: 5,
      baths: 7,
      sqft: 7200,
      lotSize: '0.84 Acres',
      garage: 4,
      style: 'Minimalist Post-and-Beam',
      status: 'Exclusive Off-Market',
      matchedBuyers: 6,
      aiInsight:
        'AI Matching Engine identified 6 pre-qualified cash buyers with active criteria matching post-and-beam construction in Beverly Hills.',
      highlights: ['Cantilevered sunset terrace', '50ft zero-edge infinity pool', 'Subterranean 400-bottle wine gallery', 'Smart biometric estate security'],
    },
    {
      id: 'penthouse-2',
      visualType: 'penthouse',
      title: 'The Solstice Penthouse 42B',
      address: '500 Embarcadero Boulevard',
      city: 'San Francisco, CA 94105',
      price: '$4,250,000',
      pricePerSqFt: '$1,231 / sq ft',
      beds: 3,
      baths: 3.5,
      sqft: 3450,
      lotSize: 'Full Floor Penthouse',
      garage: 2,
      style: 'Metropolitan High-Rise Modern',
      status: 'Active MLS Sync',
      matchedBuyers: 11,
      aiInsight:
        'Elena Rostova (Prestige Capital) viewed the digital 3D model 4 times in 24 hours. Showing proposed for Thursday sunset.',
      highlights: ['Private elevator foyer', '360° unobstructed Bay Bridge views', 'Poliform custom Italian chef kitchen', '24/7 dedicated valet & concierge'],
    },
    {
      id: 'alpine-3',
      visualType: 'alpine',
      title: 'Canyon View Architectural Villa',
      address: '1420 Mariposa Ravine Trail',
      city: 'Aspen, CO 81611',
      price: '$11,900,000',
      pricePerSqFt: '$1,214 / sq ft',
      beds: 6,
      baths: 8,
      sqft: 9800,
      lotSize: '2.4 Acres',
      garage: 3,
      style: 'Rammed Earth & Cedar Timber',
      status: 'Exclusive Off-Market',
      matchedBuyers: 4,
      aiInsight:
        'Direct buyer match with overseas family office client Kenji Takahashi. 4K virtual synchronization scheduled.',
      highlights: ['Ski-in / ski-out mountain access', 'Double-height stone hearth fireplace', 'Heated hydronic limestone outdoor decks', 'Private wellness wing with Finnish sauna'],
    },
    {
      id: 'coastal-4',
      visualType: 'coastal',
      title: 'Modernist Marina Haven',
      address: '228 Harbor Lighthouse Pier',
      city: 'Miami Beach, FL 33139',
      price: '$3,600,000',
      pricePerSqFt: '$878 / sq ft',
      beds: 4,
      baths: 4.5,
      sqft: 4100,
      lotSize: 'Waterfront Lot',
      garage: 2,
      style: 'Tropical Modernist',
      status: 'Active MLS Sync',
      matchedBuyers: 8,
      aiInsight:
        'Recent price adjustment ($3.8M → $3.6M) automatically broadcasted to 142 verified buyer brokers in the EstatePilot network.',
      highlights: ['Direct deepwater yacht slip (up to 65ft)', 'Expansive covered travertine lanai', 'Summer kitchen with teppanyaki grill', 'Lush privacy perimeter with mature royal palms'],
    },
  ];

  const currentProp = properties.find((p) => p.id === selectedId) || properties[0];

  return (
    <section className="py-20 md:py-28 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Subtle blueprint grid watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="sectionGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sectionGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-3.5 py-1.5 rounded-full">
            <Home className="w-3.5 h-3.5" />
            <span>Curated Inventory & Architectural Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance">
            Your Portfolio, Rendered with Architectural Precision.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 text-balance leading-relaxed">
            EstatePilot AI connects off-market trophy assets and MLS inventory directly with predictive buyer intent,
            floorplans, and automated tour logistics.
          </p>

          {/* Property Selectors */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {properties.map((p) => {
              const isSelected = selectedId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedId(p.id);
                    setViewMode('elevation');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md ring-1 ring-indigo-400'
                      : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{p.title.split(' at ')[0].split(' Architectural ')[0]}</span>
                  <span className="font-mono text-[11px] text-slate-300 opacity-90">{p.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Showcase Stage */}
        <div className="mt-12 bg-slate-950/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left 7 Columns: Visual Architectural Rendering & Floorplan Toggle */}
            <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
              {/* Visual Frame */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <PropertyVisual type={viewMode === 'floorplan' ? 'floorplan' : currentProp.visualType} showBadge={true} />

                {/* View Mode Switcher Overlay */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1 rounded-lg border border-slate-800 text-xs font-medium">
                  <button
                    onClick={() => setViewMode('elevation')}
                    className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                      viewMode === 'elevation' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Exterior Elevation</span>
                  </button>
                  <button
                    onClick={() => setViewMode('floorplan')}
                    className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                      viewMode === 'floorplan' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>CAD Floorplan</span>
                  </button>
                </div>
              </div>

              {/* Architectural Highlights Strip */}
              <div className="p-5 sm:p-6 bg-slate-900/50 border-t border-slate-800/80 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Curated Residence Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentProp.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Property Dossier & Real Estate Icons */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-800 px-2.5 py-0.5 rounded">
                    {currentProp.status}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{currentProp.matchedBuyers} Buyers Matched</span>
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mt-2 leading-snug">{currentProp.title}</h3>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{currentProp.address}, {currentProp.city}</span>
                </div>

                <div className="mt-4 pb-4 border-b border-slate-800 flex items-baseline justify-between">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tabular-nums">
                      {currentProp.price}
                    </div>
                    <div className="text-xs font-mono text-slate-400">{currentProp.pricePerSqFt}</div>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <span className="text-slate-300 font-medium">Style: </span>
                    <span className="text-indigo-300">{currentProp.style}</span>
                  </div>
                </div>

                {/* 6 Real Estate Metric Icon Grid */}
                <div className="grid grid-cols-3 gap-2.5 my-4">
                  <div className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-xl text-center space-y-1">
                    <Bed className="w-4 h-4 text-indigo-400 mx-auto" />
                    <div className="text-xs font-bold text-white font-mono">{currentProp.beds} Beds</div>
                    <div className="text-[10px] text-slate-400">En-suite</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-xl text-center space-y-1">
                    <Bath className="w-4 h-4 text-indigo-400 mx-auto" />
                    <div className="text-xs font-bold text-white font-mono">{currentProp.baths} Baths</div>
                    <div className="text-[10px] text-slate-400">Custom Spa</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-xl text-center space-y-1">
                    <Maximize2 className="w-4 h-4 text-indigo-400 mx-auto" />
                    <div className="text-xs font-bold text-white font-mono">{currentProp.sqft.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">Interior Sq Ft</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-xl text-center space-y-1">
                    <Compass className="w-4 h-4 text-indigo-400 mx-auto" />
                    <div className="text-xs font-bold text-white font-mono truncate">{currentProp.lotSize}</div>
                    <div className="text-[10px] text-slate-400">Lot & Parcel</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-xl text-center space-y-1">
                    <Car className="w-4 h-4 text-indigo-400 mx-auto" />
                    <div className="text-xs font-bold text-white font-mono">{currentProp.garage} Cars</div>
                    <div className="text-[10px] text-slate-400">Subterranean</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-xl text-center space-y-1">
                    <DollarSign className="w-4 h-4 text-emerald-400 mx-auto" />
                    <div className="text-xs font-bold text-emerald-300 font-mono">Verified</div>
                    <div className="text-[10px] text-slate-400">Pre-Qualified</div>
                  </div>
                </div>

                {/* AI Predictive Insight Callout */}
                <div className="p-3.5 bg-indigo-950/50 border border-indigo-800/60 rounded-xl space-y-1.5 text-xs text-indigo-200">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>AI Lead Alignment Insight:</span>
                  </div>
                  <p className="leading-relaxed text-slate-300">{currentProp.aiInsight}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={onOpenEarlyAccess}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book VIP Showing or Broker Tour</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-center text-[11px] text-slate-400">
                  Includes automatic lockbox verification and private itinerary dispatch.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
