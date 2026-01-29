import { useEffect, useReducer } from "react";
import { quizReducer, initialState } from "./useQuizReducer";
import { saveState, loadState, clearState } from "../store/localStorage";

const STORAGE_KEY = "quizState";
const SOAL_API = "https://opentdb.com/api.php?amount=10";

function shuffle(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function useQuiz() {
  const [state, dispatch] = useReducer(
    quizReducer,
    loadState(STORAGE_KEY) || initialState,
  );

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const answerQuestion = (answer) => {
    dispatch({ type: "ANSWER", payload: answer });
  };

  const tick = () => {
    dispatch({ type: "TICK" });
  };

  const restart = () => {
    clearState(STORAGE_KEY);
    dispatch({ type: "RESTART" });
  };

  useEffect(() => {
    if (!state.isLoggedIn || state.questions.length > 0) return;

    const fetchQuestions = async () => {
      try {
        const res = await fetch(SOAL_API);
        if (!res.ok) throw new Error("Fetch gagal");

        const data = await res.json();
        if (!Array.isArray(data.results) || data.results.length === 0) {
          alert("Soal tidak tersedia");
          dispatch({ type: "SET_QUESTIONS", payload: [] });
          return;
        }

        const questions = data.results.map((q) => ({
          ...q,
          options: shuffle([q.correct_answer, ...q.incorrect_answers]),
        }));

        dispatch({ type: "SET_QUESTIONS", payload: questions });
      } catch {
        alert("Gagal mengambil soal");
        dispatch({ type: "SET_QUESTIONS", payload: [] });
      }
    };

    fetchQuestions();
  }, [state.isLoggedIn, state.questions.length]);

  useEffect(() => {
    if (state.isLoggedIn && !state.showResult) {
      saveState(STORAGE_KEY, state);
    }
  }, [state]);

  return {
    state,
    login,
    answerQuestion,
    tick,
    restart,
  };
}
