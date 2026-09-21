'use client';

import React, { useState } from 'react';
import { StudentProfile, Language, SkillGapItem, LearningRoadmapWeek, RoadmapStatus, AppNotification, ExtractedResumeData } from '@/types';
import { demoStudentProfile } from '@/data/demoStudent';
import { verifiedOpportunities } from '@/data/opportunities';
import { calculateSkillGap, generateWeeklyRoadmap, recommendProjectsForGaps } from '@/lib/aiEngine';
import { Navbar } from '@/components/Navbar';
import { LandingHero } from '@/components/LandingHero';
import { Dashboard } from '@/components/Dashboard';
import { ProfileModule } from '@/components/ProfileModule';
import { ResumeAnalyzer } from '@/components/ResumeAnalyzer';
import { SkillGapAnalyzer } from '@/components/SkillGapAnalyzer';
import { LearningNavigator } from '@/components/LearningNavigator';
import { LearningRoadmap } from '@/components/LearningRoadmap';
import { ProjectRecommender } from '@/components/ProjectRecommender';
import { ResumeStudio } from '@/components/ResumeStudio';
import { OpportunityDiscovery } from '@/components/OpportunityDiscovery';
import { CareerBot } from '@/components/CareerBot';
import { SkillBreak } from '@/components/SkillBreak';
import { NotificationCenter } from '@/components/NotificationCenter';

export default function Home() {
  const [profile, setProfile] = useState<StudentProfile>(demoStudentProfile);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(demoStudentProfile.preferredLanguage);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showLanding, setShowLanding] = useState<boolean>(true);

  // Skill Gap State
  const [gaps, setGaps] = useState<SkillGapItem[]>(() => calculateSkillGap(demoStudentProfile, demoStudentProfile.targetRole));
  const [roadmap, setRoadmap] = useState<LearningRoadmapWeek[]>(() => generateWeeklyRoadmap(calculateSkillGap(demoStudentProfile, demoStudentProfile.targetRole)));
  const [projects, setProjects] = useState(() => recommendProjectsForGaps(calculateSkillGap(demoStudentProfile, demoStudentProfile.targetRole)));

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'New Software Engineering Internship Found',
      message: 'Zoho Corporation has opened Software Development Engineer Intern applications. Your profile matches several requirements. Strengthening SQL & Data Structures will boost your readiness.',
      timestamp: '10 mins ago',
      type: 'job_match',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Devpost Hackathon Deadline Approaching',
      message: 'Global AI Challenge on Devpost closes in 15 days. Your Python and REST API profile skills match eligibility.',
      timestamp: '2 hours ago',
      type: 'deadline',
      read: false
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Handlers
  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    setProfile(prev => ({ ...prev, preferredLanguage: lang }));
  };

  const handleLoadDemo = () => {
    setProfile(demoStudentProfile);
    setCurrentLanguage(demoStudentProfile.preferredLanguage);
    const newGaps = calculateSkillGap(demoStudentProfile, demoStudentProfile.targetRole);
    setGaps(newGaps);
    setRoadmap(generateWeeklyRoadmap(newGaps));
    setProjects(recommendProjectsForGaps(newGaps));
    setShowLanding(false);
    setActiveTab('dashboard');
  };

  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    const newGaps = calculateSkillGap(updatedProfile, updatedProfile.targetRole);
    setGaps(newGaps);
    setRoadmap(generateWeeklyRoadmap(newGaps));
    setProjects(recommendProjectsForGaps(newGaps));
  };

  const handleSelectRole = (roleName: string) => {
    const updated = { ...profile, targetRole: roleName };
    setProfile(updated);
    const newGaps = calculateSkillGap(updated, roleName);
    setGaps(newGaps);
    setRoadmap(generateWeeklyRoadmap(newGaps));
    setProjects(recommendProjectsForGaps(newGaps));
  };

  const handleUpdateRoadmapStatus = (weekId: string, newStatus: RoadmapStatus) => {
    const updated = roadmap.map(w => w.id === weekId ? { ...w, status: newStatus } : w);
    setRoadmap(updated);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleUpdateParsedResume = (data: ExtractedResumeData) => {
    setProfile(prev => ({ ...prev, resumeParsedData: data }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        profile={profile}
        onLoadDemoProfile={handleLoadDemo}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setShowLanding(false);
        }}
        unreadCount={unreadCount}
        onOpenNotifications={() => setShowNotifications(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        
        {/* Landing Hero Section (shown on initial entry or when toggled) */}
        {showLanding && (
          <LandingHero
            currentLanguage={currentLanguage}
            onGetStarted={() => {
              setShowLanding(false);
              setActiveTab('dashboard');
            }}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {/* Tab Views */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {activeTab === 'dashboard' && (
            <Dashboard
              profile={profile}
              gaps={gaps}
              roadmap={roadmap}
              opportunities={verifiedOpportunities}
              currentLanguage={currentLanguage}
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setShowLanding(false);
              }}
              onLoadDemo={handleLoadDemo}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileModule
              profile={profile}
              onSaveProfile={handleUpdateProfile}
              onLoadDemo={handleLoadDemo}
              onAnalyzeResumeText={(text) => {
                setActiveTab('resume');
              }}
            />
          )}

          {activeTab === 'skillgap' && (
            <SkillGapAnalyzer
              profile={profile}
              gaps={gaps}
              onSelectRole={handleSelectRole}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'learn' && (
            <LearningNavigator
              currentLanguage={currentLanguage}
              targetRole={profile.targetRole}
            />
          )}

          {activeTab === 'progress' && (
            <LearningRoadmap
              roadmap={roadmap}
              onUpdateStatus={handleUpdateRoadmapStatus}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectRecommender
              projects={projects}
            />
          )}

          {activeTab === 'resume' && (
            <div className="space-y-10">
              <ResumeAnalyzer
                parsedData={profile.resumeParsedData}
                resumeText={profile.resumeTextContent}
                onUpdateParsedData={handleUpdateParsedResume}
              />
              <ResumeStudio
                profile={profile}
              />
            </div>
          )}

          {activeTab === 'opportunities' && (
            <OpportunityDiscovery
              opportunities={verifiedOpportunities}
              profile={profile}
            />
          )}

          {activeTab === 'careerbot' && (
            <CareerBot
              profile={profile}
              currentLanguage={currentLanguage}
            />
          )}

          {activeTab === 'skillbreak' && (
            <SkillBreak />
          )}

        </div>

      </main>

      {/* Opportunity Notification Center Sidebar */}
      {showNotifications && (
        <NotificationCenter
          notifications={notifications}
          onMarkRead={handleMarkNotificationRead}
          onClose={() => setShowNotifications(false)}
          onNavigateTab={setActiveTab}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-bold text-slate-700">SkillBridge AI — From Skill Gaps to Career Opportunities.</div>
          <div>Multilingual Support: English | Tamil (தமிழ்) | Hindi (हिंदी)</div>
        </div>
      </footer>

    </div>
  );
}
