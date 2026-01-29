import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./store/QuizProvider";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Login from "./pages/Login";

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
