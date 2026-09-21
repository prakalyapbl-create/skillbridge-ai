import React, { useState } from 'react';
import { StudentProfile, Language, ChatMessage } from '../types';
import { generateCareerBotResponse } from '../lib/aiEngine';
import { Bot, Send, Sparkles, User, Globe } from 'lucide-react';

interface CareerBotProps {
  profile: StudentProfile;
  currentLanguage: Language;
}

export const CareerBot: React.FC<CareerBotProps> = ({ profile, currentLanguage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: generateCareerBotResponse('hello', profile, currentLanguage),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLanguage
    }
  ]);
  const [input, setInput] = useState('');

  const samplePrompts = [
    { label: "Skills missing for Software Developer?", text: "What skills am I missing for a software developer internship?" },
    { label: "Explain SQL in Tamil", text: "Explain SQL in Tamil." },
    { label: "Python resources in Hindi", text: "Give me trusted Python resources in Hindi." },
    { label: "How to improve project description?", text: "How can I improve my project description?" },
    { label: "Java Interview Questions", text: "Give me interview questions for Java." }
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: generateCareerBotResponse(query, profile, currentLanguage),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    if (!textToSend) setInput('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">CareerBot AI Assistant</h2>
            <p className="text-xs text-slate-500">
              Context-aware career guide synced with student: <strong className="text-slate-800">{profile.name}</strong> ({profile.targetRole}).
            </p>
          </div>
        </div>

        <div className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center space-x-1.5">
          <Globe className="w-4 h-4" />
          <span>Active Lang: {currentLanguage.toUpperCase()}</span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.text)}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-sm transition-all hover:border-blue-400"
          >
            💡 {p.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        <div className="space-y-4 min-h-[350px] max-h-[500px] overflow-y-auto p-4 bg-slate-50/50 rounded-xl border border-slate-100">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start space-x-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs max-w-xl shadow-sm leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none font-normal'
                }`}
              >
                {m.text}
                <div
                  className={`text-[9px] mt-1.5 text-right ${
                    m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask CareerBot in Tamil, Hindi or English..."
            className="flex-1 p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-1.5 transition-colors"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
