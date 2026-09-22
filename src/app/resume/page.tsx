'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { ResumeAnalyzer } from '@/components/ResumeAnalyzer';
import { ResumeStudio } from '@/components/ResumeStudio';
import { useAuth } from '@/context/AuthContext';
import { demoStudentProfile } from '@/data/demoStudent';

export default function ResumePage() {
  const { session, updateProfile } = useAuth();
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <ResumeAnalyzer
            parsedData={user.resumeParsedData}
            resumeText={user.resumeTextContent}
            onUpdateParsedData={(data) => updateProfile({ resumeParsedData: data })}
          />
          <ResumeStudio profile={user as any} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
