'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navbar } from '@/components/Navbar';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProgressTimeline } from '@/components/ProgressTimeline';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { calculateSkillGap, generateWeeklyRoadmap } from '@/lib/aiEngine';
import { verifiedOpportunities } from '@/data/opportunities';
import { Target, Award, BookOpen, Briefcase, Sparkles, CheckCircle2, Clock, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { session } = useAuth();
  const { language, t } = useLanguage();

  const user = session.user || {
    name: 'Arun Kumar',
    targetRole: 'Software Developer Intern',
    degree: 'B.E. CS 2nd Year',
    preferredLanguage: 'ta',
    skills: []
  };

  const gaps = calculateSkillGap(user as any, user.targetRole);
  const roadmap = generateWeeklyRoadmap(gaps);

  const greenCount = gaps.filter(g => g.category === 'GREEN').length;
  const totalGaps = gaps.length || 1;
  const score = Math.round((greenCount / totalGaps) * 100);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Visual Career Timeline Flow */}
          <ProgressTimeline currentStage={score > 70 ? 5 : score > 40 ? 3 : 2} />

          {/* Hero Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>{user.degree || 'B.E. CS'}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black">
                  {t('dashboard.greeting')}, {user.name}! 👋
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
                  {t('navigation.profile')}: <strong className="text-white underline">{user.targetRole}</strong> ({user.preferredLanguage.toUpperCase()})
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/20 p-5 rounded-2xl text-center min-w-[180px]">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-200">{t('common.readinessScore')}</div>
                <div className="text-4xl font-black text-white mt-1">{score}%</div>
                <div className="text-xs text-emerald-300 font-bold mt-1">
                  {score > 70 ? 'High Readiness' : score > 40 ? 'Moderate Prep' : 'Requires Learning'}
                </div>
              </div>
            </div>
          </div>

          {/* Today's Actions Section */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {t('dashboard.todayActions')}
                </h2>
              </div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full">
                4 Tasks Pending
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-medium">
              {[
                { title: t('dashboard.action1'), type: 'Learning', route: '/learning' },
                { title: t('dashboard.action2'), type: 'Resume', route: '/resume' },
                { title: t('dashboard.action3'), type: 'Practice', route: '/projects' },
                { title: t('dashboard.action4'), type: 'Opportunity', route: '/opportunities' }
              ].map((act, i) => (
                <Link
                  key={i}
                  href={act.route}
                  className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-800 dark:text-slate-200 font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {act.title}
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">
                    {act.type} →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* VISUAL CATEGORY DISCOVERY SYSTEM (Unstop-Inspired Visual Cards) */}
          <CategoryGrid />

          {/* Two-Column Section: Top Skill Gaps & Matched Opportunities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Skill Gaps */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Top Identified Skill Gaps</h3>
                </div>
                <Link href="/skills" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  View All ({gaps.length})
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                {gaps.slice(0, 4).map((g, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-slate-900 dark:text-white">{g.skillName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{g.whyItMatters}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      g.category === 'GREEN' ? 'bg-emerald-100 text-emerald-800' :
                      g.category === 'YELLOW' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {g.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Matched Opportunities */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Matched Opportunities</h3>
                </div>
                <Link href="/opportunities" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  Explore All
                </Link>
              </div>

              <div className="space-y-3 text-xs">
                {verifiedOpportunities.slice(0, 3).map((opp) => (
                  <div key={opp.id} className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-slate-900 dark:text-white">{opp.role}</div>
                      <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-0.5">{opp.organization}</div>
                    </div>
                    <Link
                      href="/opportunities"
                      className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow"
                    >
                      Match
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
