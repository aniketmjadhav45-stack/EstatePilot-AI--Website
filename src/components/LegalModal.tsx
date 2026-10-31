import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-950">
              {type === 'privacy' ? 'EstatePilot AI Privacy Policy' : 'EstatePilot AI Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-sm text-slate-600 leading-relaxed font-sans">
          {type === 'privacy' ? (
            <>
              <p className="text-xs text-slate-400">Effective Date: October 2026 · EstatePilot AI Global Policy</p>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">1. Customer Data Ownership</h4>
                <p>
                  At EstatePilot AI, we believe your client database, off-market listings, transaction contracts, and
                  communications are strictly your brokerage’s property. We do not sell, rent, or cross-market your
                  data to third parties or competing brokerages.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">2. AI Training Exclusions</h4>
                <p>
                  Customer lead data, conversation transcripts, and uploaded property disclosures are processed solely
                  to power your firm’s private workspace. Customer data is explicitly excluded from training public or
                  foundational third-party language models.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">3. Tenant Isolation</h4>
                <p>
                  Each subscribing brokerage or team account is partitioned using isolated data schemas and encrypted
                  storage volumes. Access control is enforced via strict cryptographic and role-based policies (RBAC).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">4. Retention and Export</h4>
                <p>
                  You may export your complete CRM records, property listings, and audit trails at any time in standard
                  formats (CSV, JSON, PDF). Upon account termination, data deletion protocols are completed within 30 days.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-slate-400">Effective Date: October 2026 · EstatePilot AI Terms of Service</p>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">1. Scope of the Operating System</h4>
                <p>
                  EstatePilot AI provides software infrastructure, CRM automation, and AI-assisted workflows for licensed
                  real estate agents, brokers, and real estate organizations.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">2. Human-in-the-Loop Authority</h4>
                <p>
                  EstatePilot AI agents act strictly as operational assistants. Real estate licensees and managing brokers
                  retain sole responsibility for final review and approval of legal disclosures, purchase agreements,
                  contingency waivers, and statutory communications under applicable real estate regulations.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">3. Fair Housing Compliance</h4>
                <p>
                  Subscribers agree to use all AI marketing and lead routing capabilities in full compliance with local,
                  state, and federal Fair Housing and anti-discrimination laws. EstatePilot AI includes automated review
                  checks designed to uphold non-discriminatory advertising standards.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">4. Early Access Pilot Provisions</h4>
                <p>
                  Subscribers participating in early access pilot cohorts enjoy locked founding member pricing and
                  priority support channels throughout the duration of their active pilot agreement.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
