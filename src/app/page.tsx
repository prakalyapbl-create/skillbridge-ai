'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { CategoryGrid } from '@/components/CategoryGrid';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ArrowRight, ShieldCheck, Target, BookOpen, FileText, Briefcase, Award } from 'lucide-react';

export default function Home() {
  const { session, loadDemoAccount } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-indigo-900">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-blue-300 tracking-wide uppercase">
              {t('common.tagline')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-6 max-w-4xl mx-auto">
            "{t('common.landingHeadline')}"
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            {t('common.landingSubheading')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href={session.isAuthenticated ? "/dashboard" : "/register"}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>{t('common.ctaBuildRoadmap')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => {
                loadDemoAccount();
                router.push('/dashboard');
              }}
              className="w-full sm:w-auto px-6 py-4 bg-slate-800/80 hover:bg-slate-700/80 text-emerald-400 font-bold text-base rounded-2xl border border-emerald-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{t('common.loadDemoProfile')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-5xl mx-auto text-left">
            {[
              { step: "1. PROFILE", desc: "Skills & resume upload", icon: FileText, color: "text-blue-400" },
              { step: "2. SKILL GAP", desc: "GREEN / YELLOW / RED", icon: Target, color: "text-amber-400" },
              { step: "3. TRUSTED LEARN", desc: "Tamil, English, Hindi", icon: BookOpen, color: "text-emerald-400" },
              { step: "4. PRACTICE", desc: "Portfolio builds", icon: Sparkles, color: "text-purple-400" },
              { step: "5. MATCH & APPLY", desc: "Verified jobs & hackathons", icon: Briefcase, color: "text-sky-400" }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/60 border border-slate-700/60 backdrop-blur rounded-2xl p-3.5">
                <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
                <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">{item.step}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* VISUAL CATEGORY DISCOVERY SYSTEM (Unstop UX Inspired) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryGrid />
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-extrabold text-slate-800 dark:text-slate-200">
            {t('common.appName')} — {t('common.tagline')}
          </div>
          <div>Multilingual Support: English | Tamil (தமிழ்) | Hindi (हिंदी)</div>
        </div>
      </footer>

    </div>
  );
}
