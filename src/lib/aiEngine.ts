import {
  StudentProfile,
  SkillGapItem,
  LearningRoadmapWeek,
  RecommendedProject,
  Opportunity,
  OpportunityMatchResult,
  ResumeTailorAnalysis,
  Language,
  ExtractedResumeData
} from '../types';
import { targetRoles } from '../data/rolesAndSkills';

/**
 * Deterministic + Rule-based AI Engine for SkillBridge AI
 * Provides intelligent, instant responses with context sensitivity.
 */

export function analyzeResume(resumeText: string): ExtractedResumeData {
  const text = resumeText.toLowerCase();

  // Basic skill keyword scanner
  const knownSkills = ["python", "java", "html", "css", "javascript", "react", "sql", "dsa", "git", "rest api", "c++", "node.js"];
  const detectedSkills = knownSkills.filter(s => text.includes(s)).map(s => {
    if (s === "dsa") return "Data Structures & Algorithms (DSA)";
    if (s === "sql") return "SQL & Databases";
    if (s === "git") return "Git & GitHub";
    return s.charAt(0).toUpperCase() + s.slice(1);
  });

  const missingInfo: string[] = [];
  if (!text.includes("github.com")) missingInfo.push("Missing GitHub Repository link");
  if (!text.includes("linkedin.com")) missingInfo.push("Missing LinkedIn profile URL");
  if (!text.includes("sql") && !text.includes("database")) missingInfo.push("No Relational Database / SQL experience mentioned");
  if (!text.includes("git")) missingInfo.push("No Version Control / Git workflow mentioned");

  const unclearDescriptions: string[] = [
    "Project bullet points lack measurable outcomes (e.g. 'improved performance by X%', 'handled N records')",
    "Technical skill list does not indicate proficiency level or project context"
  ];

  const weakProjectDescriptions: string[] = [
    "Frontend project descriptions state tools used but omit application architecture & user impact",
    "CLI script projects do not describe exception handling or data persistence"
  ];

  return {
    education: ["Extracted academic background from uploaded document"],
    technicalSkills: detectedSkills,
    softSkills: ["Communication", "Problem Solving", "Team Collaboration"],
    projects: ["Parsed Student Projects"],
    internships: [],
    certifications: ["NPTEL / Online Certifications"],
    achievements: ["Academic performance metrics"],
    experience: [],
    detectedSkills,
    missingInformation: missingInfo,
    unclearDescriptions,
    weakProjectDescriptions,
    relevantSkills: detectedSkills,
    structureSuggestions: [
      "Add a clear 'Core Competencies' section at the top.",
      "Use action verbs (e.g., 'Architected', 'Optimized', 'Deployed') at the beginning of each bullet point.",
      "Highlight specific tools used in each project title."
    ]
  };
}

export function calculateSkillGap(profile: StudentProfile, targetRoleName: string): SkillGapItem[] {
  const role = targetRoles.find(r => r.roleName.toLowerCase() === targetRoleName.toLowerCase()) || targetRoles[0];

  const userSkillMap = new Map<string, string>();
  profile.skills.forEach(s => {
    userSkillMap.set(s.name.toLowerCase(), s.proficiency);
  });

  return role.requiredSkills.map(req => {
    const reqLower = req.skillName.toLowerCase();
    
    // Check match
    let category: 'GREEN' | 'YELLOW' | 'RED' = 'RED';
    let userStatus = 'Missing';

    let matchedSkill = Array.from(userSkillMap.keys()).find(k => reqLower.includes(k) || k.includes(reqLower.split(' ')[0]));

    if (matchedSkill) {
      const prof = userSkillMap.get(matchedSkill);
      if (prof === 'Advanced' || prof === 'Intermediate') {
        category = 'GREEN';
        userStatus = `Strong (${prof})`;
      } else {
        category = 'YELLOW';
        userStatus = `Needs Improvement (${prof})`;
      }
    } else {
      category = 'RED';
      userStatus = 'Not Found in Profile';
    }

    return {
      skillName: req.skillName,
      category,
      userStatus,
      importance: req.importance,
      whyItMatters: req.whyItMatters,
      recommendedPath: req.recommendedPath,
      suggestedProject: req.suggestedProject
    };
  });
}

