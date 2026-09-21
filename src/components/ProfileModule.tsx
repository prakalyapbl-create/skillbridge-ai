import React, { useState } from 'react';
import { StudentProfile, UserSkill, Language } from '../types';
import { targetRoles } from '../data/rolesAndSkills';
import { User, Briefcase, GraduationCap, MapPin, Languages as LangIcon, Upload, Plus, Trash2, CheckCircle, Sparkles } from 'lucide-react';

interface ProfileModuleProps {
  profile: StudentProfile;
  onSaveProfile: (updatedProfile: StudentProfile) => void;
  onLoadDemo: () => void;
  onAnalyzeResumeText: (text: string) => void;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({
  profile,
  onSaveProfile,
  onLoadDemo,
  onAnalyzeResumeText
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProf, setNewSkillProf] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [resumeTextInput, setResumeTextInput] = useState(formData.resumeTextContent || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: UserSkill = {
      name: newSkillName.trim(),
      proficiency: newSkillProf,
      category: 'Technical'
    };
    setFormData({
      ...formData,
      skills: [...formData.skills, newSkill]
    });
    setNewSkillName('');
  };

  const handleRemoveSkill = (index: number) => {
    const updated = [...formData.skills];
    updated.splice(index, 1);
    setFormData({ ...formData, skills: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResumeTextSubmit = () => {
    if (resumeTextInput.trim()) {
      onAnalyzeResumeText(resumeTextInput);
      setFormData({
        ...formData,
        resumeTextContent: resumeTextInput
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Student Profile & Preferences</h2>
          <p className="text-xs text-slate-500">
            Keep your profile updated for accurate skill gap analysis and opportunity matching.
          </p>
        </div>
        <button
          type="button"
          onClick={onLoadDemo}
          className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Load Arun Kumar Demo</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Profile saved successfully! Skill gap analysis and roadmaps updated.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Academic Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            1. Academic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Arun Kumar"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Degree Program</label>
              <input
                type="text"
                value={formData.degree}
                onChange={e => setFormData({ ...formData, degree: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. B.E. Computer Science & Engineering"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Branch / Specialization</label>
              <input
                type="text"
                value={formData.branch}
                onChange={e => setFormData({ ...formData, branch: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Computer Science"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Current Year</label>
                <select
                  value={formData.year}
                  onChange={e => setFormData({ ...formData, year: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Passed Out">Passed Out</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Graduation Year</label>
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={e => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="2027"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Target Career & Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            2. Target Role & Career Preferences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            
            <div>
              <label className="block text-slate-700 font-bold mb-1">Target Career Role</label>
              <select
                value={formData.targetRole}
                onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
              >
                {targetRoles.map((r) => (
                  <option key={r.roleName} value={r.roleName}>
                    {r.roleName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Preferred Language for AI & Learning</label>
              <select
                value={formData.preferredLanguage}
                onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value as Language })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 font-bold text-blue-600"
              >
                <option value="en">English</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="hi">Hindi (हिंदी)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Preferred Work Location</label>
              <input
                type="text"
                value={formData.preferredLocation}
                onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Chennai / Remote / Hybrid"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Opportunity Type</label>
              <select
                value={formData.preferredOpportunityType}
                onChange={e => setFormData({ ...formData, preferredOpportunityType: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Internship">Internship Only</option>
                <option value="Full-time">Full-time Job Only</option>
                <option value="Both">Both Internships & Full-time Jobs</option>
              </select>
            </div>

          </div>
        </div>

        {/* Current Skills & Proficiency */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            3. Current Verified Skills
          </h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newSkillName}
              onChange={e => setNewSkillName(e.target.value)}
              placeholder="Add skill (e.g. React, SQL, Git)"
              className="flex-1 p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newSkillProf}
              onChange={e => setNewSkillProf(e.target.value as any)}
              className="p-2.5 rounded-lg border border-slate-300 text-xs font-bold"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800">
                <span>{skill.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  skill.proficiency === 'Advanced' ? 'bg-emerald-100 text-emerald-800' :
                  skill.proficiency === 'Intermediate' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {skill.proficiency}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-slate-400 hover:text-red-500 ml-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Text Input / Upload */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2">
            4. Upload / Paste Resume Text
          </h3>

          <textarea
            rows={5}
            value={resumeTextInput}
            onChange={e => setResumeTextInput(e.target.value)}
            placeholder="Paste your current resume content here for instant AI Skill Extraction..."
            className="w-full p-3 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={handleResumeTextSubmit}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-lg border border-indigo-200 hover:bg-indigo-100 flex items-center space-x-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Extract & Analyze Resume Text</span>
          </button>
        </div>

        {/* Submit Form */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
          >
            Save Profile & Update Skill Gap Analysis
          </button>
        </div>

      </form>
    </div>
  );
};
