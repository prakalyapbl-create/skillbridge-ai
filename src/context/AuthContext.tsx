'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserAuthSession, Language } from '../types';
import { demoStudentProfile } from '../data/demoStudent';

interface AuthContextType {
  session: UserAuthSession;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (fullName: string, email: string, pass: string, lang: Language, targetRole: string) => Promise<boolean>;
  logout: () => void;
  loadDemoAccount: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  isLoading: boolean;
}

const defaultUser: UserProfile = {
  id: 'usr-demo-1',
  email: 'arun.kumar@university.edu',
  name: demoStudentProfile.name,
  degree: demoStudentProfile.degree,
  branch: demoStudentProfile.branch,
  year: demoStudentProfile.year,
  graduationYear: demoStudentProfile.graduationYear,
  skills: demoStudentProfile.skills,
  projects: demoStudentProfile.projects,
  certifications: demoStudentProfile.certifications,
  internships: demoStudentProfile.internships,
  interests: demoStudentProfile.interests,
  targetRole: demoStudentProfile.targetRole,
  preferredLocation: demoStudentProfile.preferredLocation,
  preferredOpportunityType: demoStudentProfile.preferredOpportunityType,
  preferredLanguage: demoStudentProfile.preferredLanguage,
  learningPreference: 'Video',
  resumeFileName: demoStudentProfile.resumeFileName,
  resumeTextContent: demoStudentProfile.resumeTextContent,
  resumeParsedData: demoStudentProfile.resumeParsedData,
  notificationPreferences: {
    emailAlerts: true,
    skillReminders: true,
    deadlineAlerts: true,
    opportunityAlerts: true,
    weeklyProgress: true
  },
  onboardingCompleted: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserAuthSession>({
    user: defaultUser, // Default active demo user session for instant experience
    token: 'mock-jwt-token-arun-kumar',
    isAuthenticated: true
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('sb_user_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSession({
          user: parsed,
          token: 'mock-jwt-token-active',
          isAuthenticated: true
        });
      } catch (e) {}
    }
    setIsLoading(false);
  }, []);

  const saveSession = (user: UserProfile) => {
    setSession({ user, token: 'mock-jwt-token-' + user.id, isAuthenticated: true });
    localStorage.setItem('sb_user_session', JSON.stringify(user));
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600)); // Simulate async network call
    
    // Create authenticated profile session
    const existing = session.user && session.user.email === email ? session.user : {
      ...defaultUser,
      id: 'usr-' + Date.now(),
      email,
      name: email.split('@')[0]
    };
    saveSession(existing);
    setIsLoading(false);
    return true;
  };

  const register = async (fullName: string, email: string, pass: string, lang: Language, targetRole: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));

    const newUser: UserProfile = {
      ...defaultUser,
      id: 'usr-' + Date.now(),
      name: fullName,
      email,
      preferredLanguage: lang,
      targetRole: targetRole || 'Software Developer Intern',
      onboardingCompleted: false
    };

    saveSession(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setSession({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('sb_user_session');
  };

  const loadDemoAccount = () => {
    saveSession(defaultUser);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!session.user) return;
    const nextUser = { ...session.user, ...updated };
    saveSession(nextUser);
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    if (!session.user) return;
    const nextUser = { ...session.user, ...data, onboardingCompleted: true };
    saveSession(nextUser);
  };

  return (
    <AuthContext.Provider value={{
      session,
      login,
      register,
      logout,
      loadDemoAccount,
      updateProfile,
      completeOnboarding,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
