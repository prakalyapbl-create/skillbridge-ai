'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Language, ThemeMode } from '@/types';
import { Settings as SettingsIcon, Sun, Moon, Monitor, Globe, Bell, Shield, Lock, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { session, updateProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const user = session.user;

  const [notifPrefs, setNotifPrefs] = useState(user?.notificationPreferences || {
    emailAlerts: true,
    skillReminders: true,
    deadlineAlerts: true,
    opportunityAlerts: true,
    weeklyProgress: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = () => {
    updateProfile({
      preferredLanguage: language,
      notificationPreferences: notifPrefs
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* Header */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black">{t('settings.title')}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage theme preferences, multilingual selection, and notification controls.
                </p>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{t('common.save')}</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-2xl flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Settings updated successfully!</span>
            </div>
          )}

          {/* Theme Settings */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>{t('settings.themeTitle')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
              {[
                { id: 'light', label: t('settings.themeLight'), icon: Sun },
                { id: 'dark', label: t('settings.themeDark'), icon: Moon },
                { id: 'system', label: t('settings.themeSystem'), icon: Monitor }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setTheme(item.id as ThemeMode)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center space-y-2 ${
                    theme === item.id
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-900 dark:text-blue-300 font-black shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>{t('settings.languageTitle')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
              {[
                { code: 'en', title: 'English', sub: 'Standard English' },
                { code: 'ta', title: 'Tamil (தமிழ்)', sub: 'முழுமையான தமிழ் பதிப்பு' },
                { code: 'hi', title: 'Hindi (हिंदी)', sub: 'संपूर्ण हिंदी संस्करण' }
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code as Language)}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    language === l.code
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-900 dark:text-emerald-300 font-black shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="text-sm">{l.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{l.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Bell className="w-4 h-4 text-blue-500" />
              <span>{t('settings.notificationsTitle')}</span>
            </h2>

            <div className="space-y-3 text-xs font-semibold">
              {[
                { key: 'emailAlerts', label: 'Email Opportunity Alerts', desc: 'Receive new internship and hackathon matches in your inbox' },
                { key: 'skillReminders', label: 'Skill Gap Reminders', desc: 'Weekly reminders for recommended skill roadmap topics' },
                { key: 'deadlineAlerts', label: 'Application Deadline Warnings', desc: 'Alerts 3 days before saved opportunity deadlines' }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="text-slate-900 dark:text-white font-bold">{item.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={(notifPrefs as any)[item.key]}
                    onChange={e => setNotifPrefs({ ...notifPrefs, [item.key]: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
