import React, { useState } from 'react';
import { StudentProfile, ResumeTailorAnalysis } from '../types';
import { tailorResumeForJob } from '../lib/aiEngine';
import { FileText, Bot, Sparkles, ShieldAlert, Copy, Download, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

interface ResumeStudioProps {
  profile: StudentProfile;
}

export const ResumeStudio: React.FC<ResumeStudioProps> = ({ profile }) => {
  const [activeMode, setActiveMode] = useState<'MODE_A' | 'MODE_B' | 'TAILOR'>('MODE_A');
  
  // Mode B Tutor state
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorChat, setTutorChat] = useState<{ q: string; a: string }[]>([
    {
      q: "How should I describe my project on my resume?",
      a: "Use the Action + Context + Outcome framework!\nExample:\n'Architected a RESTful API using Python FastAPI, handling JSON requests and normalized PostgreSQL queries, reducing data fetch latency by 25%.'"
    }
  ]);

  // Tailoring state
  const [customJD, setCustomJD] = useState('');
  const [tailorResult, setTailorResult] = useState<ResumeTailorAnalysis | null>(null);

  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuery.trim()) return;

    let response = "To make your resume standout without fabricating information, focus on quantifying your impact, listing technical tools used in each project header, and writing strong action verbs at the beginning of each bullet point.";
    const qLower = tutorQuery.toLowerCase();

    if (qLower.includes("project")) {
      response = "For projects: State the project title, technologies used in brackets, and 2-3 bullet points. Each bullet should start with an action verb (Built, Engineered, Designed, Optimized) and include your specific technical contribution.";
    } else if (qLower.includes("internship") || qLower.includes("experience")) {
      response = "For internship experience: List company name, role title, dates, and responsibilities. Focus on what you created, tools you utilized, and any feedback or outcome achieved during the internship.";
    } else if (qLower.includes("skill")) {
      response = "Categorize your skills into distinct sections: Languages (Python, Java), Web Technologies (HTML, React), Databases (PostgreSQL), and Tools (Git, Postman). Avoid listing skills you cannot explain in an interview.";
    } else if (qLower.includes("objective") || qLower.includes("summary")) {
      response = "Keep your summary to 2 lines max:\n'Driven 2nd-year B.E. Computer Science student seeking a Software Developer Internship. Proficient in Python, basic React, and Object-Oriented design with hands-on CLI project experience.'";
    }

    setTutorChat([...tutorChat, { q: tutorQuery, a: response }]);
    setTutorQuery('');
  };

  const handleRunTailoring = () => {
    if (!customJD.trim()) return;
    const res = tailorResumeForJob(profile, customJD);
    setTailorResult(res);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Resume Studio & AI Tutor</h2>
          <p className="text-xs text-slate-500 mt-1">
            Build structured resumes, ask the AI Tutor for writing guidance, or tailor your resume to job descriptions ethically.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveMode('MODE_A')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'MODE_A' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mode A: Build Resume
          </button>

          <button
            onClick={() => setActiveMode('MODE_B')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'MODE_B' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mode B: Resume Tutor AI
          </button>

          <button
            onClick={() => setActiveMode('TAILOR')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeMode === 'TAILOR' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Job Tailoring
          </button>
        </div>
      </div>

      {/* MODE A: Automated Structured Resume Generator */}
      {activeMode === 'MODE_A' && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6 max-w-3xl mx-auto font-sans">
          
          {/* Header */}
          <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{profile.name || 'ARUN KUMAR'}</h1>
            <p className="text-xs font-semibold text-slate-600">
              {profile.degree} ({profile.year}) | Graduation: {profile.graduationYear}
            </p>
            <p className="text-xs text-slate-500">
              Target Role: <strong className="text-slate-800">{profile.targetRole}</strong> | Location: {profile.preferredLocation}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              EDUCATION
            </h3>
            <div className="flex justify-between text-xs font-bold text-slate-900">
              <span>{profile.degree}</span>
              <span>2023 – {profile.graduationYear}</span>
            </div>
            <div className="text-xs text-slate-600">Branch: {profile.branch} | CGPA: 8.4 / 10.0</div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              TECHNICAL SKILLS
            </h3>
            <div className="text-xs text-slate-800 space-y-1">
              <div><strong>Verified Skills:</strong> {profile.skills.map(s => `${s.name} (${s.proficiency})`).join(', ')}</div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              ACADEMIC & PRACTICAL PROJECTS
            </h3>
            {profile.projects.map((proj, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{proj.title} [{proj.technologies.join(', ')}]</span>
                </div>
                <p className="text-slate-700 leading-relaxed">• {proj.description}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
              CERTIFICATIONS & ACHIEVEMENTS
            </h3>
            {profile.certifications.map((c, i) => (
              <div key={i} className="text-xs text-slate-800">
                • {c.title} — <em>{c.issuer}</em> ({c.year})
              </div>
            ))}
          </div>

        </div>
      )}

      {/* MODE B: Resume Tutor AI */}
      {activeMode === 'MODE_B' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2 text-indigo-600">
            <Bot className="w-5 h-5" />
            <h3 className="font-extrabold text-slate-900">Resume Tutor AI — Learn How to Build It Yourself</h3>
          </div>
          <p className="text-xs text-slate-500">
            Ask questions to learn proper bullet phrasing, section structure, and technical keyword organization without automatic fabrication.
          </p>

          <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200">
            {tutorChat.map((chat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="bg-blue-600 text-white p-3 rounded-xl text-xs font-semibold max-w-xl ml-auto">
                  {chat.q}
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 max-w-2xl whitespace-pre-line leading-relaxed">
                  {chat.a}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleTutorSubmit} className="flex gap-2">
            <input
              type="text"
              value={tutorQuery}
              onChange={e => setTutorQuery(e.target.value)}
              placeholder="Ask Resume Tutor (e.g. How do I write my project description?)..."
              className="flex-1 p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Ask Tutor
            </button>
          </form>
        </div>
      )}

      {/* Job Tailoring Mode */}
      {activeMode === 'TAILOR' && (
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm">Paste Opportunity Job Description (JD) for Resume Analysis</h3>
            
            <textarea
              rows={5}
              value={customJD}
              onChange={e => setCustomJD(e.target.value)}
              placeholder="Paste Software Engineer / Intern job description requirements here..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleRunTailoring}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tailor Resume to JD (Ethical Check)</span>
            </button>
          </div>

          {tailorResult && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center space-x-2 font-bold">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{tailorResult.ethicalGuardrailNotice}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                  <div className="font-bold text-emerald-900">Matching Verified Skills in JD</div>
                  <div className="flex flex-wrap gap-1">
                    {tailorResult.matchedSkills.map((s, idx) => (
                      <span key={idx} className="bg-emerald-200 text-emerald-900 font-bold px-2.5 py-1 rounded text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-xl border border-red-200 space-y-2">
                  <div className="font-bold text-red-900">Missing Relevant Skills Mentioned in JD</div>
                  <div className="flex flex-wrap gap-1">
                    {tailorResult.missingRelevantSkills.map((s, idx) => (
                      <span key={idx} className="bg-red-200 text-red-900 font-bold px-2.5 py-1 rounded text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
