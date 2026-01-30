import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, XCircle, Trophy, RotateCcw, LogOut } from "lucide-react";

const ResultContainer = ({ children }) => (
  <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/30">
    {children}
  </div>
);

const StatCard = ({ icon: Icon, label, value, variant = "default" }) => {
  const variantStyles = {
    success:
      "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
    default: "bg-card border-border",
  };

  const IconComponent = Icon;

  return (
    <div className={`rounded-lg border p-4 ${variantStyles[variant]}`}>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-background/50 p-2">
          <IconComponent className="size-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

const ScoreDisplay = ({ correct, total }) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPassed = percentage >= 60;

  return (
    <div className="text-center space-y-2 py-6">
      <div className="flex justify-center">
        <Trophy
          className={`size-16 ${
            isPassed ? "text-yellow-500" : "text-muted-foreground"
          }`}
        />
      </div>
      <div>
        <p className="text-5xl font-bold">{percentage}%</p>
        <p className="text-muted-foreground mt-1">
          {isPassed ? "Luar biasa!" : "Tetap semangat!"}
        </p>
      </div>
    </div>
  );
};

const Result = ({ state, onRestart, onLogout }) => {
  const { answers, questions } = state;
  const totalQuestions = questions.length;
  const answeredCount = answers.length;
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const wrongCount = answeredCount - correctCount;

  return (
    <ResultContainer>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Hasil Kuis
          </CardTitle>
          <CardDescription className="text-center">
            Berikut adalah ringkasan hasil kuis Anda
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <ScoreDisplay correct={correctCount} total={totalQuestions} />

          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={CheckCircle2}
              label="Benar"
              value={correctCount}
              variant="success"
            />
            <StatCard
              icon={XCircle}
              label="Salah"
              value={wrongCount}
              variant="error"
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Soal Dijawab</span>
              <span className="font-medium text-foreground">
                {answeredCount} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(answeredCount / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer"
            onClick={onRestart}
          >
            <RotateCcw className="size-4 mr-2" />
            Ulangi Kuis
          </Button>
          <Button
            variant="destructive"
            className="flex-1 cursor-pointer"
            onClick={onLogout}
          >
            <LogOut className="size-4 mr-2" />
            Log Out
          </Button>
        </CardFooter>
      </Card>
    </ResultContainer>
  );
};

export default Result;