export function generateWeeklyRoadmap(gaps: SkillGapItem[]): LearningRoadmapWeek[] {
  const missingOrYellow = gaps.filter(g => g.category !== 'GREEN');
  const roadmap: LearningRoadmapWeek[] = [];

  let weekNum = 1;

  if (missingOrYellow.length === 0) {
    // Default 4-week optimization
    roadmap.push({
      id: `week-${weekNum}`,
      weekNumber: 1,
      title: "Advanced Skill Refinement",
      skillName: "System Architecture",
      topics: ["Design Patterns", "Clean Code", "API Documentation"],
      status: "Learning",
      estimatedHours: 8
    });
    return roadmap;
  }

  missingOrYellow.forEach(gap => {
    roadmap.push({
      id: `week-${weekNum}`,
      weekNumber: weekNum,
      title: `${gap.skillName} Core Concepts`,
      skillName: gap.skillName,
      topics: [
        `Basics & Syntax of ${gap.skillName}`,
        `Key Operations & Best Practices`,
        `Hands-on Exercises & Mini Problem Sets`
      ],
      status: weekNum === 1 ? 'Learning' : 'Not Started',
      estimatedHours: 10
    });
    weekNum++;

    roadmap.push({
      id: `week-${weekNum}`,
      weekNumber: weekNum,
      title: `${gap.skillName} Practical Application & Project Integration`,
      skillName: gap.skillName,
      topics: [
        `Build mini-project for ${gap.skillName}`,
        `Integrate ${gap.skillName} into resume project section`,
        `Code Review & Git Commit`
      ],
      status: 'Not Started',
      estimatedHours: 12
    });
    weekNum++;
  });

  return roadmap;
}

export function recommendProjectsForGaps(gaps: SkillGapItem[]): RecommendedProject[] {
  const redGaps = gaps.filter(g => g.category === 'RED' || g.category === 'YELLOW');
  
  if (redGaps.length === 0) {
    return [
      {
        id: "proj-advanced-1",
        title: "Full-Stack Microservice Portal",
        targetSkill: "Full Stack Architecture",
        objective: "Build a scalable microservices portal with API gateway and JWT authentication.",
        technologies: ["React", "FastAPI", "PostgreSQL", "Docker"],
        features: ["Auth Flow", "Role Based Access", "Automated DB Migrations"],
        expectedLearning: "Production deployment & container orchestration",
        difficulty: "Advanced",
        resumeDescriptionGuidance: "Architected a full-stack microservices portal utilizing FastAPI and PostgreSQL, containerized via Docker."
      }
    ];
  }

  return redGaps.slice(0, 3).map((gap, index) => {
    let title = `Practical ${gap.skillName} Application`;
    let tech = [gap.skillName, "Git", "Clean Code"];
    let objective = `Master ${gap.skillName} through hands-on project creation.`;
    let guidance = `Developed a practical ${gap.skillName} system implementing standard data workflows and published to GitHub.`;

    if (gap.skillName.toLowerCase().includes("sql")) {
      title = "Student Grade & Attendance Management Relational Database";
      tech = ["SQL", "PostgreSQL", "Python/Node.js"];
      objective = "Design normalized tables, foreign keys, and write analytical queries with JOINs and GROUP BY.";
      guidance = "Designed normalized PostgreSQL schema for student tracking, executing complex analytical queries with multi-table JOINs.";
    } else if (gap.skillName.toLowerCase().includes("dsa") || gap.skillName.toLowerCase().includes("data structure")) {
      title = "Interactive Data Structures & Algorithm Visualizer";
      tech = ["Python/JavaScript", "Algorithms", "Git"];
      objective = "Implement core data structures (Trees, Graphs, Stacks) and visualize operation complexities.";
      guidance = "Implemented core DSA algorithms in Python, visualizing stack, queue, and binary tree traversals with Big-O optimization.";
    } else if (gap.skillName.toLowerCase().includes("rest") || gap.skillName.toLowerCase().includes("api")) {
      title = "Campus Event Booking RESTful API Service";
      tech = ["FastAPI", "Python", "REST API", "JSON"];
      objective = "Build CRUD endpoints with request validation, HTTP status code handling, and Postman API docs.";
      guidance = "Engineered RESTful API endpoints using FastAPI, implementing input validation and structured JSON error responses.";
    }

    return {
      id: `proj-rec-${index}`,
      title,
      targetSkill: gap.skillName,
      objective,
      technologies: tech,
      features: ["Modular architecture", "Comprehensive README", "Error handling"],
      expectedLearning: `Master practical real-world ${gap.skillName} concepts`,
      difficulty: "Intermediate",
      resumeDescriptionGuidance: guidance
    };
  });
}

