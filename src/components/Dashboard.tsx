import React from 'react';
import { StudentProfile, SkillGapItem, Opportunity, Language, LearningRoadmapWeek } from '../types';
import { translations } from '../data/translations';
import { ProgressTimeline } from './ProgressTimeline';
import {
  Target,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface DashboardProps {
  profile: StudentProfile;
  gaps: SkillGapItem[];
  roadmap: LearningRoadmapWeek[];
  opportunities: Opportunity[];
  currentLanguage: Language;
  onNavigateTab: (tab: string) => void;
  onLoadDemo: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  gaps,
  roadmap,
  opportunities,
  currentLanguage,
  onNavigateTab,
  onLoadDemo
}) => {
  const t = translations[currentLanguage];

  // Calculate readiness score
  const totalGaps = gaps.length || 1;
  const greenGaps = gaps.filter(g => g.category === 'GREEN').length;
  const yellowGaps = gaps.filter(g => g.category === 'YELLOW').length;

  const score = Math.min(100, Math.round(((greenGaps * 1.0 + yellowGaps * 0.5) / totalGaps) * 100));

  const completedWeeks = roadmap.filter(r => r.status === 'Completed').length;
  const totalWeeks = roadmap.length || 1;
  const learningPercent = Math.round((completedWeeks / totalWeeks) * 100);

  return (
    <div className="space-y-6">
      
      {/* Visual Career Timeline Bar */}
      <ProgressTimeline 
        currentStage={score > 80 ? 5 : score > 50 ? 3 : 2} 
        onSelectStage={(stage) => {
          const map = ['profile', 'skillgap', 'learn', 'projects', 'resume', 'opportunities', 'opportunities'];
          onNavigateTab(map[stage - 1]);
        }} 
      />

      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold text-blue-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>{profile.degree || 'B.E. Computer Science'} — {profile.year || '2nd Year'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {profile.name || 'Student'}!
            </h2>
            <p className="text-sm text-blue-100 mt-1 max-w-xl">
              Target Goal: <span className="font-bold text-white underline">{profile.targetRole}</span> ({profile.preferredLocation})
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-xl text-center min-w-[160px]">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">Readiness Score</div>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">{score}%</div>
            <div className="text-[11px] text-emerald-300 font-medium mt-0.5">
              {score > 70 ? 'High Readiness' : score > 40 ? 'Moderate Preparation' : 'Requires Learning'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Target Career Goal */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <button onClick={() => onNavigateTab('profile')} className="text-xs text-blue-600 font-bold hover:underline">
              Edit
            </button>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.careerGoal}</div>
          <div className="text-base font-extrabold text-slate-900 mt-1">{profile.targetRole}</div>
          <div className="text-xs text-slate-500 mt-1">
            Pref. Lang: <span className="font-bold text-slate-700">{profile.preferredLanguage.toUpperCase()}</span>
          </div>
        </div>

        {/* Card 2: Skill Readiness */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <button onClick={() => onNavigateTab('skillgap')} className="text-xs text-emerald-600 font-bold hover:underline">
              View Gaps
            </button>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.currentSkills}</div>
          <div className="text-base font-extrabold text-slate-900 mt-1">
            {profile.skills.length} Skills Listed
          </div>
          <div className="flex items-center space-x-2 text-xs mt-1">
            <span className="text-emerald-600 font-bold">{greenGaps} Green</span>
            <span className="text-amber-600 font-bold">{yellowGaps} Yellow</span>
            <span className="text-red-600 font-bold">{gaps.filter(g => g.category === 'RED').length} Red</span>
          </div>
        </div>

        {/* Card 3: Learning Roadmap Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <button onClick={() => onNavigateTab('progress')} className="text-xs text-indigo-600 font-bold hover:underline">
              Roadmap
            </button>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.learningProgress}</div>
          <div className="text-base font-extrabold text-slate-900 mt-1">
            {completedWeeks} of {totalWeeks} Weeks Done
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-600 h-full transition-all" style={{ width: `${learningPercent}%` }} />
          </div>
        </div>

        {/* Card 4: Matched Opportunities */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <button onClick={() => onNavigateTab('opportunities')} className="text-xs text-sky-600 font-bold hover:underline">
              Explore
            </button>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.matchedOpportunities}</div>
          <div className="text-base font-extrabold text-slate-900 mt-1">
            {opportunities.length} Verified Roles
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Official & Devpost / Unstop
          </div>
        </div>

      </div>

      {/* Two Column Section: Top Skill Gaps & Matched Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Skill Gaps Column */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-slate-900">{t.skillGaps}</h3>
            </div>
            <button
              onClick={() => onNavigateTab('skillgap')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>Analyze All ({gaps.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {gaps.slice(0, 4).map((gap, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900">{gap.skillName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      gap.category === 'GREEN'
                        ? 'bg-emerald-100 text-emerald-800'
                        : gap.category === 'YELLOW'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {gap.userStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{gap.whyItMatters}</p>
                </div>
                <button
                  onClick={() => onNavigateTab('learn')}
                  className="px-3 py-1 bg-white hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-lg border border-slate-200 shadow-sm whitespace-nowrap"
                >
                  Learn
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Matched Opportunities Column */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-slate-900">Recommended Opportunities</h3>
            </div>
            <button
              onClick={() => onNavigateTab('opportunities')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {opportunities.slice(0, 3).map((opp) => (
              <div key={opp.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900">{opp.organization}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      opp.sourceType === 'OFFICIAL COMPANY SOURCE' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {opp.sourceType === 'OFFICIAL COMPANY SOURCE' ? 'OFFICIAL' : 'PLATFORM'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">{opp.role}</div>
                  <div className="text-xs text-slate-500 mt-1 flex items-center space-x-3">
                    <span>📍 {opp.location}</span>
                    <span>⏳ Deadline: {opp.deadline}</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('opportunities')}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm whitespace-nowrap"
                >
                  Match
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Mind Refresh SkillBreak Teaser Card */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-2xl p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Zap className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h4 className="font-black text-lg">{t.takeBreakTitle}</h4>
            <p className="text-xs text-amber-100">{t.takeBreakSubtitle}</p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('skillbreak')}
          className="w-full sm:w-auto px-5 py-2.5 bg-white text-orange-600 font-extrabold text-xs rounded-xl shadow hover:bg-amber-50 transition-colors whitespace-nowrap"
        >
          {t.startQuiz}
        </button>
      </div>

    </div>
  );
};
