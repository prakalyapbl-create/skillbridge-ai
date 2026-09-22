'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';
import { targetRoles } from '@/data/rolesAndSkills';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Target, Award, Globe, BookOpen, Upload } from 'lucide-react';

export default function OnboardingPage() {
  const { session, completeOnboarding } = useAuth();
  const { language: currentLang, setLanguage, t } = useLanguage();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [targetRole, setTargetRole] = useState(session.user?.targetRole || 'Software Developer Intern');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'HTML', 'CSS']);
  const [newSkillText, setNewSkillText] = useState('');
  const [learningLang, setLearningLang] = useState<Language>(currentLang);
  const [learningPref, setLearningPref] = useState<'Video' | 'Reading' | 'Practice' | 'Projects'>('Video');
  const [resumeText, setResumeText] = useState('');

  const toggleSkill = (sk: string) => {
    if (selectedSkills.includes(sk)) {
      setSelectedSkills(selectedSkills.filter(s => s !== sk));
    } else {
      setSelectedSkills([...selectedSkills, sk]);
    }
  };

  const handleAddCustomSkill = () => {
    if (newSkillText.trim() && !selectedSkills.includes(newSkillText.trim())) {
      setSelectedSkills([...selectedSkills, newSkillText.trim()]);
      setNewSkillText('');
    }
  };

  const handleFinish = () => {
    setLanguage(learningLang);
    completeOnboarding({
      targetRole,
      skills: selectedSkills.map(s => ({ name: s, proficiency: 'Intermediate', category: 'Technical' })),
      preferredLanguage: learningLang,
      learningPreference: learningPref,
      resumeTextContent: resumeText
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-2xl mx-auto w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t('onboarding.title')}
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {t('onboarding.subtitle')}
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm flex items-center justify-between text-xs font-bold">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className="flex items-center space-x-1.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black ${
                step === s ? 'bg-blue-600 text-white shadow' : step > s ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
              }`}>
                {step > s ? '✓' : s}
              </div>
              <span className={`hidden sm:inline ${step === s ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-slate-400'}`}>
                Step {s}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Card Body */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-xl space-y-6">
          
          {/* STEP 1: Target Career */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <Target className="w-5 h-5" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {t('onboarding.step1Title')}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select your primary goal to calculate missing skill gaps.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {targetRoles.map(r => (
                  <button
                    key={r.roleName}
                    type="button"
                    onClick={() => setTargetRole(r.roleName)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      targetRole === r.roleName
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 text-blue-950 dark:text-blue-200 font-extrabold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold text-slate-900 dark:text-white">{r.roleName}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{r.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Current Skills */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                <Award className="w-5 h-5" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {t('onboarding.step2Title')}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select skills you have hands-on experience with.
              </p>

              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'HTML', 'CSS', 'JavaScript', 'React', 'SQL', 'Git', 'REST API', 'DSA', 'C++', 'Node.js', 'Figma', 'AWS'].map(sk => {
                  const isSel = selectedSkills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isSel
                          ? 'bg-blue-600 text-white border-blue-600 shadow'
                          : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {sk} {isSel ? '✓' : '+'}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newSkillText}
                  onChange={e => setNewSkillText(e.target.value)}
                  placeholder="Add custom skill (e.g. Docker, PyTorch)"
                  className="flex-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSkill}
                  className="px-4 py-2.5 bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs rounded-xl"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Learning Language */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
                <Globe className="w-5 h-5" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {t('onboarding.step3Title')}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI explanations and learning resources will be prioritized in your chosen language.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { code: 'en', label: 'English', native: 'English' },
                  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
                  { code: 'hi', label: 'Hindi', native: 'हिंदी' }
                ].map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLearningLang(l.code as Language)}
                    className={`p-5 rounded-2xl border text-center transition-all ${
                      learningLang === l.code
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-950 dark:text-emerald-200 font-extrabold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-base font-black">{l.native}</div>
                    <div className="text-xs text-slate-500 mt-1">{l.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Learning Preference */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                <BookOpen className="w-5 h-5" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {t('onboarding.step4Title')}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'Video', title: 'Video Tutorials', desc: 'YouTube & structured video courses' },
                  { id: 'Reading', title: 'Reading & Docs', desc: 'Official documentation & guides' },
                  { id: 'Practice', title: 'Interactive Practice', desc: 'Coding exercises & quizzes' },
                  { id: 'Projects', title: 'Portfolio Projects', desc: 'Hands-on practical application' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setLearningPref(p.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      learningPref === p.id
                        ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-600 text-purple-950 dark:text-purple-200 font-extrabold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-black">{p.title}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Resume Upload */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-400">
                <Upload className="w-5 h-5" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {t('onboarding.step5Title')}
                </h2>
              </div>

              <textarea
                rows={5}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste your current resume content here for automated AI extraction..."
                className="w-full p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono"
              />
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700/60">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow flex items-center space-x-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center space-x-2"
              >
                <span>{t('onboarding.finishCta')}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
