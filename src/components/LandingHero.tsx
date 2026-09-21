import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Target, BookOpen, FileText, Briefcase } from 'lucide-react';

interface LandingHeroProps {
  currentLanguage: Language;
  onGetStarted: () => void;
  onLoadDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  currentLanguage,
  onGetStarted,
  onLoadDemo
}) => {
  const t = translations[currentLanguage];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-indigo-900">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur">
          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold text-blue-300 tracking-wide uppercase">
            {t.tagline}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6 max-w-4xl mx-auto">
          "{t.landingHeadline}"
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
          {t.landingSubheading}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 group"
          >
            <span>{t.ctaBuildRoadmap}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onLoadDemo}
            className="w-full sm:w-auto px-6 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-emerald-400 font-semibold text-base rounded-xl border border-emerald-500/30 transition-all flex items-center justify-center space-x-2"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>{t.loadDemoProfile}</span>
          </button>
        </div>

        {/* Continuous Career Loop Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto text-left">
          {[
            { step: "1. PROFILE & RESUME", desc: "AI extraction without fabrication", icon: FileText, color: "text-blue-400" },
            { step: "2. SKILL GAP", desc: "GREEN / YELLOW / RED status", icon: Target, color: "text-amber-400" },
            { step: "3. TRUSTED LEARN", desc: "Tamil, English, Hindi resources", icon: BookOpen, color: "text-emerald-400" },
            { step: "4. PRACTICE PROJECTS", desc: "Student-friendly portfolio builds", icon: Sparkles, color: "text-purple-400" },
            { step: "5. MATCH & APPLY", desc: "Verified jobs & hackathons", icon: Briefcase, color: "text-sky-400" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/60 border border-slate-700/60 backdrop-blur rounded-xl p-3.5 hover:border-slate-500 transition-colors">
              <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
              <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">{item.step}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Product Story Box */}
        <div className="mt-10 max-w-3xl mx-auto bg-slate-800/40 border border-slate-700 rounded-2xl p-5 text-left text-xs sm:text-sm text-slate-300 leading-relaxed">
          <span className="font-bold text-blue-400 block mb-1 uppercase tracking-wider text-[11px]">
            The SkillBridge AI Promise
          </span>
          "We don't just show students jobs. We help them understand what those opportunities require, identify what they are missing, learn those skills through trusted resources in Tamil, English or Hindi, practice them through projects, present their real skills through a better resume, and stay updated when relevant opportunities appear."
        </div>

      </div>
    </div>
  );
};
