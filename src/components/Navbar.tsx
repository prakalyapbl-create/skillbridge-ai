import React from 'react';
import { Language, StudentProfile } from '../types';
import { translations } from '../data/translations';
import { Sparkles, Globe, UserCheck, Bell, Briefcase, Award } from 'lucide-react';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  profile: StudentProfile;
  onLoadDemoProfile: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  profile,
  onLoadDemoProfile,
  activeTab,
  setActiveTab,
  unreadCount,
  onOpenNotifications
}) => {
  const t = translations[currentLanguage];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">{t.appName}</span>
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase tracking-wide border border-blue-200">
                  AI Career Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          {/* Quick Actions & Language Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Load Demo Student Profile Button */}
            <button
              onClick={onLoadDemoProfile}
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold border border-emerald-200 transition-colors shadow-sm"
              title="Click to quickly populate with Arun Kumar (2nd Year B.E. CS) demo data"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t.loadDemoProfile}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <Globe className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  currentLanguage === 'ta'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                  currentLanguage === 'hi'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Active User Badge */}
            <div 
              onClick={() => setActiveTab('profile')} 
              className="flex items-center space-x-2 pl-2 border-l border-slate-200 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs border border-slate-300 group-hover:border-blue-500 transition-colors">
                {profile.name ? profile.name.slice(0, 2).toUpperCase() : 'AK'}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600">
                  {profile.name || 'Student Profile'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {profile.targetRole || 'Select Role'}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Primary Module Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-slate-100 text-xs font-semibold">
          {[
            { id: 'dashboard', label: t.navDashboard, icon: Briefcase },
            { id: 'profile', label: t.navProfile, icon: UserCheck },
            { id: 'skillgap', label: t.navSkillGap, icon: Award },
            { id: 'learn', label: t.navLearn, icon: Sparkles },
            { id: 'projects', label: t.navProjects, icon: Briefcase },
            { id: 'opportunities', label: t.navOpportunities, icon: Briefcase },
            { id: 'resume', label: t.navResume, icon: Award },
            { id: 'careerbot', label: t.navCareerBot, icon: Sparkles },
            { id: 'skillbreak', label: t.navSkillBreak, icon: Sparkles },
            { id: 'progress', label: t.navProgress, icon: Award }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

      </div>
    </header>
  );
};
