import React from 'react';

interface PropertyVisualProps {
  type: 'villa' | 'penthouse' | 'alpine' | 'coastal' | 'floorplan';
  className?: string;
  showBadge?: boolean;
}

export const PropertyVisual: React.FC<PropertyVisualProps> = ({ type, className = '', showBadge = true }) => {
  if (type === 'villa') {
    // The Glass Pavilion at Obsidian Ridge (Beverly Hills)
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${className}`}>
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Twilight Sky Gradient */}
            <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="40%" stopColor="#1C2541" />
              <stop offset="75%" stopColor="#3A506B" />
              <stop offset="100%" stopColor="#4F3B78" />
            </linearGradient>
            {/* Interior Warm Illumination */}
            <radialGradient id="interiorGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE3A8" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FFC872" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFA62B" stopOpacity="0" />
            </radialGradient>
            {/* Pool Water Reflection */}
            <linearGradient id="poolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A2240" />
              <stop offset="50%" stopColor="#0B3C5D" />
              <stop offset="100%" stopColor="#05192D" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="800" height="450" fill="url(#twilightSky)" />

          {/* Distant Hills / Silhouette */}
          <path d="M0,280 Q160,230 340,260 T700,240 L800,270 L800,450 L0,450 Z" fill="#0E1726" />
          <path d="M0,300 Q220,270 480,290 T800,280 L800,450 L0,450 Z" fill="#0A1118" opacity="0.8" />

          {/* Distant City Lights twinkling */}
          <circle cx="280" cy="255" r="1.5" fill="#FFEAA7" opacity="0.7" />
          <circle cx="310" cy="252" r="1.5" fill="#FFF" opacity="0.6" />
          <circle cx="490" cy="275" r="1.5" fill="#FFEAA7" opacity="0.8" />
          <circle cx="530" cy="268" r="1.5" fill="#FFF" opacity="0.7" />
          <circle cx="610" cy="250" r="1.5" fill="#FFEAA7" opacity="0.6" />

          {/* Modern Villa Structure - Cantilever Roof & Slabs */}
          {/* Main Upper Concrete Slab */}
          <polygon points="120,170 680,140 710,158 150,188" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <polygon points="150,188 710,158 710,165 150,195" fill="#0F172A" />

          {/* Upper Glass Pavilion */}
          <rect x="180" y="195" width="480" height="90" fill="#0F172A" opacity="0.4" stroke="#475569" strokeWidth="1" />
          {/* Warm Interior Lighting */}
          <rect x="185" y="198" width="220" height="84" fill="url(#interiorGlow)" opacity="0.85" />
          <rect x="420" y="198" width="235" height="84" fill="url(#interiorGlow)" opacity="0.65" />

          {/* Vertical Architectural Mullions / Glass Mullions */}
          <line x1="240" y1="195" x2="240" y2="285" stroke="#334155" strokeWidth="2" />
          <line x1="300" y1="195" x2="300" y2="285" stroke="#334155" strokeWidth="2" />
          <line x1="360" y1="195" x2="360" y2="285" stroke="#334155" strokeWidth="2" />
          <line x1="420" y1="195" x2="420" y2="285" stroke="#334155" strokeWidth="3" />
          <line x1="480" y1="195" x2="480" y2="285" stroke="#334155" strokeWidth="2" />
          <line x1="540" y1="195" x2="540" y2="285" stroke="#334155" strokeWidth="2" />
          <line x1="600" y1="195" x2="600" y2="285" stroke="#334155" strokeWidth="2" />

          {/* Architectural Concrete Feature Wall (Right) */}
          <polygon points="650,150 710,155 710,320 650,315" fill="#334155" stroke="#475569" strokeWidth="1" />
          {/* Feature Wall Texture Lines */}
          <line x1="650" y1="190" x2="710" y2="195" stroke="#1E293B" strokeWidth="1" />
          <line x1="650" y1="230" x2="710" y2="235" stroke="#1E293B" strokeWidth="1" />
          <line x1="650" y1="270" x2="710" y2="275" stroke="#1E293B" strokeWidth="1" />

          {/* Middle Cantilever Terrace Deck */}
          <polygon points="100,285 740,250 760,265 80,300" fill="#1E293B" stroke="#475569" strokeWidth="1" />

          {/* Lower Level / Pool Terrace */}
          <polygon points="80,300 760,265 770,360 60,390" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />

          {/* Infinity Reflection Pool */}
          <polygon points="140,320 660,285 680,370 120,405" fill="url(#poolGrad)" stroke="#38BDF8" strokeWidth="0.8" opacity="0.9" />
          {/* Subtle Water Reflection Highlights */}
          <line x1="160" y1="340" x2="380" y2="325" stroke="#67E8F9" strokeWidth="1" opacity="0.4" />
          <line x1="220" y1="360" x2="480" y2="340" stroke="#FFEAA7" strokeWidth="1" opacity="0.3" />
          <line x1="280" y1="380" x2="560" y2="360" stroke="#67E8F9" strokeWidth="0.8" opacity="0.35" />

          {/* Minimalist Palm & Landscaping Silhouettes */}
          <path d="M100,340 Q110,240 140,210 Q120,230 90,260 Q115,220 160,200 Q130,225 105,280" stroke="#0A1118" strokeWidth="4" fill="none" />
          <path d="M730,310 Q715,220 680,190 Q700,210 725,240 Q690,195 660,180 Q690,205 720,260" stroke="#0A1118" strokeWidth="4" fill="none" />
        </svg>

        {showBadge && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-white bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
              Post-and-Beam Modernist
            </span>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
              Verified Residence
            </span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'penthouse') {
    // The Solstice Penthouse 42B (San Francisco Waterfront)
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${className}`}>
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Night City Sky Gradient */}
            <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#050814" />
              <stop offset="50%" stopColor="#0B132B" />
              <stop offset="100%" stopColor="#1C2541" />
            </linearGradient>
            {/* Bay Water Gradient */}
            <linearGradient id="bayWater" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0A192F" />
              <stop offset="100%" stopColor="#020C1B" />
            </linearGradient>
            {/* Penthouse Interior Floor Glow */}
            <linearGradient id="interiorFloor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B1120" />
            </linearGradient>
          </defs>

          {/* Dark Metropolitan Skyline Backdrop */}
          <rect width="800" height="450" fill="url(#nightSky)" />

          {/* Distant Illuminated High-Rise Silhouettes */}
          <rect x="40" y="160" width="45" height="240" fill="#0A1128" />
          <rect x="95" y="110" width="60" height="290" fill="#0D1B2A" />
          <rect x="165" y="140" width="50" height="260" fill="#101D36" />
          <rect x="225" y="90" width="70" height="310" fill="#0E192D" />
          <rect x="305" y="170" width="55" height="230" fill="#0D1B2A" />
          <rect x="370" y="130" width="80" height="270" fill="#132238" />
          <rect x="460" y="80" width="65" height="320" fill="#0D1A30" />
          <rect x="535" y="140" width="75" height="260" fill="#101D36" />
          <rect x="620" y="100" width="90" height="300" fill="#0C172B" />
          <rect x="720" y="150" width="60" height="250" fill="#091222" />

          {/* High-Rise Window Grid Dots (City Lights) */}
          {[120, 150, 180, 210, 240, 270].map((y) => (
            <React.Fragment key={y}>
              <circle cx="115" cy={y} r="1.5" fill="#FDE047" opacity="0.75" />
              <circle cx="135" cy={y} r="1.5" fill="#E2E8F0" opacity="0.6" />
              <circle cx="245" cy={y} r="1.5" fill="#FDE047" opacity="0.8" />
              <circle cx="265" cy={y} r="1.5" fill="#FDE047" opacity="0.6" />
              <circle cx="390" cy={y} r="1.5" fill="#E2E8F0" opacity="0.7" />
              <circle cx="415" cy={y} r="1.5" fill="#FDE047" opacity="0.8" />
              <circle cx="485" cy={y} r="1.5" fill="#E2E8F0" opacity="0.9" />
              <circle cx="560" cy={y} r="1.5" fill="#FDE047" opacity="0.6" />
              <circle cx="650" cy={y} r="1.5" fill="#FDE047" opacity="0.8" />
              <circle cx="675" cy={y} r="1.5" fill="#E2E8F0" opacity="0.7" />
            </React.Fragment>
          ))}

          {/* Bay Bridge Light Suspension Cable Silhouette (Left-to-Right) */}
          <path d="M20,290 Q220,270 420,285 T800,290" stroke="#FBBF24" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M20,290 L800,290" stroke="#FDE047" strokeWidth="1.5" opacity="0.4" />

          {/* Bay Water */}
          <rect x="0" y="300" width="800" height="150" fill="url(#bayWater)" opacity="0.85" />
          {/* Bridge Water Reflection */}
          <line x1="200" y1="315" x2="350" y2="315" stroke="#FBBF24" strokeWidth="1" opacity="0.25" />
          <line x1="420" y1="325" x2="600" y2="325" stroke="#FBBF24" strokeWidth="1" opacity="0.3" />

          {/* Foreground: Penthouse Floor-to-Ceiling Steel Window Frame */}
          <rect x="0" y="0" width="800" height="450" fill="none" stroke="#1E293B" strokeWidth="24" />
          {/* Vertical Architectural Mullions */}
          <line x1="200" y1="0" x2="200" y2="450" stroke="#0F172A" strokeWidth="10" />
          <line x1="200" y1="0" x2="200" y2="450" stroke="#334155" strokeWidth="2" />
          <line x1="400" y1="0" x2="400" y2="450" stroke="#0F172A" strokeWidth="12" />
          <line x1="400" y1="0" x2="400" y2="450" stroke="#475569" strokeWidth="2" />
          <line x1="600" y1="0" x2="600" y2="450" stroke="#0F172A" strokeWidth="10" />
          <line x1="600" y1="0" x2="600" y2="450" stroke="#334155" strokeWidth="2" />

          {/* Transom Horizontal Steel Railing */}
          <line x1="0" y1="360" x2="800" y2="360" stroke="#0F172A" strokeWidth="12" />
          <line x1="0" y1="360" x2="800" y2="360" stroke="#334155" strokeWidth="2" />

          {/* Minimalist Penthouse Balcony Glass Barrier */}
          <rect x="0" y="366" width="800" height="84" fill="url(#interiorFloor)" opacity="0.9" />

          {/* Designer Lounge Silhouette */}
          <path d="M460,400 Q480,380 540,380 L620,380 Q640,380 660,410 Z" fill="#0A0F1D" />
          {/* Floor lamp soft glow */}
          <circle cx="340" cy="380" r="18" fill="#FDE047" opacity="0.2" />
          <circle cx="340" cy="380" r="4" fill="#FEF08A" opacity="0.8" />
          <line x1="340" y1="384" x2="340" y2="440" stroke="#475569" strokeWidth="2" />
        </svg>

        {showBadge && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-white bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
              Full-Floor Waterfront Penthouse
            </span>
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-indigo-500/30">
              Unobstructed 360° Bay Panorama
            </span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'alpine') {
    // Canyon View Architectural Villa (Aspen, CO)
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${className}`}>
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="alpineDusk" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="45%" stopColor="#1C2541" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#EA580C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7C2D12" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Mountain Twilight Sky */}
          <rect width="800" height="450" fill="url(#alpineDusk)" />

          {/* Jagged Alpine Mountain Peaks with Snow Accents */}
          <polygon points="40,240 180,90 280,220" fill="#1E293B" />
          <polygon points="180,90 230,150 180,165 140,140" fill="#E2E8F0" opacity="0.8" />

          <polygon points="200,260 380,60 520,240" fill="#0F172A" />
          <polygon points="380,60 440,130 380,150 330,120" fill="#F8FAFC" opacity="0.9" />

          <polygon points="480,240 620,110 760,250" fill="#1E293B" />
          <polygon points="620,110 670,160 620,175 580,150" fill="#E2E8F0" opacity="0.8" />

          {/* Pine Forest Ridge */}
          <path d="M0,280 Q200,250 400,270 T800,260 L800,450 L0,450 Z" fill="#060C14" />

          {/* Pine Tree Silhouettes */}
          {[60, 100, 140, 220, 260, 580, 640, 700, 740].map((x) => (
            <polygon key={x} points={`${x},260 ${x - 15},310 ${x + 15},310`} fill="#030712" />
          ))}

          {/* Alpine Lodge - Sloped Cedar & Glass Architecture */}
          {/* Main Sloped Gable Roof */}
          <polygon points="240,240 480,150 560,230 320,320" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
          <polygon points="240,240 480,150 485,155 245,245" fill="#78716C" />

          {/* Massive Two-Story Glass Wall */}
          <polygon points="280,240 480,165 520,240 320,315" fill="#0F172A" stroke="#78716C" strokeWidth="2" />

          {/* Double-Sided Central Hearth Fireplace Glow */}
          <circle cx="390" cy="245" r="45" fill="url(#fireGlow)" />
          <rect x="375" y="220" width="30" height="90" fill="#44403C" stroke="#292524" strokeWidth="2" />

          {/* Rammed Earth Foundation Terrace */}
          <polygon points="200,320 620,270 650,380 180,430" fill="#292524" stroke="#44403C" strokeWidth="1" />
        </svg>

        {showBadge && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-white bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
              Alpine Architecture
            </span>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/30">
              Rammed Earth & Cedar
            </span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'coastal') {
    // Modernist Marina Haven (Miami Beach, FL)
    return (
      <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${className}`}>
        <svg viewBox="0 0 800 450" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="coastalSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="40%" stopColor="#38BDF8" />
              <stop offset="75%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#F0F9FF" />
            </linearGradient>
            <linearGradient id="turquoiseOcean" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="60%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#042F2E" />
            </linearGradient>
          </defs>

          {/* Tropical Coastal Daylight Sky */}
          <rect width="800" height="450" fill="url(#coastalSky)" />

          {/* Distant Ocean Horizon */}
          <rect x="0" y="210" width="800" height="240" fill="url(#turquoiseOcean)" />

          {/* Modern Limestone White Villa (Right) */}
          <polygon points="340,130 760,110 780,340 320,360" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />

          {/* Deep Cantilevered Shaded Terraces */}
          <polygon points="320,180 740,160 750,220 310,240" fill="#0F172A" opacity="0.3" />
          <polygon points="310,260 750,240 760,300 300,320" fill="#0F172A" opacity="0.2" />

          {/* Aquamarine Tinted Glass Balcony Railings */}
          <polygon points="310,220 750,200 750,230 310,250" fill="#38BDF8" opacity="0.4" stroke="#0284C7" strokeWidth="1" />
          <polygon points="300,300 760,280 760,310 300,330" fill="#38BDF8" opacity="0.4" stroke="#0284C7" strokeWidth="1" />

          {/* Private Marina Dock Pier */}
          <polygon points="60,340 420,320 440,360 40,390" fill="#78350F" stroke="#451A03" strokeWidth="1" />
          {/* Moored Luxury Yacht Silhouette */}
          <path d="M100,335 L260,325 L290,340 L110,350 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1" />
          <path d="M140,325 L230,318 L240,325 Z" fill="#0F172A" />

          {/* Tropical Palm Fronds (Left Foreground) */}
          <path d="M0,280 Q90,210 140,160 Q110,195 80,240 Q130,170 180,140 Q135,185 100,260" stroke="#064E3B" strokeWidth="5" fill="none" />
        </svg>

        {showBadge && (
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-white bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
              Tropical Modernist
            </span>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-cyan-500/30">
              Private Marina Mooring
            </span>
          </div>
        )}
      </div>
    );
  }

  // Fallback / Floorplan Blueprint View
  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-950 p-4 ${className}`}>
      <svg viewBox="0 0 600 400" className="w-full h-full object-contain select-none" preserveAspectRatio="xMidYMid meet">
        {/* CAD Blueprint Grid */}
        <defs>
          <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="600" height="400" fill="#0B132B" />
        <rect width="600" height="400" fill="url(#cadGrid)" />

        {/* Blueprint Perimeter Outline */}
        <rect x="50" y="40" width="500" height="320" fill="none" stroke="#38BDF8" strokeWidth="2.5" />

        {/* Interior Partitions */}
        {/* Grand Salon / Living */}
        <rect x="50" y="40" width="280" height="220" fill="#0F2444" stroke="#67E8F9" strokeWidth="1.5" />
        <text x="140" y="140" fill="#E0F2FE" fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold">
          GRAND SALON
        </text>
        <text x="140" y="160" fill="#7DD3FC" fontSize="10" fontFamily="JetBrains Mono">
          26'4" × 32'8" (Waterfront View)
        </text>

        {/* Private Terrace */}
        <rect x="50" y="260" width="280" height="100" fill="#0A1E38" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="130" y="315" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono">
          COVERED SUNSET TERRACE · 840 SQ FT
        </text>

        {/* Primary Suite */}
        <rect x="330" y="40" width="220" height="180" fill="#0C203C" stroke="#67E8F9" strokeWidth="1.5" />
        <text x="370" y="120" fill="#E0F2FE" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
          PRIMARY SUITE
        </text>
        <text x="370" y="140" fill="#7DD3FC" fontSize="10" fontFamily="JetBrains Mono">
          18'6" × 22'0"
        </text>

        {/* Dressing Room & Spa Bath */}
        <rect x="330" y="220" width="110" height="140" fill="#0D2547" stroke="#67E8F9" strokeWidth="1.5" />
        <text x="345" y="290" fill="#BAE6FD" fontSize="9" fontFamily="JetBrains Mono">
          SPA EN-SUITE
        </text>

        {/* Chef's Kitchen */}
        <rect x="440" y="220" width="110" height="140" fill="#0D2547" stroke="#67E8F9" strokeWidth="1.5" />
        <text x="455" y="290" fill="#BAE6FD" fontSize="9" fontFamily="JetBrains Mono">
          CHEF'S KITCHEN
        </text>

        {/* North Compass Arrow */}
        <g transform="translate(55, 335)">
          <circle cx="15" cy="15" r="12" fill="none" stroke="#FDE047" strokeWidth="1" />
          <polygon points="15,5 11,20 15,16 19,20" fill="#FDE047" />
          <text x="12" y="2" fill="#FDE047" fontSize="8" fontFamily="JetBrains Mono">
            N
          </text>
        </g>
      </svg>
    </div>
  );
};
