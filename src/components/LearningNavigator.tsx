import React, { useState } from 'react';
import { LearningResource, Language, ResourceTrustBadge } from '../types';
import { curatedLearningResources } from '../data/learningResources';
import { BookOpen, ShieldCheck, Globe, ExternalLink, Filter, CheckCircle2, Award } from 'lucide-react';

interface LearningNavigatorProps {
  currentLanguage: Language;
  targetRole: string;
}

export const LearningNavigator: React.FC<LearningNavigatorProps> = ({
  currentLanguage,
  targetRole
}) => {
  const [selectedLangFilter, setSelectedLangFilter] = useState<Language | 'ALL'>(currentLanguage);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('ALL');

  const availableSkills = Array.from(new Set(curatedLearningResources.map(r => r.skill)));

  const filteredResources = curatedLearningResources.filter(r => {
    if (selectedLangFilter !== 'ALL' && r.language !== selectedLangFilter && r.language !== 'English') {
      return false;
    }
    if (selectedSkillFilter !== 'ALL' && r.skill !== selectedSkillFilter) {
      return false;
    }
    return true;
  });

  const getBadgeStyle = (badge: ResourceTrustBadge) => {
    switch (badge) {
      case 'OFFICIAL':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'GOVERNMENT / EDUCATIONAL':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'INDUSTRY OFFICIAL':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'VERIFIED PLATFORM':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-slate-900">Personalized Learning Navigator</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Curated trusted learning resources in Tamil, English, and Hindi matching target role: <span className="font-bold text-slate-800">{targetRole}</span>.
          </p>
        </div>

        {/* Verification Policy Disclaimer */}
        <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl text-indigo-900 text-xs flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>Strict Trust Verification: All resources carry verified educational provenance labels.</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Language Filter Buttons */}
        <div className="flex items-center space-x-2 text-xs font-bold">
          <span className="text-slate-500 mr-1 flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Language:</span>
          </span>

          <button
            onClick={() => setSelectedLangFilter('ta')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedLangFilter === 'ta'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tamil (தமிழ்)
          </button>

          <button
            onClick={() => setSelectedLangFilter('hi')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedLangFilter === 'hi'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Hindi (हिंदी)
          </button>

          <button
            onClick={() => setSelectedLangFilter('en')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedLangFilter === 'en'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            English
          </button>

          <button
            onClick={() => setSelectedLangFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedLangFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Languages
          </button>
        </div>

        {/* Skill Dropdown Filter */}
        <div className="flex items-center space-x-2 text-xs font-medium">
          <label className="text-slate-600 font-bold">Skill Gap:</label>
          <select
            value={selectedSkillFilter}
            onChange={(e) => setSelectedSkillFilter(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 font-bold text-xs focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Skill Gaps</option>
            {availableSkills.map(sk => (
              <option key={sk} value={sk}>{sk}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              
              {/* Top Row: Skill & Trust Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                  {res.skill}
                </span>

                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${getBadgeStyle(res.verificationBadge)}`}>
                  {res.verificationBadge}
                </span>
              </div>

              {/* Title & Platform */}
              <div>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug">{res.resourceName}</h3>
                <div className="text-xs font-semibold text-slate-600 mt-1">Platform: {res.platform}</div>
              </div>

              {/* Metadata */}
              <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1">
                <span>🌐 Lang: <strong className="text-slate-700">{res.language === 'ta' ? 'Tamil' : res.language === 'hi' ? 'Hindi' : 'English'}</strong></span>
                <span>📊 Level: <strong className="text-slate-700">{res.level}</strong></span>
                <span>⏱️ {res.duration}</span>
              </div>

            </div>

            {/* Bottom Link Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Source: {res.sourceType}</span>
              
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center space-x-1.5 transition-colors"
              >
                <span>Access Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
