import QuizContainer from "@/components/assessment/QuizContainer";

export const metadata = {
  title: "Market Signal Assessment | Origo",
  description: "Discover your business readiness score in 3 minutes",
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-origo-black">
      <QuizContainer />
    </main>
  );
}