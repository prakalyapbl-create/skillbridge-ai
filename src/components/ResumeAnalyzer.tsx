import React, { useState } from 'react';
import { ExtractedResumeData } from '../types';
import { FileText, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { analyzeResume } from '../lib/aiEngine';

interface ResumeAnalyzerProps {
  parsedData?: ExtractedResumeData;
  resumeText?: string;
  onUpdateParsedData: (data: ExtractedResumeData) => void;
}

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({
  parsedData,
  resumeText = '',
  onUpdateParsedData
}) => {
  const [inputText, setInputText] = useState(resumeText);
  const [analyzing, setAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    if (!inputText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      const result = analyzeResume(inputText);
      onUpdateParsedData(result);
      setAnalyzing(false);
    }, 800);
  };

  const currentData = parsedData || (resumeText ? analyzeResume(resumeText) : null);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">AI Resume Analyzer & Structure Review</h2>
            <p className="text-xs text-slate-500">
              Extract technical skills, uncover missing sections, and improve project clarity without keyword fabrication.
            </p>
          </div>
        </div>

        {/* Ethical Guardrail Disclaimer */}
        <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Strict Accuracy & Ethics Policy:</span>
            SkillBridge AI never fabricates qualifications, experience, or fake skills. All analysis is strictly based on verified user inputs.
          </div>
        </div>
      </div>

      {/* Resume Input Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          Paste or Edit Resume Content for AI Breakdown
        </label>
        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste resume text here (e.g. Education, Projects, Skills)..."
          className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleRunAnalysis}
          disabled={analyzing}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{analyzing ? 'Analyzing with AI...' : 'Run Deep Resume Analysis'}</span>
        </button>
      </div>

      {/* Analysis Output Section */}
      {currentData && (
        <div className="space-y-6">
          
          {/* Detected Skills Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Extracted Verified Skills & Categories</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-700">Technical Skills Detected</div>
                <div className="flex flex-wrap gap-1.5">
                  {currentData.technicalSkills.map((s, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md font-bold text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-700">Soft Skills & Communication</div>
                <div className="flex flex-wrap gap-1.5">
                  {currentData.softSkills.map((s, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-md font-bold text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Missing Info & Weak Project Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Missing Critical Information */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="font-extrabold text-slate-900 text-sm">Missing Information Detected</h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {currentData.missingInformation.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unclear or Weak Project Descriptions */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-indigo-600">
                <HelpCircle className="w-5 h-5" />
                <h4 className="font-extrabold text-slate-900 text-sm">Unclear / Weak Descriptions</h4>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {currentData.unclearDescriptions.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Structure Suggestions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider text-slate-500">
              Resume Structure & Formatting Recommendations
            </h4>
            <div className="space-y-2">
              {currentData.structureSuggestions.map((sug, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
