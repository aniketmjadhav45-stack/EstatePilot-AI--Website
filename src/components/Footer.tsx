import React from 'react';
import { Building, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onOpenContact }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            {/* EstatePilot AI Official Brand Logo */}
            <div className="inline-block bg-white px-3.5 py-1.5 rounded-xl shadow-sm">
              <img
                src="/assets/aistudio/EstatePilot_AI__Intelligent_Real_Estate_Growth_03824261.png"
                alt="EstatePilot AI — Your Real Estate, Powered by Intelligence"
                className="h-8 sm:h-9 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your Real Estate, Powered by Intelligence.
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              An intelligent platform that helps real estate agents, brokers, and agencies manage leads, properties,
              customer conversations, deals, and business operations from one place.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <a href="mailto:contact@estatepilot.ai" className="hover:text-white transition-colors">
                  contact@estatepilot.ai
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>San Francisco, CA · New York, NY · London, UK</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo('product')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Platform Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI-Powered CRM
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('ai-agents')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Specialist AI Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Showing Logistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Deals & Escrow Radar
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Solutions</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo('solutions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Individual Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('solutions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Brokerages & Agencies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('solutions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Multi-Branch Offices
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('solutions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Enterprise Teams
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('security')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Security & Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Early Access Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Operations
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} EstatePilot AI Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span className="text-slate-700">·</span>
            <span className="text-slate-400">EstatePilot OS v2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
