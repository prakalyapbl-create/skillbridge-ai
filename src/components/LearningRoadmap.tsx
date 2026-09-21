import React from 'react';
import { LearningRoadmapWeek, RoadmapStatus } from '../types';
import { Calendar, CheckCircle2, Clock, PlayCircle, BookOpen, ArrowRight } from 'lucide-react';

interface LearningRoadmapProps {
  roadmap: LearningRoadmapWeek[];
  onUpdateStatus: (weekId: string, newStatus: RoadmapStatus) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({
  roadmap,
  onUpdateStatus
}) => {
  const getStatusStyle = (status: RoadmapStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Learning':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Practicing':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-300';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-extrabold text-slate-900">Customized Weekly Learning Roadmap</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Step-by-step weekly milestone targets mapped to your target career role skill gaps.
          </p>
        </div>

        <div className="text-xs font-bold bg-blue-50 text-blue-800 px-4 py-2 rounded-xl border border-blue-200">
          Total Duration: <span className="font-extrabold text-blue-900">{roadmap.length} Weeks</span>
        </div>
      </div>

      {/* Weekly Schedule Timeline Cards */}
      <div className="space-y-4">
        {roadmap.map((week) => (
          <div
            key={week.id}
            className={`p-6 rounded-2xl border transition-all bg-white shadow-sm hover:shadow-md ${
              week.status === 'Completed' ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-extrabold bg-blue-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    WEEK {week.weekNumber}
                  </span>
                  <span className="text-base font-extrabold text-slate-900">{week.title}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Focus Skill: <strong className="text-slate-800">{week.skillName}</strong> • Est. Hours: <strong className="text-slate-800">{week.estimatedHours} hrs</strong>
                </div>
              </div>

              {/* Status Selector dropdown */}
              <div className="flex items-center space-x-2">
                <label className="text-xs font-bold text-slate-600">Status:</label>
                <select
                  value={week.status}
                  onChange={(e) => onUpdateStatus(week.id, e.target.value as RoadmapStatus)}
                  className={`p-2 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-blue-500 ${getStatusStyle(week.status)}`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Learning">Learning</option>
                  <option value="Practicing">Practicing</option>
                  <option value="Completed">Completed ✅</option>
                </select>
              </div>
            </div>

            {/* Topics List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weekly Learning Topics & Action Items:</div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {week.topics.map((topic, i) => (
                  <li key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2 text-slate-700">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
