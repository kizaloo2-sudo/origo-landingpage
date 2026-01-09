import { create } from "zustand";
import { ASSESSMENT_QUESTIONS, MAX_SCORE, Question } from "@/data/questions";
import { submitAssessment } from "@/services/assessment-service";

interface Answer {
  questionId: string;
  value: string | number;
}

interface ContactInfo {
  name: string;
  email: string;
  role: string;
  industry: string;
}

interface QuizState {
  currentStep: number;
  answers: Answer[];
  contactInfo: ContactInfo | null;
  isSubmitting: boolean;
  submissionError: string | null;
  hasSubmitted: boolean;
  lastSubmissionId?: string;

  // Actions
  setAnswer: (questionId: string, value: string | number) => void;
  setContactInfo: (info: ContactInfo) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  submitQuiz: () => Promise<unknown>;
  reset: () => void;

  // Getters
  getCurrentQuestion: () => Question | undefined;
  getAnswer: (questionId: string) => string | number | undefined;
  calculateScore: () => number;
  calculateScorePercentage: () => number;
  getTier: () => string;
  isQuizComplete: () => boolean;
  getContactInfo: () => ContactInfo | null;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  currentStep: 0,
  answers: [],
  contactInfo: null,
  isSubmitting: false,
  submissionError: null,
  hasSubmitted: false,
  lastSubmissionId: undefined,

  // Set answer for a question
  setAnswer: (questionId, value) => {
    set((state) => {
      const existingIndex = state.answers.findIndex(
        (a) => a.questionId === questionId
      );

      if (existingIndex >= 0) {
        // Update existing answer
        const newAnswers = [...state.answers];
        newAnswers[existingIndex] = { questionId, value };
        return { answers: newAnswers };
      } else {
        // Add new answer
        return {
          answers: [...state.answers, { questionId, value }],
        };
      }
    });
  },

  // Set contact information
  setContactInfo: (info) => {
    set({ contactInfo: info });
  },

  // Navigate to next step
  nextStep: () => {
    set((state) => ({
      currentStep: Math.min(
        state.currentStep + 1,
        ASSESSMENT_QUESTIONS.length - 1
      ),
    }));
  },

