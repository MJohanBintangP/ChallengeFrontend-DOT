export const initialQuizState = {
  status: "idle",
  questions: [],
  currentIndex: 0,
  answers: [],
  result: {
    correct: 0,
    wrong: 0,
    answered: 0,
  },
  timeLeft: 0,
};

export const QUIZ_ACTIONS = {
  START_QUIZ: "START_QUIZ",
  LOAD_QUESTIONS_SUCCESS: "LOAD_QUESTIONS_SUCCESS",
  SELECT_ANSWER: "SELECT_ANSWER",
  NEXT_QUESTION: "NEXT_QUESTION",
  TIME_TICK: "TIME_TICK",
  TIME_UP: "TIME_UP",
  FINISH_QUIZ: "FINISH_QUIZ",
  RESUME_QUIZ: "RESUME_QUIZ",
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case QUIZ_ACTIONS.START_QUIZ:
      return {
        ...state,
        status: "running",
        timeLeft: action.payload.time,
      };

    case QUIZ_ACTIONS.LOAD_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
      };

    case QUIZ_ACTIONS.SELECT_ANSWER: {
      const { isCorrect, answer } = action.payload;

      return {
        ...state,
        answers: [...state.answers, answer],
        result: {
          correct: state.result.correct + (isCorrect ? 1 : 0),
          wrong: state.result.wrong + (!isCorrect ? 1 : 0),
          answered: state.result.answered + 1,
        },
      };
    }

    case QUIZ_ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };

    case QUIZ_ACTIONS.TIME_TICK:
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    case QUIZ_ACTIONS.TIME_UP:
      return {
        ...state,
        status: "finished",
      };

    case QUIZ_ACTIONS.FINISH_QUIZ:
      return {
        ...state,
        status: "finished",
      };

    case QUIZ_ACTIONS.RESUME_QUIZ:
      return action.payload;

    default:
      return state;
  }
};
