import React, { useState } from 'react';
import { Opportunity, OpportunityType, StudentProfile } from '../types';
import { matchOpportunityWithProfile } from '../lib/aiEngine';
import { Briefcase, ShieldCheck, ExternalLink, Calendar, MapPin, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface OpportunityDiscoveryProps {
  opportunities: Opportunity[];
  profile: StudentProfile;
}

export const OpportunityDiscovery: React.FC<OpportunityDiscoveryProps> = ({
  opportunities,
  profile
}) => {
  const [selectedType, setSelectedType] = useState<OpportunityType | 'ALL'>('ALL');
  const [activeMatchOpp, setActiveMatchOpp] = useState<Opportunity | null>(null);

  const filtered = opportunities.filter(o => {
    if (selectedType === 'ALL') return true;
    return o.type === selectedType;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-sky-600" />
            <h2 className="text-xl font-extrabold text-slate-900">Verified Opportunity Discovery & Matching</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified internships, jobs, Devpost hackathons, and Unstop coding challenges matching your skill profile.
          </p>
        </div>

        <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl text-sky-900 text-xs flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
          <span>Strict Provenance: Official Company Career Portals & Established Platforms.</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center space-x-2 text-xs font-bold">
        {['ALL', 'Internship', 'Job', 'Hackathon', 'Coding Challenge'].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t as any)}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              selectedType === t
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t === 'ALL' ? 'All Opportunities' : t}
          </button>
        ))}
      </div>

      {/* Opportunities List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((opp) => {
          const matchResult = matchOpportunityWithProfile(profile, opp);
          const isOfficial = opp.sourceType === 'OFFICIAL COMPANY SOURCE';

          return (
            <div
              key={opp.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Source Badge & Type */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                    isOfficial
                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                      : 'bg-purple-100 text-purple-800 border-purple-300'
                  }`}>
                    {opp.sourceType}
                  </span>

                  <span className="text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                    {opp.type}
                  </span>
                </div>

                {/* Organization & Role */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{opp.role}</h3>
                  <div className="text-xs font-extrabold text-blue-600 mt-0.5">{opp.organization}</div>
                </div>

                {/* Details */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Location: <strong>{opp.location}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Deadline: <strong>{opp.deadline}</strong></span>
                  </div>
                  {opp.stipendOrSalary && (
                    <div className="text-emerald-700 font-bold">💰 {opp.stipendOrSalary}</div>
                  )}
                  <div className="text-[11px] text-slate-400">Eligibility: {opp.eligibility}</div>
                  <div className="text-[10px] text-slate-400">Last Verified: {opp.lastVerifiedDate}</div>
                </div>

                {/* Required Skills */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Required Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {opp.requiredSkills.map((sk, idx) => {
                      const isMatched = matchResult.matchedSkills.includes(sk);
                      return (
                        <span
                          key={idx}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isMatched
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {sk} {isMatched ? '✓' : ''}
                        </span>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom Matching Analysis Action */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Profile Requirement Match:</span>
                  <span className="font-black text-blue-600 text-sm">{matchResult.resumeRelevanceScore}%</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveMatchOpp(opp)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center space-x-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Detailed Match Breakdown</span>
                  </button>

                  <a
                    href={opp.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1"
                  >
                    <span>Apply Official</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Opportunity Match Details Modal */}
      {activeMatchOpp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">{activeMatchOpp.role}</h3>
                <div className="text-xs text-blue-600 font-bold">{activeMatchOpp.organization}</div>
              </div>
              <button onClick={() => setActiveMatchOpp(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">
                ×
              </button>
            </div>

            {(() => {
              const res = matchOpportunityWithProfile(profile, activeMatchOpp);
              return (
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-bold text-blue-900">
                    "{res.recommendationMessage}"
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-emerald-800 flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>MATCHED SKILLS ({res.matchedSkills.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {res.matchedSkills.map((s, idx) => (
                        <span key={idx} className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-red-800 flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>SKILLS TO IMPROVE / MISSING ({res.missingSkills.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {res.missingSkills.map((s, idx) => (
                        <span key={idx} className="bg-red-100 text-red-900 font-bold px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500">
                    Disclaimer: Requirement alignment matching does not guarantee employer selection or interview calls.
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      )}

    </div>
  );
};