  // Navigate to previous step
  previousStep: () => {
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    }));
  },

  // Go to specific step
  goToStep: (step) => {
    set({
      currentStep: Math.max(
        0,
        Math.min(step, ASSESSMENT_QUESTIONS.length - 1)
      ),
    });
  },

  // Get contact info from answers (Q1-Q4)
  getContactInfo: () => {
    const state = get();
    
    const name = state.answers.find(a => a.questionId === 'q1')?.value || '';
    const email = state.answers.find(a => a.questionId === 'q2')?.value || '';
    const role = state.answers.find(a => a.questionId === 'q3')?.value || '';
    const industry = state.answers.find(a => a.questionId === 'q4')?.value || '';

    if (name && email && role && industry) {
      return {
        name: String(name),
        email: String(email),
        role: String(role),
        industry: String(industry),
      };
    }

    return null;
  },

  // Submit quiz to Supabase (Enhanced with better error handling)
  submitQuiz: async () => {
    const state = get();

    // Clear previous errors
    set({ submissionError: null });

    // Get contact info from answers automatically
    const contactInfo = get().getContactInfo();

    if (!contactInfo) {
      const errorMsg = "กรุณากรอกข้อมูลติดต่อให้ครบถ้วน (ชื่อ, อีเมล, ตำแหน่ง, อุตสาหกรรม)";
      set({ submissionError: errorMsg });
      throw new Error(errorMsg);
    }

    if (!state.isQuizComplete()) {
      const errorMsg = "กรุณาตอบคำถามให้ครบทุกข้อ";
      set({ submissionError: errorMsg });
      throw new Error(errorMsg);
    }

    // Prevent double-submission on store-level
    if (get().hasSubmitted) {
      const msg = 'This quiz has already been submitted.';
      set({ submissionError: msg });
      throw new Error(msg);
    }

    set({ isSubmitting: true, submissionError: null });

    try {
      // Calculate final score
      const rawScore = get().calculateScore();
      const scorePercentage = get().calculateScorePercentage();
      const tierName = get().getTier();

      // Transform answers to match the expected format
      const formattedAnswers = state.answers.map((answer) => {
        const question = ASSESSMENT_QUESTIONS.find(q => q.id === answer.questionId);
        
        if (!question) {
          return {
            questionId: answer.questionId,
            question: 'Unknown question',
            answer: String(answer.value),
            score: 0
          };
        }

        // Get the answer text and score
        let answerText = String(answer.value);
        let answerScore = 0;

        // For select questions with options
        if (question.options && question.weight > 0) {
          if (typeof answer.value === 'number') {
            // Direct score value
            answerScore = answer.value;
            // Find the label for this score
            const option = question.options.find(
              opt => typeof opt === 'object' && opt.value === answer.value
            );
            if (option && typeof option === 'object') {
              answerText = option.label;
            }
          } else {
            // Answer is a label, find the score
            const option = question.options.find(
              opt => typeof opt === 'object' && opt.label === answer.value
            );
            if (option && typeof option === 'object') {
              answerScore = option.value;
              answerText = option.label;
            }
          }
        }

        return {
          questionId: answer.questionId,
          question: question.text,
          answer: answerText,
          score: answerScore
        };
      });

      console.log('📋 Preparing submission:', {
        rawScore,
        scorePercentage,
        tier: tierName,
        answersCount: formattedAnswers.length,
        contactEmail: contactInfo.email
      });

      // Submit to Supabase via Server Action
      const result = await submitAssessment({
        score: rawScore, // Send raw score, not percentage
        tier: tierName,
        contactInfo: contactInfo,
        answers: formattedAnswers, // Send formatted answers
      });

      console.log("✅ ส่งแบบประเมินสำเร็จ:", result);

      // Mark as submitted to prevent duplicates
      const insertedId = result?.[0]?.id || undefined;

      // Persist a lightweight result snapshot in sessionStorage so Results page can show
      // even if the client store is reset (e.g., full page navigation).
      try {
        if (typeof window !== 'undefined') {
          const snapshot = JSON.stringify({
            answers: state.answers,
            contactInfo,
            score: rawScore,
            scorePercentage,
            tier: tierName,
            submissionId: insertedId,
          });
          sessionStorage.setItem('last_quiz_result', snapshot);
        }
      } catch (e) {
        // ignore storage errors
      }

      set({ isSubmitting: false, hasSubmitted: true, lastSubmissionId: insertedId });
      
      return result;

    } catch (error) {
      console.error("❌ Error submitting assessment:", error);
      
      // Extract meaningful error message
      let errorMessage = "ไม่สามารถส่งแบบประเมินได้ กรุณาลองใหม่อีกครั้ง";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      set({
        isSubmitting: false,
        submissionError: errorMessage,
      });
      
      throw error;
    }
  },

  // Reset quiz
  reset: () => {
    set({
      currentStep: 0,
      answers: [],
      contactInfo: null,
      isSubmitting: false,
      submissionError: null,
      hasSubmitted: false,
      lastSubmissionId: undefined,
    });
  },

  // Get current question
  getCurrentQuestion: () => {
    const state = get();
    return ASSESSMENT_QUESTIONS[state.currentStep];
  },

  // Get answer for specific question
  getAnswer: (questionId) => {
    const state = get();
    const answer = state.answers.find((a) => a.questionId === questionId);
    return answer?.value;
  },

  // Calculate raw score (sum of points)
  calculateScore: () => {
    const state = get();
    let totalScore = 0;

    state.answers.forEach((answer) => {
      const question = ASSESSMENT_QUESTIONS.find(
        (q) => q.id === answer.questionId
      );

      if (question && question.weight > 0) {
        // For scored questions with options
        if (typeof answer.value === "number") {
          totalScore += answer.value;
        } else if (question.options) {
          const option = question.options.find(
            (opt) => typeof opt === "object" && opt.label === answer.value
          );
          if (option && typeof option === "object" && "value" in option) {
            totalScore += option.value;
          }
        }
      }
    });

    return totalScore;
  },

  // Calculate score as percentage
  calculateScorePercentage: () => {
    const score = get().calculateScore();
    return MAX_SCORE > 0 ? Math.round((score / MAX_SCORE) * 100) : 0;
  },

  // Get tier based on score
  getTier: () => {
    const percentage = get().calculateScorePercentage();

    if (percentage <= 40) {
      return "Noise-Driven Execution";
    } else if (percentage <= 70) {
      return "Partial Signal Clarity";
    } else {
      return "Signal-Driven Growth";
    }
  },

  // Check if all required questions are answered
  isQuizComplete: () => {
    const state = get();
    
    // Check contact info (Q1-Q4)
    const hasContactInfo = get().getContactInfo() !== null;
    if (!hasContactInfo) return false;

    // Check scored questions (Q5-Q14)
    const scoredQuestions = ASSESSMENT_QUESTIONS.filter((q) => q.weight > 0);
    return scoredQuestions.every((question) => {
      return state.answers.some((answer) => answer.questionId === question.id);
    });
  },
}));