/**
 * MobileMenuDrawer Component
 * Slides in from left to right when mobile users click the menu bar icon.
 * Gives mobile/phone users an unobstructed, clean dashboard view while making
 * all navigation links and action buttons readily accessible in a responsive drawer.
 */

import React, { useEffect } from 'react';
import { useChurchData } from '../context/ChurchDataContext';
import { UserRole, Language } from '../types';
import {
  X,
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  UploadCloud,
  History,
  Database,
  BookOpen,
  Plus,
  Share2,
  ExternalLink,
  Download,
  LogOut,
  ShieldCheck,
  Globe,
  UserCheck,
  Church,
  ChevronRight,
} from 'lucide-react';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegisterModal: () => void;
  onOpenBackupModal: () => void;
  onOpenShareModal: () => void;
  onOpenImportModal: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  onOpenRegisterModal,
  onOpenBackupModal,
  onOpenShareModal,
  onOpenImportModal,
}) => {
  const {
    members,
    auditLogs,
    currentRole,
    setCurrentRole,
    language,
    setLanguage,
    setPortalView,
    logout,
    t,
  } = useChurchData();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const roles: { value: UserRole; label: string; short: string; desc: string }[] = [
    {
      value: 'SUPER_ADMIN',
      label: 'Church Secretary',
      short: 'Secretary',
      desc: 'Full administrative access & management',
    },
    {
      value: 'DATA_ENTRY',
      label: 'Church Registrar',
      short: 'Registrar',
      desc: 'Direct member registration & updates',
    },
    {
      value: 'MINISTRY_LEADER',
      label: 'Ministry Leader',
      short: 'Ministry Leader',
      desc: 'Read-only departmental access',
    },
    {
      value: 'VIEWER',
      label: 'Church Member / Viewer',
      short: 'Member / Viewer',
      desc: 'Direct registration & public portal',
    },
  ];

  const navItems = [
    {
      id: 'dashboard',
      label: t('navDashboard'),
      icon: LayoutDashboard,
      badge: null,
      visible: true,
      description: 'Congregational KPIs, baptism ratio & metrics',
    },
    {
      id: 'members',
      label: t('navMembers'),
      icon: Users,
      badge: members.filter((m) => m.churchInfo.membershipStatus === 'Active').length,
      visible: true,
      description: 'Search, filter, view and edit church members',
    },
    {
      id: 'reports',
      label: t('navReports'),
      icon: FileSpreadsheet,
      badge: null,
      visible: true,
      description: 'Export PDF/Excel, filter by cell and ministry',
    },
    {
      id: 'import',
      label: t('navImport'),
      icon: UploadCloud,
      badge: null,
      visible: currentRole === 'SUPER_ADMIN' || currentRole === 'DATA_ENTRY',
      description: 'Bulk CSV member import with auto-validation',
    },
    {
      id: 'audit',
      label: t('navAudit'),
      icon: History,
      badge: auditLogs.length,
      visible: currentRole === 'SUPER_ADMIN' || currentRole === 'DATA_ENTRY',
      description: 'Law 058/2021 compliance & security trail',
    },
    {
      id: 'database',
      label: t('navDatabase'),
      icon: Database,
      badge: null,
      visible: true,
      description: 'PostgreSQL relational schema & ERD diagram',
    },
    {
      id: 'usermanual',
      label: t('navUserManual'),
      icon: BookOpen,
      badge: null,
      visible: true,
      description: 'Church staff guide & privacy policy',
    },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'import') {
      onOpenImportModal();
    } else {
      setActiveTab(id);
    }
    onClose();
  };

  return (
    <>
      {/* Semi-transparent Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 ease-in-out md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel: Slides from Left to Right */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[86vw] max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile Navigation Menu Drawer"
      >
        {/* Drawer Header with Church Brand & Close Button */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold tracking-wider text-base shadow-sm">
              N
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>NFDMS Portal</span>
                <span className="text-slate-400 font-normal">·</span>
                <span className="text-indigo-300 text-xs font-semibold">Remera</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Church of the Nazarene Kigali
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Zone */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          
          {/* Quick Action Buttons */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-1">
              Quick Actions
            </div>

            {/* Direct Member Registration */}
            <button
              onClick={() => {
                onOpenRegisterModal();
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl shadow-xs transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/50 flex items-center justify-center shrink-0">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">{t('registerMember')}</div>
                  <div className="text-[10px] text-indigo-100">
                    Add new congregant directly
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-indigo-200" />
            </button>

            {/* Share Public Member Registration Link */}
            <button
              onClick={() => {
                onOpenShareModal();
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/50 flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">Share Member Link</div>
                  <div className="text-[10px] text-emerald-100">
                    WhatsApp, SMS & Web QR link
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-200" />
            </button>

            {/* Test Congregant Self-Registration Portal */}
            <button
              onClick={() => {
                setPortalView('public_register');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-indigo-600" />
                <span>Test Member Form (Congregant View)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-1 pb-1">
              Navigation Menu
            </div>

            {navItems
              .filter((item) => item.visible)
              .map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 border border-indigo-200/80 text-indigo-950 font-semibold shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate leading-tight">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {item.description}
                        </div>
                      </div>
                    </div>

                    {item.badge !== null && (
                      <span
                        className={`text-[11px] font-mono tabular-nums px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                          isActive
                            ? 'bg-indigo-200 text-indigo-900 font-bold'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>

          {/* Role & Access Simulator */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                Active Staff Role
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => {
                const isCurrent = currentRole === r.value;
                return (
                  <button
                    key={r.value}
                    onClick={() => setCurrentRole(r.value)}
                    className={`p-2.5 rounded-lg text-left border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold ring-1 ring-amber-300'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{r.short}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {isCurrent ? 'Active Role' : 'Tap to switch'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase px-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              Language / Ururimi / Langue
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { code: 'en', label: 'English' },
                  { code: 'rw', label: 'Kinyarwanda' },
                  { code: 'fr', label: 'Français' },
                ] as { code: Language; label: string }[]
              ).map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    language === code
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Database Backup & Maintenance */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenBackupModal();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 p-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>{t('backupDb')} / {t('restoreDb')}</span>
            </button>
          </div>

          {/* Rwanda Law N° 058/2021 Regulatory Compliance Badge */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-950 leading-relaxed">
              <span className="font-bold">Rwanda Law N° 058/2021 Compliant</span>
              <p className="text-[10px] text-emerald-800 mt-0.5">
                Congregant personal data protection, audit trails, and strict role-based consent management.
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Footer with Parish Details & Lock Terminal */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <Church className="w-4 h-4 text-indigo-600 shrink-0" />
              <div className="leading-tight">
                <div className="font-bold text-slate-800">Remera Parish</div>
                <div className="text-[10px] text-slate-500">KG 178 St · Gasabo, Kigali</div>
              </div>
            </div>

            {/* Lock / Logout Button */}
            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              title="Lock database management session"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
