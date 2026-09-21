import { QuizQuestion } from '../types';

export const skillBreakQuizzes: QuizQuestion[] = [
  {
    id: "quiz-bug-1",
    type: "bug_hunter",
    title: "Find the SQL JOIN Bug",
    prompt: "Identify why this SQL query fails to return students who haven't registered for any courses yet:",
    codeSnippet: `SELECT students.name, courses.course_title 
FROM students 
INNER JOIN enrollments ON students.id = enrollments.student_id 
INNER JOIN courses ON enrollments.course_id = courses.id;`,
    options: [
      "Should use LEFT JOIN instead of INNER JOIN to include students with no enrollments.",
      "The SELECT statement needs a GROUP BY clause.",
      "Table names should be uppercase.",
      "courses.id is an invalid reference."
    ],
    correctAnswerIndex: 0,
    explanation: "INNER JOIN excludes records that do not match across both tables. To preserve all student rows regardless of enrollment status, a LEFT JOIN is required."
  },
  {
    id: "quiz-output-1",
    type: "code_output",
    title: "Predict the Python List Mutation Output",
    prompt: "What will be printed when this Python code snippet executes?",
    codeSnippet: `def add_item(val, item_list=[]):
    item_list.append(val)
    return item_list

print(add_item(10))
print(add_item(20))`,
    options: [
      "[10] followed by [20]",
      "[10] followed by [10, 20]",
      "[10, 20] followed by [10, 20]",
      "TypeError: Mutable default argument"
    ],
    correctAnswerIndex: 1,
    explanation: "In Python, default argument values like `item_list=[]` are evaluated ONCE when the function is defined, so the same list object is mutated across calls!"
  },
  {
    id: "quiz-comm-1",
    type: "communication",
    title: "Choose the Professional Follow-up Sentence",
    prompt: "You sent your resume to a recruiter 5 days ago. Which option is the most professional follow-up email sentence?",
    options: [
      "Hey, did you see my resume yet? Please give me an update ASAP.",
      "Dear [Recruiter Name], I am following up on my application for the Software Developer Intern role and wanted to reaffirm my enthusiasm for the opportunity.",
      "Respected Sir, why haven't I received an interview call yet?",
      "Checking in to see if you hired anyone yet."
    ],
    correctAnswerIndex: 1,
    explanation: "Option B uses polite, professional language, specifies the target role, and expresses enthusiasm without sounding demanding."
  },
  {
    id: "quiz-tech-1",
    type: "technical_quiz",
    title: "HTTP Status Codes Check",
    prompt: "Which HTTP status code signifies that a client request lacks valid authentication credentials for a REST API endpoint?",
    options: [
      "404 Not Found",
      "401 Unauthorized",
      "500 Internal Server Error",
      "403 Forbidden"
    ],
    correctAnswerIndex: 1,
    explanation: "401 Unauthorized means the request lacks valid authentication credentials. 403 Forbidden means the server understands who you are but denies access."
  }
];
