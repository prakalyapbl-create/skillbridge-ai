'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { SkillGapAnalyzer } from '@/components/SkillGapAnalyzer';
import { useAuth } from '@/context/AuthContext';
import { calculateSkillGap } from '@/lib/aiEngine';
import { demoStudentProfile } from '@/data/demoStudent';
import { useRouter } from 'next/navigation';

export default function SkillsPage() {
  const { session, updateProfile } = useAuth();
  const router = useRouter();

  const user = session.user || {
    ...demoStudentProfile,
    id: 'usr-demo-1',
    email: 'arun.kumar@university.edu',
    learningPreference: 'Video' as const,
    notificationPreferences: {
      emailAlerts: true,
      skillReminders: true,
      deadlineAlerts: true,
      opportunityAlerts: true,
      weeklyProgress: true
    },
    onboardingCompleted: true
  };

  const gaps = calculateSkillGap(user as any, user.targetRole);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkillGapAnalyzer
            profile={user as any}
            gaps={gaps}
            onSelectRole={(roleName) => updateProfile({ targetRole: roleName })}
            onNavigateTab={(routePath) => router.push('/' + routePath)}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
