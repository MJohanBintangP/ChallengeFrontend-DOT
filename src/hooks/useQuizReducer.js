export const initialState = {
  isLoggedIn: false,
  user: null,
  questions: [],
  current: 0,
  answers: [],
  timer: 60,
  showResult: false,
  loading: false,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        loading: true,
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
        loading: true,
      };

    case "RESUME":
      return { ...action.payload };

    default:
      return state;
  }
}
