'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { ProjectRecommender } from '@/components/ProjectRecommender';
import { useAuth } from '@/context/AuthContext';
import { calculateSkillGap, recommendProjectsForGaps } from '@/lib/aiEngine';

export default function ProjectsPage() {
  const { session } = useAuth();
  const user = session.user || { targetRole: 'Software Developer Intern', skills: [] };

  const gaps = calculateSkillGap(user as any, user.targetRole);
  const projects = recommendProjectsForGaps(gaps);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProjectRecommender projects={projects} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
