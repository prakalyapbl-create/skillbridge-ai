import React, { useState } from 'react';
import { StudentProfile, SkillGapItem, SkillGapStatus } from '../types';
import { targetRoles } from '../data/rolesAndSkills';
import { Target, CheckCircle2, AlertTriangle, XCircle, ArrowRight, BookOpen, Briefcase, Sparkles } from 'lucide-react';

interface SkillGapAnalyzerProps {
  profile: StudentProfile;
  gaps: SkillGapItem[];
  onSelectRole: (roleName: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const SkillGapAnalyzer: React.FC<SkillGapAnalyzerProps> = ({
  profile,
  gaps,
  onSelectRole,
  onNavigateTab
}) => {
  const [filterCategory, setFilterCategory] = useState<'ALL' | SkillGapStatus>('ALL');

  const filteredGaps = gaps.filter(g => {
    if (filterCategory === 'ALL') return true;
    return g.category === filterCategory;
  });

  const greenCount = gaps.filter(g => g.category === 'GREEN').length;
  const yellowCount = gaps.filter(g => g.category === 'YELLOW').length;
  const redCount = gaps.filter(g => g.category === 'RED').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Target Role Header Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-extrabold text-slate-900">Skill Gap Analyzer</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comparing profile verified skills against target industry role requirements.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-700 whitespace-nowrap">Target Role:</label>
          <select
            value={profile.targetRole}
            onChange={(e) => onSelectRole(e.target.value)}
            className="w-full md:w-64 p-2.5 rounded-xl border border-slate-300 font-bold text-xs text-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            {targetRoles.map((r) => (
              <option key={r.roleName} value={r.roleName}>
                {r.roleName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Tabs & Metrics Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        
        <div className="flex items-center space-x-2 text-xs font-bold">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filterCategory === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Skills ({gaps.length})
          </button>

          <button
            onClick={() => setFilterCategory('GREEN')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1 ${
              filterCategory === 'GREEN'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>GREEN (Strong - {greenCount})</span>
          </button>

          <button
            onClick={() => setFilterCategory('YELLOW')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1 ${
              filterCategory === 'YELLOW'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>YELLOW (Improve - {yellowCount})</span>
          </button>

          <button
            onClick={() => setFilterCategory('RED')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1 ${
              filterCategory === 'RED'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>RED (Missing - {redCount})</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Role Match: <span className="font-extrabold text-slate-900">{Math.round((greenCount / (gaps.length || 1)) * 100)}%</span>
        </div>
      </div>

      {/* Detailed Skill Cards List */}
      <div className="space-y-4">
        {filteredGaps.map((gap, index) => {
          const isGreen = gap.category === 'GREEN';
          const isYellow = gap.category === 'YELLOW';

          return (
            <div
              key={index}
              className={`p-6 rounded-2xl border transition-all bg-white shadow-sm hover:shadow-md ${
                isGreen
                  ? 'border-emerald-200'
                  : isYellow
                  ? 'border-amber-200'
                  : 'border-red-200'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-black text-slate-900">{gap.skillName}</span>
                    
                    {/* Category Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide flex items-center space-x-1 ${
                      isGreen
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : isYellow
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                      {isGreen ? <CheckCircle2 className="w-3.5 h-3.5" /> : isYellow ? <AlertTriangle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{gap.category} — {gap.userStatus}</span>
                    </span>
                  </div>
                  
                  <div className="text-xs text-slate-500 mt-1">
                    Importance: <span className="font-bold text-slate-700">{gap.importance}</span>
                  </div>
                </div>

                {/* Quick Action Button */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onNavigateTab('learn')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Find Resources</span>
                  </button>

                  <button
                    onClick={() => onNavigateTab('projects')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center space-x-1.5"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>View Project</span>
                  </button>
                </div>
              </div>

              {/* Skill Gap Detail Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                {/* Why It Matters */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">Why It Matters</div>
                  <p className="text-slate-600 leading-relaxed">{gap.whyItMatters}</p>
                </div>

                {/* Recommended Learning Path */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">Recommended Path</div>
                  <p className="text-slate-600 leading-relaxed">{gap.recommendedPath}</p>
                </div>

                {/* Suggested Project / Practice */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">Suggested Practice</div>
                  <p className="text-slate-600 leading-relaxed">{gap.suggestedProject}</p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
