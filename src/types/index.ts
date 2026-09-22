export type Language = 'en' | 'ta' | 'hi';
export type ThemeMode = 'light' | 'dark' | 'system';

export type SkillProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserSkill {
  name: string;
  proficiency: SkillProficiencyLevel;
  category: 'Technical' | 'Soft Skill' | 'Tool/Framework';
}

export interface StudentProject {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface StudentCertification {
  title: string;
  issuer: string;
  year: string;
}

export interface NotificationPreferences {
  emailAlerts: boolean;
  skillReminders: boolean;
  deadlineAlerts: boolean;
  opportunityAlerts: boolean;
  weeklyProgress: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  degree: string;
  branch: string;
  year: string;
  graduationYear: string;
  skills: UserSkill[];
  projects: StudentProject[];
  certifications: StudentCertification[];
  internships: string[];
  interests: string[];
  targetRole: string;
  customRoleDescription?: string;
  preferredLocation: string;
  preferredOpportunityType: 'Internship' | 'Full-time' | 'Both';
  preferredLanguage: Language;
  learningPreference: 'Video' | 'Reading' | 'Practice' | 'Projects';
  resumeFileName?: string;
  resumeTextContent?: string;
  resumeParsedData?: ExtractedResumeData;
  notificationPreferences: NotificationPreferences;
  onboardingCompleted: boolean;
}

// Alias for backward compatibility across components
export type StudentProfile = UserProfile;

export interface UserAuthSession {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ExtractedResumeData {
  education: string[];
  technicalSkills: string[];
  softSkills: string[];
  projects: string[];
  internships: string[];
  certifications: string[];
  achievements: string[];
  experience: string[];
  detectedSkills: string[];
  missingInformation: string[];
  unclearDescriptions: string[];
  weakProjectDescriptions: string[];
  relevantSkills: string[];
  structureSuggestions: string[];
}

export type SkillGapStatus = 'GREEN' | 'YELLOW' | 'RED';

export interface SkillGapItem {
  skillName: string;
  category: SkillGapStatus;
  userStatus: string;
  importance: 'High' | 'Medium' | 'Critical';
  whyItMatters: string;
  recommendedPath: string;
  suggestedProject: string;
  currentLevel?: SkillProficiencyLevel | 'None';
  requiredLevel?: SkillProficiencyLevel;
  learningAction?: string;
  practiceAction?: string;
}

export type ResourceTrustBadge = 
  | 'OFFICIAL'
  | 'GOVERNMENT / EDUCATIONAL'
  | 'INDUSTRY OFFICIAL'
  | 'VERIFIED PLATFORM';

export interface LearningResource {
  id: string;
  skill: string;
  platform: string;
  resourceName: string;
  language: Language | 'English' | 'Tamil' | 'Hindi';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  sourceType: string;
  verificationBadge: ResourceTrustBadge;
  link: string;
  format?: 'Video' | 'Course' | 'Documentation' | 'Practice' | 'Project';
}

export type RoadmapStatus = 'Not Started' | 'Learning' | 'Practicing' | 'Completed';

export interface LearningRoadmapWeek {
  id: string;
  weekNumber: number;
  title: string;
  skillName: string;
  topics: string[];
  status: RoadmapStatus;
  estimatedHours: number;
}

export type OpportunityType = 'Internship' | 'Job' | 'Hackathon' | 'Coding Challenge' | 'Competition';
export type OpportunitySourceType = 'OFFICIAL COMPANY SOURCE' | 'THIRD-PARTY PLATFORM';

export interface Opportunity {
  id: string;
  organization: string;
  role: string;
  type: OpportunityType;
  location: string;
  eligibility: string;
  deadline: string;
  requiredSkills: string[];
  source: string;
  sourceType: OpportunitySourceType;
  officialLink: string;
  lastVerifiedDate: string;
  stipendOrSalary?: string;
  isRemote?: boolean;
  experienceLevel?: string;
}

export interface OpportunityMatchResult {
  matchedSkills: string[];
  skillsToImprove: string[];
  missingSkills: string[];
  eligibilityCheck: boolean;
  resumeRelevanceScore: number;
  recommendationMessage: string;
}

export interface RecommendedProject {
  id: string;
  title: string;
  targetSkill: string;
  objective: string;
  technologies: string[];
  features: string[];
  expectedLearning: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  resumeDescriptionGuidance: string;
}

export interface ResumeTailorAnalysis {
  matchedSkills: string[];
  missingRelevantSkills: string[];
  weaklyDemonstratedSkills: string[];
  suggestedWordingImprovements: string[];
  ethicalGuardrailNotice: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  language?: Language;
}

export interface QuizQuestion {
  id: string;
  type: 'bug_hunter' | 'code_output' | 'communication' | 'technical_quiz' | 'logic';
  title: string;
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'job_match' | 'deadline' | 'skill_unlocked' | 'resume_alert' | 'learning_reminder';
  read: boolean;
  actionSkill?: string;
  actionOpportunityId?: string;
}

export interface CategoryCardItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  shortDescKey: string;
  image: string;
  route: string;
  icon: string;
  countLabelKey?: string;
  badge?: 'New' | 'Trending' | 'Recommended' | 'For You';
  skillsExample: string[];
}
