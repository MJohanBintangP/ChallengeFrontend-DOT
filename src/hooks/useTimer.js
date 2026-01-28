import { useEffect, useContext } from "react";
import { QuizContext } from "../store/QuizProvider";
import { QUIZ_ACTIONS } from "../store/quizReducer";

export const useTimer = (timeLeft) => {
  const { dispatch } = useContext(QuizContext);

  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch({ type: QUIZ_ACTIONS.TIME_UP });
      return;
    }

    const interval = setInterval(() => {
      dispatch({ type: QUIZ_ACTIONS.TIME_TICK });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, dispatch]);
};
