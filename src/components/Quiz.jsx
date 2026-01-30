import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, HelpCircle } from "lucide-react";

const CHAR_CODE_A = 65;
const TIMER_WARNING_THRESHOLD = 10;

const QuizContainer = ({ children }) => (
  <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/30">
    {children}
  </div>
);

const LoadingState = () => (
  <QuizContainer>
    <Card className="w-full max-w-2xl">
      <CardContent className="pt-6">
        <p className="text-center text-muted-foreground">Loading...</p>
      </CardContent>
    </Card>
  </QuizContainer>
);

const ErrorState = ({ message, onRetry }) => (
  <QuizContainer>
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Gagal memuat soal</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full cursor-pointer" onClick={() => onRetry?.()}>
          Coba Lagi
        </Button>
      </CardContent>
    </Card>
  </QuizContainer>
);

const StartState = ({ onStart, onLogout }) => (
  <QuizContainer>
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Siap mulai kuis?</CardTitle>
        <CardDescription>Tekan Start untuk memulai kuiz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full cursor-pointer" onClick={() => onStart?.()}>
          Start Quiz
        </Button>
        {onLogout ? (
          <Button
            variant="destructive"
            className="w-full cursor-pointer"
            onClick={() => onLogout?.()}
          >
            Log Out
          </Button>
        ) : null}
      </CardContent>
    </Card>
  </QuizContainer>
);

const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full bg-secondary rounded-full h-2 mb-4">
      <div
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const QuizHeader = ({ current, total, timer }) => {
  const isTimerWarning = timer <= TIMER_WARNING_THRESHOLD;

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <CardDescription className="flex items-center gap-2">
          <HelpCircle className="size-4" />
          Soal {current + 1} dari {total}
        </CardDescription>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="size-4" />
          <span className={isTimerWarning ? "text-destructive" : ""}>
            {timer}s
          </span>
        </div>
      </div>
      <ProgressBar current={current} total={total} />
    </>
  );
};

const QuizOption = ({ option, index, onSelect }) => {
  const label = String.fromCharCode(CHAR_CODE_A + index);

  return (
    <Button
      variant="outline"
      className="cursor-pointer w-full h-auto min-h-12 text-left justify-start px-4 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
      onClick={() => onSelect(option)}
    >
      <span className="flex items-center gap-3">
        <span className="flex size-6 items-center justify-center rounded-full border-2 border-current shrink-0 font-semibold text-xs">
          {label}
        </span>
        <span className="flex-1">{option}</span>
      </span>
    </Button>
  );
};

const Quiz = ({
  state,
  onAnswer,
  onRetry,
  onStart,
  canResume,
  onResume,
  onLogout,
}) => {
  const { questions, current, timer, loading, error } = state;
  const currentQuestion = questions[current];

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (questions.length === 0) {
    return (
      <StartState
        onStart={onStart}
        canResume={canResume}
        onResume={onResume}
        onLogout={onLogout}
      />
    );
  }

  if (!currentQuestion) {
    return <LoadingState />;
  }

  return (
    <QuizContainer>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <QuizHeader
            current={current}
            total={questions.length}
            timer={timer}
          />
          <CardTitle
            className="text-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />
        </CardHeader>

        <CardContent>
          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                onSelect={onAnswer}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </QuizContainer>
  );
};

export default Quiz;