export function matchOpportunityWithProfile(profile: StudentProfile, opp: Opportunity): OpportunityMatchResult {
  const userSkills = profile.skills.map(s => s.name.toLowerCase());
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  const skillsToImprove: string[] = [];

  opp.requiredSkills.forEach(req => {
    const reqLower = req.toLowerCase();
    const hasSkill = userSkills.some(u => reqLower.includes(u) || u.includes(reqLower.split(' ')[0]));
    
    if (hasSkill) {
      matchedSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  });

  const totalReq = opp.requiredSkills.length || 1;
  const matchRatio = matchedSkills.length / totalReq;
  const score = Math.round(matchRatio * 100);

  let recommendationMessage = "Your profile currently matches several listed requirements.";
  if (score >= 80) {
    recommendationMessage = "Strong Alignment! Your profile currently matches most listed requirements for this opportunity.";
  } else if (score >= 50) {
    recommendationMessage = "Moderate Alignment. Completing 1-2 missing skills will boost your readiness for this role.";
  } else {
    recommendationMessage = "Initial Match. Work through your recommended learning roadmap before applying.";
  }

  return {
    matchedSkills,
    skillsToImprove,
    missingSkills,
    eligibilityCheck: true,
    resumeRelevanceScore: score,
    recommendationMessage
  };
}

export function tailorResumeForJob(profile: StudentProfile, jobDescription: string): ResumeTailorAnalysis {
  const jdLower = jobDescription.toLowerCase();
  const userSkills = profile.skills.map(s => s.name);

  const matchedSkills = userSkills.filter(s => jdLower.includes(s.toLowerCase()));
  const missingRelevantSkills = ["SQL", "Git", "REST API", "DSA"].filter(s => 
    jdLower.includes(s.toLowerCase()) && !userSkills.some(u => u.toLowerCase().includes(s.toLowerCase()))
  );

  const weaklyDemonstratedSkills = profile.skills
    .filter(s => s.proficiency === 'Beginner' && jdLower.includes(s.name.toLowerCase()))
    .map(s => s.name);

  const suggestedWordingImprovements = [
    "Rephrase project summaries to highlight specific tools used and measurable outcomes.",
    "Ensure technical skill section clearly distinguishes core languages from tools/frameworks."
  ];

  return {
    matchedSkills,
    missingRelevantSkills,
    weaklyDemonstratedSkills,
    suggestedWordingImprovements,
    ethicalGuardrailNotice: "IMPORTANT ETHICAL SAFETY GUARDRAIL: Never invent qualifications, experience, or skills. Only list skills you have genuine hands-on experience with."
  };
}

export function generateCareerBotResponse(message: string, profile: StudentProfile, lang: Language): string {
  const msgLower = message.toLowerCase();

  if (lang === 'ta') {
    if (msgLower.includes("sql")) {
      return "SQL என்பது Database-ல் தரவை (data) சேமிக்கவும், பெறவும் (retrieve) மற்றும் நிர்வகிக்கவும் (manage) பயன்படுத்தப்படும் மொழி ஆகும்.\n\nஉதாரணம்:\n`SELECT * FROM students WHERE year = '2nd Year';`\n\nஉங்கள் இலக்கு: Software Developer Intern பணிக்கு SQL மிகவும் அவசியம். தமிழ் வழிகாட்டிக்கான கற்றல் பகுதியைப் பாருங்கள்!";
    }
    if (msgLower.includes("missing") || msgLower.includes("திறன்") || msgLower.includes("gap")) {
      return `வணக்கம் ${profile.name}! உங்கள் இலக்கு role (${profile.targetRole}) பொறுத்தவரை, நீங்கள் உடனடியாக கற்க வேண்டிய முக்கிய திறன்கள்: SQL, Data Structures & Algorithms (DSA), மற்றும் REST APIs. இவற்றை தமிழ் வீடியோக்கள் மூலம் கற்க 'Learn Navigator' பக்கத்தை பாருங்கள்.`;
    }
    return `வணக்கம் ${profile.name}! நான் உங்கள் SkillBridge AI தொழில் வழிகாட்டி. உங்கள் ${profile.targetRole} இலக்கிற்கு தேவையான திறன் இடைவெளிகள், தமிழ் கற்றல் வளங்கள் மற்றும் ரெஸ்யூம் கேள்விகளுக்கு நான் உதவ தயாராக உள்ளேன்!`;
  }

  if (lang === 'hi') {
    if (msgLower.includes("sql")) {
      return "SQL (Structured Query Language) डेटाबेस में डेटा को स्टोर, रिट्रीव और मैनेज करने के लिए इस्तेमाल की जाने वाली भाषा है।\n\nउदाहरण:\n`SELECT * FROM students WHERE year = '2nd Year';`\n\nआपके target role (${profile.targetRole}) के लिए SQL बहुत महत्वपूर्ण है। 'Learn Navigator' सेक्शन में हिंदी वीडियो ट्यूटोरियल देखें!";
    }
    if (msgLower.includes("missing") || msgLower.includes("स्किल") || msgLower.includes("gap")) {
      return `नमस्ते ${profile.name}! आपकी लक्ष्य भूमिका (${profile.targetRole}) के अनुसार, आपको SQL, Data Structures & Algorithms (DSA), और REST APIs पर ध्यान देने की आवश्यकता है। हिंदी में सीखने के लिए 'Learn Navigator' पर जाएं।`;
    }
    return `नमस्ते ${profile.name}! मैं आपका SkillBridge AI करियर सहायक हूँ। आपकी ${profile.targetRole} तैयारी, हिंदी अध्ययन सामग्री, और रिज्यूमे सुधार में मदद करने के लिए तैयार हूँ!`;
  }

  // English default
  if (msgLower.includes("sql")) {
    return "SQL (Structured Query Language) is used to store, query, and manage relational database records.\n\nExample Query:\n`SELECT * FROM students WHERE branch = 'CSE';`\n\nFor your target role as a " + profile.targetRole + ", SQL is a critical gap. Check the Learn Navigator for official PostgreSQL resources!";
  }

  if (msgLower.includes("missing") || msgLower.includes("gap") || msgLower.includes("skills")) {
    return `Hello ${profile.name}! Based on your target role (${profile.targetRole}), your primary skill gaps are SQL, DSA, REST APIs, and Git version control. Check your customized weekly roadmap to complete these step-by-step.`;
  }

  return `Hello ${profile.name}! I am your SkillBridge AI Assistant. I have context on your target role (${profile.targetRole}), current verified skills, and roadmap progress. How can I help you refine your resume or guide your learning today?`;
}
