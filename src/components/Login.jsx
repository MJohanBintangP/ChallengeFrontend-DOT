import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = ({ onSubmit, onRegister, loading, error, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");

  const isRegister = mode === "register";

  const title = isRegister ? "Register" : "Login";
  const description = isRegister
    ? "Buat akun dengan username dan password."
    : "Masukkan username dan password.";

  const primaryButtonText = loading
    ? isRegister
      ? "Registering..."
      : "Logging in..."
    : isRegister
      ? "Register"
      : "Login";

  const handleToggleMode = () => {
    setMode((currentMode) => (currentMode === "login" ? "register" : "login"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { username, password };

    if (isRegister) {
      onRegister?.(payload);
      return;
    }

    onSubmit?.(payload);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="fixed top-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
        {error ? (
          <Alert
            key={`error:${error}`}
            variant="destructive"
            className="toast-auto-hide"
          >
            <AlertTriangle />
            <AlertTitle>Gagal</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {message ? (
          <Alert key={`message:${message}`} className="toast-auto-hide">
            <CheckCircle2 />
            <AlertTitle>Berhasil</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {primaryButtonText}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {isRegister ? (
            <p className="text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 cursor-pointer"
                disabled={loading}
                onClick={handleToggleMode}
              >
                Login
              </Button>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 cursor-pointer"
                disabled={loading}
                onClick={handleToggleMode}
              >
                Daftar
              </Button>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
