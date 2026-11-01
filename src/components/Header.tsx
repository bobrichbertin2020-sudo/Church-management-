/**
 * Header Component - Top Bar Contract
 * Clean, single-line typography, role switching, language toggle, Law 058/2021 badge,
 * authenticated staff status, share registration link button, and session lock.
 */

import React from 'react';
import { useChurchData } from '../context/ChurchDataContext';
import { UserRole, Language } from '../types';
import {
  ShieldCheck,
  UserCheck,
  Globe,
  Database,
  Plus,
  Share2,
  LogOut,
  ExternalLink,
  Lock,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  onOpenRegisterModal: () => void;
  onOpenBackupModal: () => void;
  onOpenShareModal: () => void;
  onOpenMobileMenu?: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegisterModal,
  onOpenBackupModal,
  onOpenShareModal,
  onOpenMobileMenu,
}) => {
  const {
    currentRole,
    setCurrentRole,
    currentStaffUser,
    logout,
    setPortalView,
    language,
    setLanguage,
    t,
  } = useChurchData();

  const roles: { value: UserRole; label: string; short: string }[] = [
    { value: 'SUPER_ADMIN', label: 'Church Secretary (Full Access & Administration)', short: 'Secretary (Full Access)' },
    { value: 'DATA_ENTRY', label: 'Church Registrar (Full Access to Register & Records)', short: 'Registrar (Full Access)' },
    { value: 'MINISTRY_LEADER', label: 'Ministry Leader (Read-Only Group)', short: 'Ministry Leader' },
    { value: 'VIEWER', label: 'Church Member / Viewer (Direct Registration & View)', short: 'Member / Viewer' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="md:hidden flex items-center justify-center p-2 -ml-1 text-slate-200 hover:text-white hover:bg-slate-800 active:bg-slate-700 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Open navigation menu"
              title="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-indigo-400" />
            </button>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold tracking-wider text-sm sm:text-base shadow-sm shrink-0">
              N
            </div>
            <div>
              <div className="text-sm sm:text-base font-semibold tracking-tight text-white flex items-center gap-1.5 sm:gap-2">
                <span>NFDMS</span>
                <span className="text-slate-400 font-normal hidden sm:inline">·</span>
                <span className="text-slate-200 text-xs sm:text-sm font-medium hidden sm:inline">
                  {t('churchName')}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 hidden md:block">
                {t('churchSubtitle')}
              </div>
            </div>
          </div>

          {/* Center Zone - Regulatory & Privacy indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded border border-slate-700/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-300">Rwanda Law N° 058/2021 Compliant</span>
            <span className="text-slate-500">·</span>
            <span>Data Protection & Privacy</span>
          </div>

          {/* Right Action Zone */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Share Public Member Registration Link Button */}
            <button
              onClick={onOpenShareModal}
              title="Share member self-registration link to church members via WhatsApp or Web"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded shadow-sm transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share Link</span>
            </button>

            {/* Test Congregant View Button */}
            <button
              onClick={() => setPortalView('public_register')}
              title="Open public registration form as a congregant"
              className="hidden lg:flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              <span>Member Form</span>
            </button>

            {/* Language Selector (Visible on md+ screens, in drawer on mobile) */}
            <div className="hidden md:flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 hidden sm:inline" />
              {(['en', 'rw', 'fr'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors uppercase ${
                    language === lang
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title={lang === 'en' ? 'English' : lang === 'rw' ? 'Ikinyarwanda' : 'Français'}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Role Switcher (Visible on md+ screens, in drawer on mobile) */}
            <div className="relative hidden md:block">
              <div className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded text-xs text-slate-200">
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400 hidden xl:inline">{t('currentRole')}:</span>
                <select
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value as UserRole)}
                  className="bg-transparent text-xs font-medium text-white focus:outline-none cursor-pointer pr-1"
                >
                  {roles.map((r) => (
                    <option key={r.value} value={r.value} className="bg-slate-900 text-white">
                      {r.short}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Backup Quick Button */}
            <button
              onClick={onOpenBackupModal}
              title="Database Backup & Restore"
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden md:block border border-slate-700/60"
            >
              <Database className="w-4 h-4" />
            </button>

            {/* Direct Database Member Registration */}
            <button
              onClick={onOpenRegisterModal}
              title="Register full member information directly stored in Remera database"
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('registerMember')}</span>
              <span className="sm:hidden">Register</span>
            </button>

            {/* Lock / Logout Button for Security */}
            <button
              onClick={logout}
              title="Lock database management terminal & logout"
              className="flex items-center gap-1 p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors border border-slate-700/60 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
