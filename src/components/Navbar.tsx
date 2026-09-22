'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Language, ThemeMode } from '../types';
import { Sparkles, Globe, Sun, Moon, Monitor, Bell, LogOut, User as UserIcon, Settings, UserCheck, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNotifications,
  unreadNotificationsCount = 2
}) => {
  const { session, logout, loadDemoAccount } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, isDark } = useTheme();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = session.user;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">{t('common.appName')}</span>
                <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full uppercase tracking-wide border border-blue-200 dark:border-blue-800">
                  v2.0 PRO
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {t('common.tagline')}
              </p>
            </div>
          </Link>

          {/* Controls: Language, Theme, Auth, Notifications */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Demo Profile Load */}
            <button
              onClick={loadDemoAccount}
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800 transition-colors"
              title="Click to load Arun Kumar Demo Student Profile"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t('common.loadDemoProfile')}</span>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <Globe className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
              {(['en', 'ta', 'hi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                    language === lang
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'ta' ? 'தமிழ்' : 'हिंदी'}
                </button>
              ))}
            </div>

            {/* Theme Switcher Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
            </div>

            {/* Notification Bell */}
            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            )}

            {/* User Profile Avatar / Auth */}
            {session.isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                    {user.name ? user.name.slice(0, 2).toUpperCase() : 'SK'}
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-xs font-extrabold text-slate-800 dark:text-white leading-tight">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[100px]">
                      {user.targetRole}
                    </div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50 text-xs font-semibold">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                      <div className="font-extrabold text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</div>
                    </div>
                    
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                    >
                      <UserIcon className="w-4 h-4 text-blue-600" />
                      <span>{t('navigation.profile')}</span>
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200"
                    >
                      <Settings className="w-4 h-4 text-indigo-600" />
                      <span>{t('navigation.settings')}</span>
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 border-t border-slate-100 dark:border-slate-700 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('common.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {t('common.login')}
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-sm"
                >
                  {t('common.register')}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Navigation Tabs Bar */}
        <nav className="hidden md:flex space-x-1 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-slate-100 dark:border-slate-800 text-xs font-semibold">
          {[
            { id: '/dashboard', label: t('navigation.dashboard') },
            { id: '/profile', label: t('navigation.profile') },
            { id: '/skills', label: t('navigation.skills') },
            { id: '/learning', label: t('navigation.learning') },
            { id: '/projects', label: t('navigation.projects') },
            { id: '/opportunities', label: t('navigation.opportunities') },
            { id: '/resume', label: t('navigation.resume') },
            { id: '/careerbot', label: t('navigation.careerbot') },
            { id: '/skillbreak', label: t('navigation.skillbreak') },
            { id: '/mock-tests', label: t('navigation.mockTests') },
            { id: '/progress', label: t('navigation.progress') },
            { id: '/settings', label: t('navigation.settings') }
          ].map(tab => (
            <Link
              key={tab.id}
              href={tab.id}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl transition-all text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-1 text-xs font-bold">
            {[
              { id: '/dashboard', label: t('navigation.dashboard') },
              { id: '/profile', label: t('navigation.profile') },
              { id: '/skills', label: t('navigation.skills') },
              { id: '/learning', label: t('navigation.learning') },
              { id: '/projects', label: t('navigation.projects') },
              { id: '/opportunities', label: t('navigation.opportunities') },
              { id: '/resume', label: t('navigation.resume') },
              { id: '/careerbot', label: t('navigation.careerbot') },
              { id: '/skillbreak', label: t('navigation.skillbreak') },
              { id: '/mock-tests', label: t('navigation.mockTests') },
              { id: '/progress', label: t('navigation.progress') },
              { id: '/settings', label: t('navigation.settings') }
            ].map(tab => (
              <Link
                key={tab.id}
                href={tab.id}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {tab.label}
              </Link>
            ))}
          </div>
        )}

      </div>
    </header>
  );
};
