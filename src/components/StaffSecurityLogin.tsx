/**
 * Staff Security Login Screen
 * User Control Security Gate for Church Leadership & Administration
 * Protects database management, editing, deleting, and sensitive member records.
 */

import React, { useState } from 'react';
import { useChurchData } from '../context/ChurchDataContext';
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

interface StaffSecurityLoginProps {
  onBackToMemberForm?: () => void;
}

export const StaffSecurityLogin: React.FC<StaffSecurityLoginProps> = ({ onBackToMemberForm }) => {
  const { staffUsers, login, loginAsUser, setPortalView, t } = useChurchData();

  const [identifier, setIdentifier] = useState('');
  const [secret, setSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Please enter your staff email or username.');
      return;
    }
    if (!secret.trim()) {
      setError('Please enter your security PIN or password.');
      return;
    }

    setIsSubmitting(true);
    const result = login(identifier, secret);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4 py-6 sm:py-10 relative selection:bg-indigo-500 selection:text-white overflow-y-auto">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none" />

      {/* Top Navigation Bar & Security Badge */}
      <div className="w-full max-w-md mx-auto mb-4 flex items-center justify-between gap-2 z-10 px-0.5">
        <button
          type="button"
          onClick={() => {
            if (onBackToMemberForm) onBackToMemberForm();
            else setPortalView('public_register');
          }}
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-300 hover:text-white transition-colors bg-slate-800/90 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700/80 shadow-xs cursor-pointer"
          title="Return to Member Registration Form"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Go to Member Registration Form</span>
          <span className="sm:hidden">Member Registration Form</span>
        </button>

        <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium shrink-0 bg-emerald-950/50 border border-emerald-800/60 px-2 py-1 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="hidden xs:inline">Law N° 058/2021 Security</span>
          <span className="xs:hidden">Law 058/2021</span>
        </div>
      </div>

      {/* Central Login Card */}
      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700 rounded-2xl shadow-2xl p-5 sm:p-7 relative z-10 backdrop-blur-md">
        
        {/* Brand Header */}
        <div className="text-center mb-5">
          <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-white mx-auto mb-2.5 shadow-lg shadow-indigo-600/30">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Church Leadership Login
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Church of the Nazarene, Remera · Kigali, Rwanda
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-rose-950/60 border border-rose-800/70 rounded-xl p-3 flex items-start gap-2.5 text-rose-200 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Staff Email or Username
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full max-w-full min-w-0 box-border bg-slate-900/90 border border-slate-700 rounded-xl sm:rounded-lg px-3.5 sm:px-3 py-2.5 sm:py-2 min-h-[44px] sm:min-h-[38px] text-[15px] sm:text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Security PIN or Password
              </label>
              <button
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="text-xs sm:text-[11px] text-slate-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors min-h-[36px]"
              >
                {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showSecret ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <input
              type={showSecret ? 'text' : 'password'}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full max-w-full min-w-0 box-border bg-slate-900/90 border border-slate-700 rounded-xl sm:rounded-lg px-3.5 sm:px-3 py-2.5 sm:py-2 min-h-[44px] sm:min-h-[38px] text-[15px] sm:text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono"
            />
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs sm:text-xs py-2.5 px-4 min-h-[44px] sm:min-h-[40px] rounded-xl shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Lock className="w-4 h-4" />
            <span>Sign In to Database Management</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/80" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-slate-400">
            <span className="bg-slate-800 px-2 font-medium">Quick 1-Click Access for Evaluation</span>
          </div>
        </div>

        {/* Quick Staff Sign-In Buttons */}
        <div className="space-y-2">
          {staffUsers.map((user) => {
            const isSec = user.role === 'SUPER_ADMIN';
            const isReg = user.role === 'DATA_ENTRY';
            const badgeColor = isSec
              ? 'bg-purple-600 text-white'
              : isReg
              ? 'bg-indigo-600 text-white'
              : 'bg-emerald-600 text-white';
            const cardStyle = isSec
              ? 'border-purple-800/50 hover:border-purple-500 bg-purple-950/20 hover:bg-purple-900/30'
              : isReg
              ? 'border-indigo-800/50 hover:border-indigo-500 bg-indigo-950/20 hover:bg-indigo-900/30'
              : 'border-emerald-800/50 hover:border-emerald-500 bg-emerald-950/20 hover:bg-emerald-900/30';

            return (
              <button
                key={user.id}
                type="button"
                onClick={() => loginAsUser(user)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group flex items-center justify-between gap-2.5 ${cardStyle}`}
                title={`Log in as ${user.name} (${user.title})`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ${badgeColor}`}>
                    {isSec ? 'SEC' : isReg ? 'REG' : 'LDR'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-white group-hover:text-indigo-200 truncate leading-tight">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {user.title}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[11px] font-semibold text-indigo-300 bg-slate-900/90 border border-slate-700/80 px-2 py-0.5 rounded shadow-2xs">
                    PIN: {user.pin}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-slate-800 group-hover:bg-indigo-600 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-slate-700/70 text-center text-[11px] text-slate-400">
          <p>
            Church of the Nazarene Remera Parish · Kigali, Rwanda
          </p>
          <p className="mt-0.5 text-[10px] text-slate-500">
            Compliant with Rwanda Law No. 058/2021 on Personal Data Protection
          </p>
        </div>

      </div>
    </div>
  );
};
