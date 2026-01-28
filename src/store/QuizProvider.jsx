import { createContext, useReducer } from "react";
import { quizReducer, initialQuizState } from "./quizReducer";

export const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
