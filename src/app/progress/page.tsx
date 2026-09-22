'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { LearningRoadmap } from '@/components/LearningRoadmap';
import { useAuth } from '@/context/AuthContext';
import { calculateSkillGap, generateWeeklyRoadmap } from '@/lib/aiEngine';
import { RoadmapStatus } from '@/types';

export default function ProgressPage() {
  const { session } = useAuth();
  const user = session.user || { targetRole: 'Software Developer Intern', skills: [] };

  const gaps = calculateSkillGap(user as any, user.targetRole);
  const [roadmap, setRoadmap] = useState(() => generateWeeklyRoadmap(gaps));

  const handleUpdateStatus = (weekId: string, status: RoadmapStatus) => {
    setRoadmap(roadmap.map(w => w.id === weekId ? { ...w, status } : w));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LearningRoadmap
            roadmap={roadmap}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
