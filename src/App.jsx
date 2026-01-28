import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./store/QuizProvider";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
