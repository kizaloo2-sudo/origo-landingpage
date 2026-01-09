export interface QuestionOption {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  category: string;
  text: string;
  type: "text" | "email" | "select" | "textarea";
  weight: number;
  options?: QuestionOption[] | string[];
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  // --- PART 1: IDENTITY (Lead Capture - Not Scored) ---
  {
    id: "q1",
    category: "IDENTITY",
    text: "Your Name",
    type: "text",
    weight: 0,
  },
  {
    id: "q2",
    category: "IDENTITY",
    text: "Your Email",
    type: "email",
    weight: 0,
  },
  {
    id: "q3",
    category: "IDENTITY",
    text: "Your Role",
    type: "select",
    weight: 0,
    options: [
      "Founder / Owner",
      "CEO / Managing Director",
      "Commercial / Sales Lead",
      "Strategy / BD",
      "Other",
    ],
  },
  {
    id: "q4",
    category: "IDENTITY",
    text: "Company Industry",
    type: "select",
    weight: 0,
    options: [
      "Tech / SaaS",
      "Manufacturing",
      "Retail / E-commerce",
      "Professional Services",
      "Finance / Real Estate",
      "Other",
    ],
  },

  // --- PART 2: SIGNAL-TO-NOISE BASELINE (Scored: Q5-Q14) ---

  // MARKET SIGNAL CLARITY
  {
    id: "q5",
    category: "MARKET_SIGNAL",
    text: "Do you have clear evidence of active buyers in your target market (not just interest)?",
    type: "select",
    weight: 3,
    options: [
      { label: "Yes, verified by recent deals", value: 3 },
      { label: "Some signals, but not consistent", value: 2 },
      { label: "Mostly assumptions", value: 1 },
      { label: "No clear visibility", value: 0 },
    ],
  },
  {
    id: "q6",
    category: "MARKET_SIGNAL",
    text: "Can you clearly explain why customers choose you over alternatives?",
    type: "select",
    weight: 3,
    options: [
      { label: "Very clear", value: 3 },
      { label: "Somewhat clear", value: 2 },
      { label: "Unclear", value: 1 },
      { label: "We are guessing", value: 0 },
    ],
  },
  {
    id: "q7",
    category: "MARKET_SIGNAL",
    text: "Do you know which markets or segments you should not pursue right now?",
    type: "select",
    weight: 3,
    options: [
      { label: "Yes, clearly defined", value: 3 },
      { label: "Some idea", value: 2 },
      { label: "Not really", value: 1 },
      { label: "We try everything", value: 0 },
    ],
  },

  // CUSTOMER PRIORITY & CAC
  {
    id: "q8",
    category: "CUSTOMER_PRIORITY",
    text: "Are your sales efforts focused on a defined buyer profile?",
    type: "select",
    weight: 3,
    options: [
      { label: "Very focused", value: 3 },
      { label: "Somewhat focused", value: 2 },
      { label: "Broad targeting", value: 1 },
      { label: "No clear prioritisation", value: 0 },
    ],
  },
  {
    id: "q9",
    category: "CUSTOMER_PRIORITY",
    text: "How confident are you that your current CAC is justified by LTV?",
    type: "select",
    weight: 3,
    options: [
      { label: "Very confident", value: 3 },
      { label: "Somewhat confident", value: 2 },
      { label: "Unsure", value: 1 },
      { label: "We don't track this clearly", value: 0 },
    ],
  },
  {
    id: "q10",
    category: "CUSTOMER_PRIORITY",
    text: "How much time or budget is currently spent on low-conversion prospects?",
    type: "select",
    weight: 3,
    options: [
      { label: "Very little", value: 3 },
      { label: "Some", value: 2 },
      { label: "A lot", value: 1 },
      { label: "We don't know", value: 0 },
    ],
  },

  // EXECUTION & DECISION STRUCTURE
  {
    id: "q11",
    category: "EXECUTION",
    text: "Do you have a structured way to decide where to sell next?",
    type: "select",
    weight: 3,
    options: [
      { label: "Yes, systematic", value: 3 },
      { label: "Partially structured", value: 2 },
      { label: "Ad-hoc", value: 1 },
      { label: "Based on intuition", value: 0 },
    ],
  },
  {
    id: "q12",
    category: "EXECUTION",
    text: "Before launching campaigns or attending events, do you validate demand?",
    type: "select",
    weight: 3,
    options: [
      { label: "Always", value: 3 },
      { label: "Sometimes", value: 2 },
      { label: "Rarely", value: 1 },
      { label: "Never", value: 0 },
    ],
  },
  {
    id: "q13",
    category: "EXECUTION",
    text: "Are key go-to-market decisions documented and repeatable?",
    type: "select",
    weight: 3,
    options: [
      { label: "Fully documented", value: 3 },
      { label: "Partially", value: 2 },
      { label: "Mostly in people's heads", value: 1 },
      { label: "Not at all", value: 0 },
    ],
  },

  // SIGNAL CONFIDENCE
  {
    id: "q14",
    category: "CONFIDENCE",
    text: "If you stopped all marketing for 60 days, would you still know where demand exists?",
    type: "select",
    weight: 3,
    options: [
      { label: "Yes", value: 3 },
      { label: "Probably", value: 2 },
      { label: "Not sure", value: 1 },
      { label: "No", value: 0 },
    ],
  },

  // --- PART 3: QUALIFICATION QUESTIONS (Strategic - Not Scored) ---
  {
    id: "q15",
    category: "STRATEGY",
    text: "Which best describes your current situation?",
    type: "select",
    weight: 0,
    options: [
      "Early growth",
      "Scaling",
      "Mature but inefficient",
      "Exploring new markets",
    ],
  },
  {
    id: "q16",
    category: "STRATEGY",
    text: "What outcome matters most in the next 90 days?",
    type: "select",
    weight: 0,
    options: [
      "More qualified leads",
      "Lower CAC",
      "Better conversion",
      "Clear market direction",
    ],
  },
  {
    id: "q17",
    category: "STRATEGY",
    text: "What do you believe is your biggest obstacle?",
    type: "select",
    weight: 0,
    options: [
      "Wrong market focus",
      "Low-quality leads",
      "High CAC",
      "Unclear positioning",
    ],
  },
  {
    id: "q18",
    category: "STRATEGY",
    text: "What type of support would help most?",
    type: "select",
    weight: 0,
    options: [
      "Direction & insight",
      "Strategy design",
      "Execution support",
      "Full advisory",
    ],
  },
  {
    id: "q19",
    category: "STRATEGY",
    text: "Is there anything important we should know?",
    type: "textarea",
    weight: 0,
  },
];

// Helper: Get total number of questions
export const TOTAL_QUESTIONS = ASSESSMENT_QUESTIONS.length;

// Helper: Get only scored questions (Q5-Q14)
export const SCORED_QUESTIONS = ASSESSMENT_QUESTIONS.filter(
  (q) => q.weight > 0
);

// Helper: Calculate max possible score
export const MAX_SCORE = SCORED_QUESTIONS.reduce(
  (sum, q) => sum + q.weight,
  0
);