import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProgressTimelineProps {
  currentStage: number; // 1 to 7
  onSelectStage?: (stage: number) => void;
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  currentStage,
  onSelectStage
}) => {
  const stages = [
    { id: 1, label: "PROFILE", sub: "Basic Details & Skills", module: "profile" },
    { id: 2, label: "SKILL GAP", sub: "Target Role Analysis", module: "skillgap" },
    { id: 3, label: "LEARN", sub: "Trusted Multilingual Resources", module: "learn" },
    { id: 4, label: "PRACTICE", sub: "Portfolio Mini-Projects", module: "projects" },
    { id: 5, label: "RESUME", sub: "Structure & Tailoring", module: "resume" },
    { id: 6, label: "MATCH", sub: "Opportunity Alignment", module: "opportunities" },
    { id: 7, label: "APPLY", sub: "Verified Application", module: "opportunities" }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Visual Career Readiness Flow</h3>
          <p className="text-xs text-slate-500">Continuous 7-step career development cycle</p>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          Stage {currentStage} of 7 Active
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((st) => {
          const isCompleted = st.id < currentStage;
          const isCurrent = st.id === currentStage;

          return (
            <div
              key={st.id}
              onClick={() => onSelectStage && onSelectStage(st.id)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer relative ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
                  : isCompleted
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-center mb-1.5">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <Circle className="w-4 h-4 text-white fill-white" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="text-xs font-extrabold uppercase tracking-wide">{st.label}</div>
              <div className={`text-[10px] mt-0.5 truncate ${isCurrent ? 'text-blue-100' : 'text-slate-500'}`}>
                {st.sub}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
