export interface RoleRequirement {
  roleName: string;
  description: string;
  requiredSkills: {
    skillName: string;
    importance: 'High' | 'Medium' | 'Critical';
    category: 'Technical' | 'Core' | 'Tool';
    whyItMatters: string;
    recommendedPath: string;
    suggestedProject: string;
  }[];
}

export const targetRoles: RoleRequirement[] = [
  {
    roleName: "Software Developer Intern",
    description: "Develop, debug, and maintain software components using core programming languages, data structures, and APIs.",
    requiredSkills: [
      {
        skillName: "Python",
        importance: "Critical",
        category: "Technical",
        whyItMatters: "Primary language for rapid scripting, backend logic, and data processing.",
        recommendedPath: "Master Python OOP, decorators, modules, and file handling.",
        suggestedProject: "Build a Student Attendance REST API using FastAPI/Flask."
      },
      {
        skillName: "Java",
        importance: "High",
        category: "Technical",
        whyItMatters: "Widely used in enterprise backend systems, object-oriented design, and mobile dev.",
        recommendedPath: "Learn Java OOP concepts, Collections Framework, and Exception Handling.",
        suggestedProject: "Console-based Banking System with Object-Oriented principles."
      },
      {
        skillName: "SQL & Databases",
        importance: "Critical",
        category: "Core",
        whyItMatters: "Every software application requires storing and querying structured relational data.",
        recommendedPath: "Practice SQL SELECT queries, JOINs, Aggregations, Transactions, and indexing.",
        suggestedProject: "Design a Relational E-Commerce Database schema with Postgres."
      },
      {
        skillName: "Data Structures & Algorithms (DSA)",
        importance: "Critical",
        category: "Core",
        whyItMatters: "Essential for technical interview coding rounds, memory management, and efficient code execution.",
        recommendedPath: "Solve Arrays, Linked Lists, Trees, Stacks, Queues, Graphs, and Dynamic Programming problems.",
        suggestedProject: "Build a Custom Algorithm Visualizer web app."
      },
      {
        skillName: "Git & GitHub",
        importance: "High",
        category: "Tool",
        whyItMatters: "Version control is mandatory for collaborative development and code reviews in team environments.",
        recommendedPath: "Learn git clone, branch, commit, push, pull requests, merge conflict resolution.",
        suggestedProject: "Publish all project code to GitHub with clean documentation & README."
      },
      {
        skillName: "REST APIs",
        importance: "High",
        category: "Technical",
        whyItMatters: "Modern web applications communicate via HTTP REST endpoints (GET, POST, PUT, DELETE).",
        recommendedPath: "Understand HTTP methods, status codes, JSON parsing, API authentication.",
        suggestedProject: "Build a Weather & News Aggregator API consumer dashboard."
      }
    ]
  },
  {
    roleName: "Full Stack Developer",
    description: "Build both frontend user interfaces and backend server architecture.",
    requiredSkills: [
      {
        skillName: "React",
        importance: "Critical",
        category: "Technical",
        whyItMatters: "De-facto industry standard component-based UI library.",
        recommendedPath: "Hooks (useState, useEffect), State management, Component lifecycle, React Router.",
        suggestedProject: "Build a Task Management Kanban Dashboard."
      },
      {
        skillName: "Node.js & Express",
        importance: "Critical",
        category: "Technical",
        whyItMatters: "Enables JavaScript server-side execution and async I/O handling.",
        recommendedPath: "Express routing, middleware, JWT auth, database connectors.",
        suggestedProject: "Create a User Authentication & Profile API microservice."
      },
      {
        skillName: "SQL & Databases",
        importance: "Critical",
        category: "Core",
        whyItMatters: "Persists web application state safely and securely.",
        recommendedPath: "PostgreSQL schema design, Prisma/Sequelize ORM integration.",
        suggestedProject: "Build an Online Course Enrolment Portal with DB schema."
      },
      {
        skillName: "Git & GitHub",
        importance: "High",
        category: "Tool",
        whyItMatters: "Enables collaborative full-stack workflow management.",
        recommendedPath: "Branching strategies, CI/CD GitHub Actions workflow.",
        suggestedProject: "Deploy full-stack app with Vercel/Render CI pipeline."
      }
    ]
  },
  {
    roleName: "Data Analyst",
    description: "Analyze datasets to extract actionable insights, create visual dashboards, and guide business decisions.",
    requiredSkills: [
      {
        skillName: "SQL & Querying",
        importance: "Critical",
        category: "Core",
        whyItMatters: "Data analysts extract raw datasets from databases using complex analytical SQL.",
        recommendedPath: "Master GROUP BY, Window Functions (ROW_NUMBER, RANK), CTEs, and Subqueries.",
        suggestedProject: "Sales & Customer Retention Analysis on retail dataset."
      },
      {
        skillName: "Python for Data Analysis (Pandas/NumPy)",
        importance: "Critical",
        category: "Technical",
        whyItMatters: "Industry standard tools for data cleaning, transformation, and aggregation.",
        recommendedPath: "DataFrames, handling null values, merging tables, descriptive statistics.",
        suggestedProject: "Exploratory Data Analysis (EDA) on World University Rankings."
      },
      {
        skillName: "Power BI / Tableau",
        importance: "High",
        category: "Tool",
        whyItMatters: "Visualizes analytical findings for non-technical stakeholders.",
        recommendedPath: "Interactive dashboards, charts, DAX formulas, filter slicers.",
        suggestedProject: "Executive Financial KPI Dashboard."
      }
    ]
  },
  {
    roleName: "AI/ML Engineer",
    description: "Design, build, and deploy machine learning and AI model pipelines.",
    requiredSkills: [
      {
        skillName: "Python & Scikit-Learn",
        importance: "Critical",
        category: "Technical",
        whyItMatters: "Primary ecosystem for data preprocessing, regression, classification, and model training.",
        recommendedPath: "Supervised & Unsupervised learning algorithms, model evaluation metrics.",
        suggestedProject: "Predictive Housing Price Model with hyperparameter tuning."
      },
      {
        skillName: "Deep Learning (PyTorch / TensorFlow)",
        importance: "High",
        category: "Technical",
        whyItMatters: "Powers computer vision, natural language processing, and neural network architectures.",
        recommendedPath: "Neural networks, CNNs, Transformers, fine-tuning pretrained models.",
        suggestedProject: "Image Classification API for Medical Diagnostics."
      },
      {
        skillName: "Math & Linear Algebra",
        importance: "Critical",
        category: "Core",
        whyItMatters: "Underpins model optimization, gradient descent, vectors, and matrix operations.",
        recommendedPath: "Vectors, Matrices, Eigenvalues, Partial Derivatives, Probability Distributions.",
        suggestedProject: "Implement Gradient Descent from Scratch in Python."
      }
    ]
  },
  {
    roleName: "Cybersecurity Analyst",
    description: "Monitor, analyze, and protect computer networks, servers, and software from security threats.",
    requiredSkills: [
      {
        skillName: "Networking Fundamentals",
        importance: "Critical",
        category: "Core",
        whyItMatters: "Understanding OSI layers, TCP/IP, DNS, Firewalls, and Packet Routing.",
        recommendedPath: "Wireshark packet analysis, Subnetting, Port scanning basics.",
        suggestedProject: "Network Traffic & Anomaly Analyzer with Python Scapy."
      },
      {
        skillName: "Linux Administration",
        importance: "High",
        category: "Tool",
        whyItMatters: "Most security tools and servers operate on Linux distributions.",
        recommendedPath: "Bash scripting, file permissions, cron jobs, process management.",
        suggestedProject: "Automated Log Monitoring & Alerting Bash Script."
      }
    ]
  },
  {
    roleName: "Cloud Engineer",
    description: "Architect, deploy, and manage scalable cloud computing infrastructure.",
    requiredSkills: [
      {
        skillName: "AWS / Azure Cloud Basics",
        importance: "Critical",
        category: "Technical",
        whyItMatters: "Powers modern scalable cloud infrastructure deployment.",
        recommendedPath: "EC2, S3, IAM, VPC, CloudWatch, Lambda serverless.",
        suggestedProject: "Serverless Web Application hosted on AWS S3 & Lambda."
      },
      {
        skillName: "Docker & Containerization",
        importance: "High",
        category: "Tool",
        whyItMatters: "Ensures applications run consistently across development and cloud environments.",
        recommendedPath: "Dockerfile creation, docker-compose, container networking.",
        suggestedProject: "Dockerize a Python REST API + PostgreSQL Database app."
      }
    ]
  },
  {
    roleName: "UI/UX Designer",
    description: "Design user interfaces, wireframes, user journeys, and conduct usability research.",
    requiredSkills: [
      {
        skillName: "Figma",
        importance: "Critical",
        category: "Tool",
        whyItMatters: "Industry standard tool for high-fidelity UI design, component systems, and prototyping.",
        recommendedPath: "Auto-layout, interactive prototypes, design tokens, responsive grids.",
        suggestedProject: "Design a Mobile Student Career Companion App in Figma."
      },
      {
        skillName: "User Research & Prototyping",
        importance: "High",
        category: "Core",
        whyItMatters: "Ensures interface solves real user pain points efficiently.",
        recommendedPath: "User personas, wireframing, usability testing, accessibility (WCAG).",
        suggestedProject: "Redesign a Public Transport Ticketing App with Usability Audit."
      }
    ]
  },
  {
    roleName: "Product Manager",
    description: "Define product vision, prioritize roadmap features, and align engineering and design teams.",
    requiredSkills: [
      {
        skillName: "Product Requirements (PRD)",
        importance: "Critical",
        category: "Core",
        whyItMatters: "Clearly specifies feature scopes, user stories, and success metrics for build teams.",
        recommendedPath: "Drafting PRDs, User Story Mapping, acceptance criteria definition.",
        suggestedProject: "Draft a PRD for an AI Study Buddy Feature."
      },
      {
        skillName: "Agile & Jira Basics",
        importance: "High",
        category: "Tool",
        whyItMatters: "Standard framework for sprint planning, backlog refinement, and release tracking.",
        recommendedPath: "Scrum ceremonies, backlog prioritization frameworks (RICE/Kano).",
        suggestedProject: "Create a 4-Week Sprint Backlog for a Campus Event App."
      }
    ]
  }
];
