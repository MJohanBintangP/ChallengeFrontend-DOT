import { useQuiz } from "../hooks/useQuiz";
import { useTimer } from "../hooks/useTimer";
import QuestionCard from "../components/QuestionCard";

const Quiz = () => {
  const { state, startQuiz, selectAnswer } = useQuiz();
  useTimer(state.timeLeft, state.dispatch);

  if (state.status === "idle") {
    return <button onClick={startQuiz}>Start Quiz</button>;
  }

  if (state.status === "finished") {
    return <div>Quiz Finished</div>;
  }

  const question = state.questions[state.currentIndex];
  if (!question) return null;

  return (
    <>
      <p>Time left: {state.timeLeft}</p>
      <QuestionCard
        question={question.question}
        answers={question.shuffledAnswers}
        onSelect={(a) => selectAnswer(a, question.correct_answer)}
      />
    </>
  );
};

export default Quiz;
