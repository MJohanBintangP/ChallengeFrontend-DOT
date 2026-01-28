import { useContext } from "react";
import { QuizContext } from "../store/QuizProvider";
import { QUIZ_ACTIONS } from "../store/quizReducer";
import { fetchQuestions } from "../services/triviaService";

export const useQuiz = () => {
  const { state, dispatch } = useContext(QuizContext);

  const startQuiz = async () => {
    const questions = await fetchQuestions(5);

    dispatch({
      type: QUIZ_ACTIONS.LOAD_QUESTIONS_SUCCESS,
      payload: questions,
    });

    dispatch({
      type: QUIZ_ACTIONS.START_QUIZ,
      payload: { time: 60 },
    });
  };

  const selectAnswer = (answer, correctAnswer) => {
    dispatch({
      type: QUIZ_ACTIONS.SELECT_ANSWER,
      payload: {
        answer,
        isCorrect: answer === correctAnswer,
      },
    });

    dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION });
  };

  return {
    state,
    startQuiz,
    selectAnswer,
  };
};
