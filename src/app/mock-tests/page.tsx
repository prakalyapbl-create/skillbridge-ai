'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { SkillBreak } from '@/components/SkillBreak';
import { useLanguage } from '@/context/LanguageContext';
import { CheckSquare, Sparkles } from 'lucide-react';

export default function MockTestsPage() {
  const { t } = useLanguage();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black">{t('categories.mockTests.title')}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('categories.mockTests.desc')}
                </p>
              </div>
            </div>
          </div>

          <SkillBreak />
        </div>
      </div>
    </ProtectedRoute>
  );
}
