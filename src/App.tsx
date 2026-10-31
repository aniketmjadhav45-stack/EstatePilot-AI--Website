/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { AiAgentCenter } from './components/AiAgentCenter';
import { HowItWorks } from './components/HowItWorks';
import { SolutionsByUser } from './components/SolutionsByUser';
import { SecuritySection } from './components/SecuritySection';
import { PricingPreview } from './components/PricingPreview';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { SignInModal } from './components/SignInModal';
import { LegalModal } from './components/LegalModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const handleLaunchDemo = () => {
    const el = document.getElementById('product-overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* 1. Sticky Navigation */}
      <Navbar
        onOpenEarlyAccess={() => setEarlyAccessOpen(true)}
        onOpenSignIn={() => setSignInOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Interactive Dashboard Mockup */}
        <Hero onOpenEarlyAccess={() => setEarlyAccessOpen(true)} />

        {/* 3. Trust / Value Strip */}
        <TrustStrip />

        {/* 4. Problem Section */}
        <ProblemSection onOpenEarlyAccess={() => setEarlyAccessOpen(true)} />

        {/* 5. Solution Section (10 Features) */}
        <SolutionSection onOpenEarlyAccess={() => setEarlyAccessOpen(true)} />

        {/* 6. AI Agent Center (8 Specialist Agents) */}
        <AiAgentCenter onOpenEarlyAccess={() => setEarlyAccessOpen(true)} />

        {/* 7. How It Works (Connect, Automate, Grow) */}
        <HowItWorks />

        {/* 8. Solutions by User (Solo Agents, Brokerages, Multi-Branch, Enterprise) */}
        <SolutionsByUser onOpenEarlyAccess={() => setEarlyAccessOpen(true)} />

        {/* 9. Security & Control */}
        <SecuritySection />

        {/* Pricing / Founding Member Tier Overview */}
        <PricingPreview onOpenEarlyAccess={() => setEarlyAccessOpen(true)} />

        {/* 10. Final Call to Action */}
        <FinalCta onOpenEarlyAccess={() => setEarlyAccessOpen(true)} />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Interactive Modals */}
      <EarlyAccessModal
        isOpen={earlyAccessOpen}
        onClose={() => setEarlyAccessOpen(false)}
      />

      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onLaunchDemo={handleLaunchDemo}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
