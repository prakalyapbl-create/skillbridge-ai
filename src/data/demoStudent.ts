import { StudentProfile } from '../types';

export const demoStudentProfile: StudentProfile = {
  id: "usr-demo-1",
  email: "arun.kumar@university.edu",
  name: "Arun Kumar",
  degree: "B.E. Computer Science & Engineering",
  branch: "Computer Science",
  year: "2nd Year",
  graduationYear: "2027",
  skills: [
    { name: "Python", proficiency: "Intermediate", category: "Technical" },
    { name: "Java", proficiency: "Intermediate", category: "Technical" },
    { name: "HTML", proficiency: "Advanced", category: "Technical" },
    { name: "CSS", proficiency: "Intermediate", category: "Technical" },
    { name: "Basic React", proficiency: "Beginner", category: "Technical" },
    { name: "Communication", proficiency: "Intermediate", category: "Soft Skill" },
    { name: "Problem Solving", proficiency: "Intermediate", category: "Soft Skill" }
  ],
  projects: [
    {
      title: "Student Portal Frontend",
      description: "Designed a responsive web layout for a college department portal using HTML, CSS, and basic JavaScript DOM manipulations.",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Library Book Checker CLI",
      description: "Python command-line interface tool to search, borrow, and check overdue library books using file storage.",
      technologies: ["Python", "File I/O"]
    }
  ],
  certifications: [
    {
      title: "Python Programming Basics",
      issuer: "NPTEL / IIT Madras",
      year: "2025"
    }
  ],
  internships: [],
  interests: ["Web Development", "Backend APIs", "Machine Learning Applications", "Software Engineering"],
  targetRole: "Software Developer Intern",
  preferredLocation: "Chennai / Hybrid",
  preferredOpportunityType: "Internship",
  preferredLanguage: "ta",
  learningPreference: "Video",
  notificationPreferences: {
    emailAlerts: true,
    skillReminders: true,
    deadlineAlerts: true,
    opportunityAlerts: true,
    weeklyProgress: true
  },
  onboardingCompleted: true,
  resumeFileName: "Arun_Kumar_CS_Resume.pdf",
  resumeTextContent: `ARUN KUMAR
Degree: B.E. Computer Science & Engineering (Year 2) | CGPA: 8.4/10
Target Role: Software Developer Intern | Preferred Language: Tamil / English

TECHNICAL SKILLS:
- Languages: Python, Java, HTML, CSS, JavaScript (Basic)
- Frameworks: Basic React
- Soft Skills: Communication, Teamwork

PROJECTS:
1. Student Portal Frontend: Built department website using HTML & CSS.
2. Library Book Checker CLI: Python script for library book tracking using CSV files.

EDUCATION:
Anna University Affiliated College — B.E. CSE (2023 - 2027)

CERTIFICATIONS:
- NPTEL Programming in Python (2025)`,
  resumeParsedData: {
    education: ["B.E. Computer Science & Engineering, Anna University (2023-2027), CGPA: 8.4"],
    technicalSkills: ["Python", "Java", "HTML", "CSS", "Basic React", "JavaScript"],
    softSkills: ["Communication", "Teamwork"],
    projects: [
      "Student Portal Frontend (HTML/CSS)",
      "Library Book Checker CLI (Python)"
    ],
    internships: [],
    certifications: ["NPTEL Programming in Python"],
    achievements: ["Department Coding Quiz Top 5"],
    experience: [],
    detectedSkills: ["Python", "Java", "HTML", "CSS", "Basic React"],
    missingInformation: ["GitHub Profile Link", "LinkedIn Profile", "DB/SQL experience", "Data Structures & Algorithms projects"],
    unclearDescriptions: ["Library Book Checker project lacks quantitative metrics (e.g. number of records handled, execution time)"],
    weakProjectDescriptions: ["Student Portal Frontend uses basic CSS; could mention responsive design frameworks or state management"],
    relevantSkills: ["Python", "Java", "React"],
    structureSuggestions: ["Add a dedicated 'Technical Skills Summary' section categorized by Languages, Web Tech, and Tools.", "Include live project links or GitHub repository URLs."]
  }
};
