'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { ProfileModule } from '@/components/ProfileModule';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { session, updateProfile, loadDemoAccount } = useAuth();
  const router = useRouter();

  const user = session.user || {
    name: 'Arun Kumar',
    degree: 'B.E. Computer Science',
    branch: 'Computer Science',
    year: '2nd Year',
    graduationYear: '2027',
    skills: [],
    projects: [],
    certifications: [],
    internships: [],
    interests: [],
    targetRole: 'Software Developer Intern',
    preferredLocation: 'Chennai / Hybrid',
    preferredOpportunityType: 'Internship' as any,
    preferredLanguage: 'ta' as any
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProfileModule
            profile={user as any}
            onSaveProfile={(updated) => updateProfile(updated)}
            onLoadDemo={loadDemoAccount}
            onAnalyzeResumeText={() => router.push('/resume')}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
