'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryCardItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Briefcase, Building, Code2, Trophy, BookOpen, FolderGit2, Target, FileText, CheckSquare, Zap, Sparkles } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryCardItem;
}

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Building,
  Code2,
  Trophy,
  BookOpen,
  FolderGit2,
  Target,
  FileText,
  CheckSquare,
  Zap
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { t } = useLanguage();
  const IconComponent = iconMap[category.icon] || Sparkles;

  const title = t(category.titleKey);
  const description = t(category.descriptionKey);

  const badgeColors: Record<string, string> = {
    'New': 'bg-emerald-500 text-white',
    'Trending': 'bg-purple-600 text-white',
    'Recommended': 'bg-blue-600 text-white',
    'For You': 'bg-amber-500 text-white'
  };

  return (
    <Link
      href={category.route}
      className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`${title} - ${description}`}
    >
      <div>
        {/* Visual Header Image Container */}
        <div className="relative w-full h-36 bg-slate-100 dark:bg-slate-900 overflow-hidden">
          <Image
            src={category.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badge Overlay */}
          {category.badge && (
            <div className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${badgeColors[category.badge]}`}>
              {category.badge}
            </div>
          )}

          {/* Icon Circle */}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-md">
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {category.skillsExample.slice(0, 2).map((sk, idx) => (
              <span key={idx} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          {category.countLabelKey}
        </span>
        <span className="font-extrabold text-blue-600 dark:text-blue-400 flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
          <span>{t('common.explore')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};
