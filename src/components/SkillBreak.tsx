import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { skillBreakQuizzes } from '../data/quizQuestions';
import { Zap, CheckCircle2, XCircle, Award, RotateCcw, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SkillBreak: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuiz = skillBreakQuizzes[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === currentQuiz.correctAnswerIndex) {
      setScore(prev => prev + 10);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIndex + 1 < skillBreakQuizzes.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back or reset
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 rounded-2xl">
            <Zap className="w-7 h-7 text-yellow-200 animate-bounce" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold">Mind Refresh — SkillBreak</h2>
            <p className="text-xs text-amber-100">
              Take a short 3-minute SkillBreak and refresh your mind with educational coding puzzles & interview quizzes.
            </p>
          </div>
        </div>

        <div className="bg-white/20 border border-white/30 px-4 py-2 rounded-xl text-center">
          <div className="text-[10px] uppercase tracking-wider text-amber-100 font-bold">Refresh Score</div>
          <div className="text-2xl font-black">{score} pts</div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Category Pill & Progress */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-800 px-3 py-1 rounded-full border border-orange-200">
            {currentQuiz.type.replace('_', ' ')}
          </span>

          <span className="text-xs font-bold text-slate-500">
            Question {currentIndex + 1} of {skillBreakQuizzes.length}
          </span>
        </div>

        {/* Question Title & Prompt */}
        <div className="space-y-2">
          <h3 className="text-lg font-black text-slate-900">{currentQuiz.title}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">{currentQuiz.prompt}</p>
        </div>

        {/* Code Snippet if applicable */}
        {currentQuiz.codeSnippet && (
          <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto shadow-inner">
            <pre>{currentQuiz.codeSnippet}</pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQuiz.options.map((optionText, idx) => {
            let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

            if (selectedOption !== null) {
              if (idx === currentQuiz.correctAnswerIndex) {
                style = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
              } else if (idx === selectedOption) {
                style = 'bg-red-100 border-red-500 text-red-900 font-bold';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${style}`}
              >
                <span>{optionText}</span>
                {selectedOption !== null && idx === currentQuiz.correctAnswerIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {selectedOption !== null && idx === selectedOption && idx !== currentQuiz.correctAnswerIndex && (
                  <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Question */}
        {showExplanation && (
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3">
            <div className="text-xs font-bold text-indigo-900 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Explanation & Key Takeaway:</span>
            </div>
            <p className="text-xs text-indigo-950 leading-relaxed">{currentQuiz.explanation}</p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Next Activity →
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
