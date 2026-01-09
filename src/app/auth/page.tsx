"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

export default function AuthPage() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Frontend-only authentication
    login(email, password);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Panel - Glowing Background */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-zinc-950 items-center justify-center overflow-hidden">
        {/* Larger, darker orb */}
        <div className="absolute h-[600px] w-[600px] rounded-[48px] blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,rgba(6,182,212,0.2)_40%,transparent_75%)] animate-[fadeInDark_1.5s_ease-out_forwards,dropMorph_20s_ease-in-out_infinite_2s] [animation-fill-mode:forwards,none]" />

        {/* Brighter orb */}
        <div className="absolute h-[400px] w-[500px] rounded-[48px] blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.5)_0%,rgba(6,182,212,0.35)_40%,transparent_75%)] animate-[fadeInBright_1.5s_ease-out_0.3s_forwards,dropMorph_16s_ease-in-out_infinite_2.3s] [animation-fill-mode:forwards,none]" />

        {/* Floating tooth image */}
        <div className="relative z-10 animate-[slideUpFadeIn_1.2s_ease-out_0.6s_forwards,float_6s_ease-in-out_infinite_1.8s]">
          <Image
            src="/images/tooth.png"
            alt="Tooth"
            width={300}
            height={300}
            className="opacity-90 drop-shadow-[0_35px_45px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Branding text */}
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <h1 className="text-4xl font-bold text-zinc-100 mb-4 font-raleway">
            ToothWise
          </h1>
          <p className="text-lg text-zinc-400 max-w-md">
            Your AI-powered virtual dental patient, here to improve your diagnosis skills.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-sm text-zinc-500">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Enter your email below to create your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-lg bg-[linear-gradient(to_right,rgba(59,130,246,0.9),rgba(6,182,212,0.8))] hover:bg-[linear-gradient(to_right,rgba(59,130,246,1),rgba(6,182,212,0.9))] text-white font-medium"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <p className="px-8 text-center text-sm text-zinc-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="underline underline-offset-4 hover:text-zinc-300 transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>

          <p className="px-8 text-center text-xs text-zinc-500">
            By clicking continue, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-zinc-300"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-zinc-300"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
