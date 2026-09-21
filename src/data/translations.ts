import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  landingHeadline: string;
  landingSubheading: string;
  ctaBuildRoadmap: string;
  loadDemoProfile: string;
  demoLoadedToast: string;
  
  // Navigation
  navDashboard: string;
  navProfile: string;
  navSkillGap: string;
  navLearn: string;
  navProjects: string;
  navOpportunities: string;
  navResume: string;
  navCareerBot: string;
  navSkillBreak: string;
  navProgress: string;

  // Timeline & Dashboard
  careerReadiness: string;
  careerGoal: string;
  profileCompletion: string;
  currentSkills: string;
  skillGaps: string;
  learningProgress: string;
  recommendedProjects: string;
  resumeStatus: string;
  matchedOpportunities: string;
  upcomingDeadlines: string;
  
  // Categories
  strong: string;
  needsImprovement: string;
  missing: string;
  
  // SkillBreak
  takeBreakTitle: string;
  takeBreakSubtitle: string;
  startQuiz: string;

  // Disclaimer
  trustDisclaimer: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: "SkillBridge AI",
    tagline: "From Skill Gaps to Career Opportunities.",
    landingHeadline: "Know What to Learn. Build What Matters. Be Ready for the Opportunity.",
    landingSubheading: "SkillBridge AI connects your skills, learning journey, resume and real-world opportunities in one personalized career-readiness platform.",
    ctaBuildRoadmap: "Build My Career Roadmap",
    loadDemoProfile: "Load Demo Profile (Arun Kumar)",
    demoLoadedToast: "Demo student profile loaded for Arun Kumar (B.E. CS 2nd Year)!",
    
    navDashboard: "Dashboard",
    navProfile: "My Profile",
    navSkillGap: "Skill Gap",
    navLearn: "Learn Navigator",
    navProjects: "Projects",
    navOpportunities: "Opportunities",
    navResume: "Resume Studio",
    navCareerBot: "CareerBot AI",
    navSkillBreak: "SkillBreak",
    navProgress: "Roadmap Progress",

    careerReadiness: "Career Readiness Score",
    careerGoal: "Target Career Goal",
    profileCompletion: "Profile Completion",
    currentSkills: "Current Verified Skills",
    skillGaps: "Identified Skill Gaps",
    learningProgress: "Learning Progress",
    recommendedProjects: "Recommended Projects",
    resumeStatus: "Resume Health & Tailoring",
    matchedOpportunities: "Matched Opportunities",
    upcomingDeadlines: "Upcoming Deadlines",

    strong: "Strong",
    needsImprovement: "Needs Improvement",
    missing: "Missing",

    takeBreakTitle: "Take a 3-Minute SkillBreak",
    takeBreakSubtitle: "Refresh your mind with educational coding puzzles, bug hunts, and interview practice.",
    startQuiz: "Start Activity",

    trustDisclaimer: "SkillBridge AI strictly verifies opportunity sources. Matches reflect requirement alignment and do not guarantee selection."
  },

  ta: {
    appName: "SkillBridge AI",
    tagline: "திறன் இடைவெளியில் இருந்து வேலை வாய்ப்புகள் வரை.",
    landingHeadline: "என்ன கற்க வேண்டும் என்று அறிந்திடுங்கள். முக்கிய திட்டங்களை உருவாக்குங்கள். வாய்ப்புகளுக்கு தயாராகுங்கள்.",
    landingSubheading: "SkillBridge AI உங்கள் திறன்கள், கற்றல் பயணம், ரெஸ்யூம் மற்றும் நேரடி வாய்ப்புகளை ஒரே தளத்தில் இணைக்கிறது.",
    ctaBuildRoadmap: "எனது தொழில் வழிகாட்டியை உருவாக்கு",
    loadDemoProfile: "மாதிரி சுயவிவரம் (அருண் குமார்)",
    demoLoadedToast: "அருண் குமார் (B.E. CS 2-ஆம் ஆண்டு) மாதிரி கணக்கு ஏற்றப்பட்டது!",

    navDashboard: "முகப்பு",
    navProfile: "என் சுயவிவரம்",
    navSkillGap: "திறன் இடைவெளி",
    navLearn: "கற்றல் வழிகாட்டி",
    navProjects: "திட்டங்கள் (Projects)",
    navOpportunities: "வாய்ப்புகள்",
    navResume: "ரெஸ்யூம் ஸ்டுடியோ",
    navCareerBot: "CareerBot AI",
    navSkillBreak: "SkillBreak இடைவேளை",
    navProgress: "கற்றல் பாதை",

    careerReadiness: "தொழில் தயார்நிலை மதிப்பெண்",
    careerGoal: "இலக்கு தொழில்",
    profileCompletion: "சுயவிவர நிறைவு",
    currentSkills: "தற்போதைய திறன்கள்",
    skillGaps: "தேவையான திறன் இடைவெளிகள்",
    learningProgress: "கற்றல் முன்னேற்றம்",
    recommendedProjects: "பரிந்துரைக்கப்பட்ட திட்டங்கள்",
    resumeStatus: "ரெஸ்யூம் நிலை",
    matchedOpportunities: "பொருந்திய வாய்ப்புகள்",
    upcomingDeadlines: "அடுத்தடுத்த கடைசி தேதிகள்",

    strong: "நன்கு தெரியும் (Strong)",
    needsImprovement: "மேம்படுத்த வேண்டும் (Needs Improvement)",
    missing: "கற்க வேண்டும் (Missing)",

    takeBreakTitle: "3-நிமிட SkillBreak இடைவேளை எடுங்கள்",
    takeBreakSubtitle: "புதிர்கள் மற்றும் பிழை திருத்தம் மூலம் உங்கள் மூளையை சுறுசுறுப்பாக்குங்கள்.",
    startQuiz: "பயிற்சியை தொடங்கு",

    trustDisclaimer: "SkillBridge AI அதிகாரப்பூர்வ ஆதாரங்களை மட்டுமே காட்டுகிறது. இது வெற்றி உத்தரவாதம் அல்ல."
  },

  hi: {
    appName: "SkillBridge AI",
    tagline: "स्किल गैप से करियर अवसरों तक।",
    landingHeadline: "जानें क्या सीखना है। बनाएं जो महत्वपूर्ण है। अवसरों के लिए तैयार रहें।",
    landingSubheading: "SkillBridge AI आपके कौशल, सीखने की यात्रा, रिज्यूमे और वास्तविक अवसरों को एक व्यक्तिगत मंच पर जोड़ता है।",
    ctaBuildRoadmap: "मेरा करियर रोडमैप बनाएं",
    loadDemoProfile: "डेमो प्रोफाइल लोड करें (अरुण कुमार)",
    demoLoadedToast: "अरुण कुमार (B.E. CS द्वितीय वर्ष) का डेमो प्रोफाइल लोड हो गया है!",

    navDashboard: "डैशबोर्ड",
    navProfile: "मेरी प्रोफाइल",
    navSkillGap: "स्किल गैप",
    navLearn: "लर्निंग नेविगेटर",
    navProjects: "प्रोजेक्ट्स",
    navOpportunities: "अवसर (Opportunities)",
    navResume: "रिज्यूमे स्टूडियो",
    navCareerBot: "CareerBot AI",
    navSkillBreak: "SkillBreak ब्रेक",
    navProgress: "रोडमैप प्रगति",

    careerReadiness: "करियर रेडीनेस स्कोर",
    careerGoal: "लक्ष्य करियर भूमिका",
    profileCompletion: "प्रोफाइल पूर्णता",
    currentSkills: "वर्तमान कौशल",
    skillGaps: "पहचाने गए स्किल गैप",
    learningProgress: "सीखने की प्रगति",
    recommendedProjects: "अनुशंसित प्रोजेक्ट्स",
    resumeStatus: "रिज्यूमे स्थिति",
    matchedOpportunities: "मैच हुए अवसर",
    upcomingDeadlines: "आगामी अंतिम तिथियां",

    strong: "मजबूत (Strong)",
    needsImprovement: "सुधार की जरूरत (Needs Improvement)",
    missing: "सीखना बाकी (Missing)",

    takeBreakTitle: "3-मिनट का SkillBreak लें",
    takeBreakSubtitle: "कोडिंग पहेलियों और बग फिक्सिंग के साथ अपने दिमाग को तरोताजा करें।",
    startQuiz: "गतिविधि शुरू करें",

    trustDisclaimer: "SkillBridge AI केवल सत्यापित स्रोतों को सूचीबद्ध करता है। मैच योग्यता पर आधारित है, चयन की गारंटी नहीं।"
  }
};
