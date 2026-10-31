import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building } from 'lucide-react';
import { EarlyAccessFormData } from '../types';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<EarlyAccessFormData>({
    fullName: '',
    workEmail: '',
    phone: '',
    brokerageName: '',
    role: 'Managing Broker / Owner',
    teamSize: '11 - 50 agents',
    primaryGoal: 'Automate Lead Qualification & Response',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please provide a valid email format';
    }
    if (!formData.brokerageName.trim()) {
      newErrors.brokerageName = 'Please enter your brokerage or company name';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = `EP-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedCode(randomCode);
    }, 900);
  };

  const handleReset = () => {
    setSubmittedCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedCode ? (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase">
                Priority Reservation Confirmed
              </span>
              <h3 className="text-2xl font-extrabold text-slate-950 mt-3">
                Welcome to EstatePilot AI, {formData.fullName.split(' ')[0]}.
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Your VIP enrollment for <strong className="text-slate-900">{formData.brokerageName}</strong> has been
                registered under priority queue code:
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-xs mx-auto">
              <div className="text-xs text-slate-500 uppercase tracking-wider">Reservation ID</div>
              <div className="text-2xl font-bold font-mono text-slate-950 mt-1">{submittedCode}</div>
              <div className="text-[11px] text-emerald-600 mt-1">Founding Member Terms Locked</div>
            </div>

            <div className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Our partner deployment architect will reach out to <strong className="text-slate-800">{formData.workEmail}</strong>{' '}
              within 24 hours to coordinate your data migration and team setup.
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Q4 Priority Access Application</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                Request Early Platform Access
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Join forward-thinking brokerages and top producers transitioning to an intelligent real estate operating system.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                    errors.fullName ? 'border-rose-400' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@prestigerealty.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                      errors.workEmail ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {errors.workEmail && <p className="text-xs text-rose-500 mt-1">{errors.workEmail}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Brokerage / Company <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Belgrave & Co. International"
                    value={formData.brokerageName}
                    onChange={(e) => setFormData({ ...formData, brokerageName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                      errors.brokerageName ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {errors.brokerageName && (
                    <p className="text-xs text-rose-500 mt-1">{errors.brokerageName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Your Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Solo Agent / Top Producer">Solo Agent / Top Producer</option>
                    <option value="Team Leader">Team Leader</option>
                    <option value="Managing Broker / Owner">Managing Broker / Owner</option>
                    <option value="Enterprise Executive">Enterprise Executive</option>
                    <option value="Operations / Tech Director">Operations / Tech Director</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Team Size</label>
                  <select
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

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Primary Priority</label>
                  <select
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="Automate Lead Qualification & Response">Automate Lead Response</option>
                    <option value="Unify Fragmented Inboxes & Data">Unify Fragmented Inboxes</option>
                    <option value="Accelerate Showing Logistics">Accelerate Showing Logistics</option>
                    <option value="Discreet Off-Market Matching">Discreet Off-Market Matching</option>
                    <option value="Full Brokerage OS Migration">Full Brokerage OS Migration</option>
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
                    <span>Reserving Priority Cohort Slot...</span>
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
              <span>We respect your privacy. No spam. Data isolated per firm.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
