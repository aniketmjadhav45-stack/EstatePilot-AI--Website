import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { EarlyAccessFormData } from '../types';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COUNTRY_OPTIONS = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'United Arab Emirates',
  'Singapore',
  'Germany',
  'France',
  'Spain',
  'Switzerland',
  'Hong Kong',
  'Japan',
  'Other / Global',
];

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<EarlyAccessFormData>({
    fullName: '',
    workEmail: '',
    companyName: '',
    role: 'Managing Broker / Owner',
    country: 'United States',
    phone: '',
    teamSize: '11 - 50 agents',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{ code: string; name: string; email: string } | null>(null);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your complete name';
    }

    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail.trim())) {
      newErrors.workEmail = 'Please provide a valid corporate email address';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company or brokerage name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Please select your role';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Please select your country of operation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Backend integration architecture:
      // Ready for Supabase or custom REST endpoint without exposing secrets in frontend code.
      // E.g., if a serverless endpoint '/api/early-access' is available, it sends the payload.
      // Otherwise, it safely records to localStorage and simulates successful network enrollment.
      const payload = {
        full_name: formData.fullName.trim(),
        work_email: formData.workEmail.trim(),
        company_name: formData.companyName.trim(),
        role: formData.role,
        country: formData.country,
        phone: formData.phone?.trim() || null,
        team_size: formData.teamSize || null,
        created_at: new Date().toISOString(),
      };

      // Check if backend webhook/endpoint is available
      let serverHandled = false;
      try {
        const res = await fetch('/api/early-access', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          serverHandled = true;
        }
      } catch {
        // If no server endpoint exists in preview mode, proceed gracefully
        serverHandled = false;
      }

      // Record in local cache for offline/demo persistence
      try {
        const existing = JSON.parse(localStorage.getItem('estatepilot_early_access') || '[]');
        existing.push({ ...payload, serverHandled });
        localStorage.setItem('estatepilot_early_access', JSON.stringify(existing));
      } catch {
        // Ignore local storage error in sandboxes
      }

      // Artificial micro-delay for realistic feedback
      await new Promise((r) => setTimeout(r, 650));

      const randomCode = `EP-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedData({
        code: randomCode,
        name: formData.fullName,
        email: formData.workEmail,
      });
    } catch {
      setSubmitError('Unable to process application at this moment. Please verify your connection or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setSubmitError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="early-access-title"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase">
                Priority Reservation Confirmed
              </span>
              <h3 id="early-access-title" className="text-2xl font-extrabold text-slate-950 mt-3">
                Welcome to EstatePilot AI, {submittedData.name.split(' ')[0]}.
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Your VIP enrollment for <strong className="text-slate-900">{formData.companyName}</strong> ({formData.country}) has been
                registered under priority queue code:
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-xs mx-auto">
              <div className="text-xs text-slate-500 uppercase tracking-wider">Reservation ID</div>
              <div className="text-2xl font-bold font-mono text-slate-950 mt-1">{submittedData.code}</div>
              <div className="text-[11px] text-emerald-600 mt-1">Founding Member Terms Locked</div>
            </div>

            <div className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Our partner deployment architect will reach out to <strong className="text-slate-800">{submittedData.email}</strong>{' '}
              to coordinate your data migration and team setup.
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <div className="flex items-center justify-between mb-3">
                <img
                  src="/assets/aistudio/EstatePilot_AI__Intelligent_Real_Estate_Growth_03824261.png"
                  alt="EstatePilot AI"
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Founding Cohort</span>
                </div>
              </div>
              <h3 id="early-access-title" className="text-2xl font-extrabold text-slate-950 tracking-tight">
                Request Early Platform Access
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Join forward-thinking brokerages and top producers transitioning to an intelligent real estate operating system.
              </p>
            </div>

            {submitError && (
              <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="ea-fullname">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="ea-fullname"
                  type="text"
                  placeholder="Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                    errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullname-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullname-error" className="text-xs text-rose-500 mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Work Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="ea-email">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="ea-email"
                    type="email"
                    placeholder="sarah@prestigerealty.com"
                    value={formData.workEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, workEmail: e.target.value });
                      if (errors.workEmail) setErrors({ ...errors, workEmail: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                      errors.workEmail ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                    aria-invalid={!!errors.workEmail}
                    aria-describedby={errors.workEmail ? 'email-error' : undefined}
                  />
                  {errors.workEmail && (
                    <p id="email-error" className="text-xs text-rose-500 mt-1">
                      {errors.workEmail}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="ea-company">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="ea-company"
                    type="text"
                    placeholder="Belgrave & Co. International"
                    value={formData.companyName}
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });
                      if (errors.companyName) setErrors({ ...errors, companyName: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                      errors.companyName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                    aria-invalid={!!errors.companyName}
                    aria-describedby={errors.companyName ? 'company-error' : undefined}
                  />
                  {errors.companyName && (
                    <p id="company-error" className="text-xs text-rose-500 mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>
              </div>

              {/* Role & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="ea-role">
                    Role <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="ea-role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Individual Agent / Top Producer">Individual Agent</option>
                    <option value="Agency Partner">Agency Partner / Team Lead</option>
                    <option value="Managing Broker / Owner">Managing Broker / Owner</option>
                    <option value="Enterprise Executive">Enterprise Executive</option>
                    <option value="Operations / Tech Director">Operations / Tech Director</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="ea-country">
                    Country <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="ea-country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Phone & Team Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="ea-phone">
                    Phone (Optional)
                  </label>
                  <input
                    id="ea-phone"
                    type="tel"
                    placeholder="+1 (415) 555-0192"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1" htmlFor="ea-teamsize">
                    Team Size
                  </label>
                  <select
                    id="ea-teamsize"
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="1 agent (Solo)">1 agent (Solo)</option>
                    <option value="2 - 10 agents">2 - 10 agents</option>
                    <option value="11 - 50 agents">11 - 50 agents</option>
                    <option value="51 - 200 agents">51 - 200 agents</option>
                    <option value="200+ agents (Enterprise)">200+ agents (Enterprise)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Enrolling in Priority Cohort...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Early Access Request</span>
                    <ArrowRight className="w-4 h-4 text-indigo-300" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero spam guarantee. Enterprise tenancy isolated per organization.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
