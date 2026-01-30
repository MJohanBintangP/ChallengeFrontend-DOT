export const initialState = {
  isLoggedIn: false,
  user: null,
  questions: [],
  current: 0,
  answers: [],
  timer: 60,
  showResult: false,
  loading: false,
  error: null,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading: false,
        error: null,
      };

    case "QUIZ_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        loading: false,
        current: 0,
        answers: [],
        timer: 60,
        showResult: false,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        questions: [],
        current: 0,
        answers: [],
        showResult: false,
        error: action.payload,
      };

    case "ANSWER": {
      const q = state.questions[state.current];
      const isCorrect = action.payload === q.correct_answer;

      const answers = [...state.answers, { answer: action.payload, isCorrect }];

      const next = state.current + 1;

      return next >= state.questions.length
        ? { ...state, answers, showResult: true }
        : { ...state, answers, current: next };
    }

    case "TICK":
      return state.timer <= 1
        ? { ...state, timer: 0, showResult: true }
        : { ...state, timer: state.timer - 1 };

    case "RESTART":
      return {
        ...initialState,
        isLoggedIn: true,
        user: state.user,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return { ...initialState };

    case "RESUME":
      return {
        ...action.payload,
        isLoggedIn: true,
        user: state.user ?? action.payload?.user ?? null,
      };

    default:
      return state;
  }
}
