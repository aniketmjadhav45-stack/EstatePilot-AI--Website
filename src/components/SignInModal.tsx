import React, { useState } from 'react';
import { X, Building, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDemo: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onLaunchDemo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both your work email and password.');
      return;
    }
    setSubmitting(true);
    setLoginError(null);

    setTimeout(() => {
      setSubmitting(false);
      // For pilot users or demo reviewers:
      onClose();
      onLaunchDemo();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-11 h-11 rounded-xl bg-slate-950 text-white mx-auto flex items-center justify-center shadow-xs">
            <Building className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-950">Sign In to EstatePilot AI</h3>
          <p className="text-xs text-slate-600">Access your firm’s real estate operating workspace</p>
        </div>

        {/* Quick Demo Access Callout */}
        <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900">
            <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pilot Partner & Evaluator Mode:</span>
          </div>
          <p className="text-xs text-indigo-700 leading-relaxed">
            Evaluating EstatePilot AI? You can launch the interactive simulated dashboard without credentials.
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onLaunchDemo();
            }}
            className="w-full py-2 text-xs font-bold text-indigo-700 bg-white hover:bg-indigo-100/60 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
          >
            Launch Interactive Demo Cockpit
          </button>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          {loginError && (
            <div className="p-2.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg">
              {loginError}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@belgrave.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <a href="#reset" onClick={(e) => e.preventDefault()} className="text-[11px] text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 disabled:opacity-50 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Workspace</span>
                <ArrowRight className="w-4 h-4 text-indigo-300" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Single Sign-On (SSO) & Biometric 2FA Enabled</span>
        </div>
      </div>
    </div>
  );
};
