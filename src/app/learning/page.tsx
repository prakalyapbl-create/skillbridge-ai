'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { LearningNavigator } from '@/components/LearningNavigator';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function LearningPage() {
  const { session } = useAuth();
  const { language } = useLanguage();

  const user = session.user || { targetRole: 'Software Developer Intern' };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LearningNavigator
            currentLanguage={language}
            targetRole={user.targetRole}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
