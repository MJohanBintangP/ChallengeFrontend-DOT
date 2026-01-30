import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { quizReducer, initialState } from "./useQuizReducer";
import { saveState, loadState, clearState } from "../store/localStorage";
import { loginWithUserTable, registerWithUserTable } from "../store/auth";
import { fetchOpenTdbQuestions } from "../lib/opentdb";

const STORAGE_KEY = "quizState";

const DEFAULT_QUESTION_PARAMS = {
  amount: 10,
};

function isPlainObject(value) {
  return (
    value != null &&
    typeof value === "object" &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

export function useQuiz() {
  const [state, dispatch] = useReducer(
    quizReducer,
    initialState,
    (init) => loadState(STORAGE_KEY) || init,
  );

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authMessage, setAuthMessage] = useState(null);

  const fetchQuestions = useCallback(
    async (params = DEFAULT_QUESTION_PARAMS) => {
      dispatch({ type: "QUIZ_LOADING" });

      try {
        const questions = await fetchOpenTdbQuestions(params);

        if (questions.length === 0) {
          dispatch({
            type: "SET_ERROR",
            payload: "Soal tidak tersedia",
          });
          return;
        }

        dispatch({ type: "SET_QUESTIONS", payload: questions });
      } catch {
        dispatch({
          type: "SET_ERROR",
          payload: "Gagal mengambil soal",
        });
      }
    },
    [],
  );

  const emit = useCallback(
    async (event) => {
      switch (event?.type) {
        case "AUTH_LOGIN": {
          const { username, password } = event.payload || {};
          setAuthError(null);
          setAuthMessage(null);
          setAuthLoading(true);

          const result = await loginWithUserTable({ username, password });
          setAuthLoading(false);

          if (!result.ok) {
            setAuthError(result.error);
            return;
          }

          dispatch({ type: "LOGIN", payload: result.user.username });
          return;
        }

        case "AUTH_REGISTER": {
          const { username, password } = event.payload || {};
          setAuthError(null);
          setAuthMessage(null);
          setAuthLoading(true);

          const result = await registerWithUserTable({ username, password });
          setAuthLoading(false);

          if (!result.ok) {
            setAuthError(result.error);
            return;
          }

          setAuthMessage("Register berhasil. Anda sudah login.");
          dispatch({ type: "LOGIN", payload: result.user.username });
          return;
        }

        case "QUIZ_FETCH_QUESTIONS": {
          const payload = isPlainObject(event.payload) ? event.payload : {};
          const mergedParams = {
            ...DEFAULT_QUESTION_PARAMS,
            ...(typeof payload.amount === "number"
              ? { amount: payload.amount }
              : {}),
            ...(typeof payload.category === "number"
              ? { category: payload.category }
              : {}),
            ...(typeof payload.difficulty === "string"
              ? { difficulty: payload.difficulty }
              : {}),
            ...(typeof payload.type === "string" ? { type: payload.type } : {}),
          };
          await fetchQuestions(mergedParams);
          return;
        }

        case "QUIZ_RESUME": {
          const saved = loadState(STORAGE_KEY);
          if (saved) dispatch({ type: "RESUME", payload: saved });
          return;
        }

        case "QUIZ_ANSWER": {
          dispatch({ type: "ANSWER", payload: event.payload });
          return;
        }

        case "QUIZ_TICK": {
          dispatch({ type: "TICK" });
          return;
        }

        case "QUIZ_RESTART": {
          dispatch({ type: "RESTART" });
          return;
        }

        case "AUTH_LOGOUT": {
          clearState(STORAGE_KEY);
          dispatch({ type: "LOGOUT" });
          return;
        }

        default:
          return;
      }
    },
    [fetchQuestions],
  );

  const login = useCallback(
    async ({ username, password }) =>
      emit({ type: "AUTH_LOGIN", payload: { username, password } }),
    [emit],
  );

  const register = useCallback(
    async ({ username, password }) =>
      emit({ type: "AUTH_REGISTER", payload: { username, password } }),
    [emit],
  );

  const resume = useCallback(() => emit({ type: "QUIZ_RESUME" }), [emit]);

  const canResume = useMemo(() => {
    if (!state.isLoggedIn) return false;
    const saved = loadState(STORAGE_KEY);
    return Boolean(saved && !saved.showResult && saved.questions?.length > 0);
  }, [state.isLoggedIn]);

  const startQuiz = useCallback(
    (params) => {
      if (state.loading) return;

      const safeParams = isPlainObject(params) ? params : undefined;
      emit({ type: "QUIZ_FETCH_QUESTIONS", payload: safeParams });
    },
    [emit, state.loading],
  );

  const answerQuestion = useCallback(
    (answer) => emit({ type: "QUIZ_ANSWER", payload: answer }),
    [emit],
  );

  const tick = useCallback(() => emit({ type: "QUIZ_TICK" }), [emit]);

  const restart = useCallback(() => emit({ type: "QUIZ_RESTART" }), [emit]);

  const logout = useCallback(() => emit({ type: "AUTH_LOGOUT" }), [emit]);

  useEffect(() => {
    if (state.isLoggedIn) {
      saveState(STORAGE_KEY, state);
    }
  }, [state]);

  return {
    state,
    emit,
    login,
    register,
    resume,
    canResume,
    startQuiz,
    authLoading,
    authError,
    authMessage,
    answerQuestion,
    tick,
    restart,
    logout,
  };
}
