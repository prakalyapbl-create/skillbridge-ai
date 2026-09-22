import { CategoryCardItem } from '../types';

export const categoriesData: CategoryCardItem[] = [
  {
    id: "internships",
    titleKey: "categories.internships.title",
    descriptionKey: "categories.internships.desc",
    shortDescKey: "categories.internships.shortDesc",
    image: "/images/categories/internships.svg",
    route: "/opportunities?type=internship",
    icon: "Briefcase",
    countLabelKey: "12+ Verified Internships",
    badge: "Recommended",
    skillsExample: ["Software Dev", "Frontend React", "Data Analytics"]
  },
  {
    id: "jobs",
    titleKey: "categories.jobs.title",
    descriptionKey: "categories.jobs.desc",
    shortDescKey: "categories.jobs.shortDesc",
    image: "/images/categories/jobs.svg",
    route: "/opportunities?type=job",
    icon: "Building",
    countLabelKey: "8+ Entry-Level Openings",
    badge: "Trending",
    skillsExample: ["Java Enterprise", "Python Backend", "SQL DB"]
  },
  {
    id: "hackathons",
    titleKey: "categories.hackathons.title",
    descriptionKey: "categories.hackathons.desc",
    shortDescKey: "categories.hackathons.shortDesc",
    image: "/images/categories/hackathons.svg",
    route: "/opportunities?type=hackathon",
    icon: "Code2",
    countLabelKey: "Devpost Global Hackathons",
    badge: "New",
    skillsExample: ["AI Innovation", "Full-Stack Web", "REST APIs"]
  },
  {
    id: "competitions",
    titleKey: "categories.competitions.title",
    descriptionKey: "categories.competitions.desc",
    shortDescKey: "categories.competitions.shortDesc",
    image: "/images/categories/competitions.svg",
    route: "/opportunities?type=competition",
    icon: "Trophy",
    countLabelKey: "Unstop Student Contests",
    badge: "For You",
    skillsExample: ["DSA Algorithms", "SQL Querying", "Problem Solving"]
  },
  {
    id: "learning",
    titleKey: "categories.learning.title",
    descriptionKey: "categories.learning.desc",
    shortDescKey: "categories.learning.shortDesc",
    image: "/images/categories/learning.svg",
    route: "/learning",
    icon: "BookOpen",
    countLabelKey: "Tamil / English / Hindi",
    badge: "Recommended",
    skillsExample: ["PostgreSQL Docs", "NPTEL Courses", "FreeCodeCamp"]
  },
  {
    id: "projects",
    titleKey: "categories.projects.title",
    descriptionKey: "categories.projects.desc",
    shortDescKey: "categories.projects.shortDesc",
    image: "/images/categories/projects.svg",
    route: "/projects",
    icon: "FolderGit2",
    countLabelKey: "Hands-on Portfolio Builds",
    badge: "For You",
    skillsExample: ["Student Attendance API", "Algorithm Visualizer"]
  },
  {
    id: "skills",
    titleKey: "categories.skills.title",
    descriptionKey: "categories.skills.desc",
    shortDescKey: "categories.skills.shortDesc",
    image: "/images/categories/skills.svg",
    route: "/skills",
    icon: "Target",
    countLabelKey: "GREEN / YELLOW / RED Gaps",
    badge: "Recommended",
    skillsExample: ["SQL Gaps", "Git Workflows", "DSA Analysis"]
  },
  {
    id: "resume",
    titleKey: "categories.resume.title",
    descriptionKey: "categories.resume.desc",
    shortDescKey: "categories.resume.shortDesc",
    image: "/images/categories/resume.svg",
    route: "/resume",
    icon: "FileText",
    countLabelKey: "Dual Studio & AI Tutor",
    badge: "Trending",
    skillsExample: ["Builder Mode", "Resume Tutor AI", "Job Tailoring"]
  },
  {
    id: "mockTests",
    titleKey: "categories.mockTests.title",
    descriptionKey: "categories.mockTests.desc",
    shortDescKey: "categories.mockTests.shortDesc",
    image: "/images/categories/mock-tests.svg",
    route: "/mock-tests",
    icon: "CheckSquare",
    countLabelKey: "Technical Practice Sets",
    badge: "New",
    skillsExample: ["Python Logic", "SQL Queries", "Interview Set"]
  },
  {
    id: "skillbreak",
    titleKey: "categories.skillbreak.title",
    descriptionKey: "categories.skillbreak.desc",
    shortDescKey: "categories.skillbreak.shortDesc",
    image: "/images/categories/skillbreak.svg",
    route: "/skillbreak",
    icon: "Zap",
    countLabelKey: "3-Minute Mind Refresh",
    badge: "For You",
    skillsExample: ["Find the Bug", "Code Output Quiz", "HTTP Trivia"]
  }
];
