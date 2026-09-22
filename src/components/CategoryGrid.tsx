'use client';

import React from 'react';
import { CategoryCard } from './CategoryCard';
import { categoriesData } from '../data/categoriesData';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';

interface CategoryGridProps {
  limit?: number;
  featuredOnly?: boolean;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ limit, featuredOnly }) => {
  const { t } = useLanguage();

  const categories = limit ? categoriesData.slice(0, limit) : categoriesData;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>{t('dashboard.categoriesTitle')}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('dashboard.categoriesSubtitle')}
          </p>
        </div>
      </div>

      {/* Responsive Grid: 4 cols desktop, 2-3 cols tablet, 1-2 cols mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
};
