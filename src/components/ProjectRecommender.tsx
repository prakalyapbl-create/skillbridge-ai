import React from 'react';
import { RecommendedProject } from '../types';
import { Briefcase, Code, Sparkles, FileCheck, Layers, Award } from 'lucide-react';

interface ProjectRecommenderProps {
  projects: RecommendedProject[];
}

export const ProjectRecommender: React.FC<ProjectRecommenderProps> = ({ projects }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Practical Project Recommender</h2>
            <p className="text-xs text-slate-500">
              Build realistic student projects specifically tailored to bridge your target skill gaps and boost resume credibility.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Cards List */}
      <div className="space-y-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            
            {/* Title & Target Skill */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2.5 py-0.5 rounded border border-purple-100">
                  Skill Gap: {proj.targetSkill}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">{proj.title}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded-full border border-slate-200">
                  Level: {proj.difficulty}
                </span>
              </div>
            </div>

            {/* Objective & Tech Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800 uppercase text-[10px]">Project Objective</div>
                <p className="text-slate-600 leading-relaxed">{proj.objective}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800 uppercase text-[10px]">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies.map((t, i) => (
                    <span key={i} className="bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Expected Learning Outcomes */}
            <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
              <div className="font-bold uppercase text-[10px] text-indigo-700 flex items-center space-x-1">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>Expected Learning Takeaways</span>
              </div>
              <p>{proj.expectedLearning}</p>
            </div>

            {/* Resume Bullet Guidance */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1.5">
              <div className="font-bold text-emerald-800 uppercase text-[10px] flex items-center space-x-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>How to describe this project on your resume:</span>
              </div>
              <div className="font-mono text-slate-800 bg-white p-2.5 rounded-lg border border-emerald-200 text-[11px] leading-relaxed">
                "{proj.resumeDescriptionGuidance}"
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
