"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function BillingPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 w-full relative min-h-screen">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        {/* Large orb top left */}
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.35)_0%,rgba(6,182,212,0.25)_40%,transparent_75%)] animate-[fadeInDark_1.5s_ease-out_forwards,dropMorph_25s_ease-in-out_infinite_2s]" />

        {/* Medium orb top right */}
        <div className="absolute top-20 -right-32 h-[400px] w-[400px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.35)_0%,rgba(59,130,246,0.25)_40%,transparent_75%)] animate-[fadeInBright_1.5s_ease-out_0.3s_forwards,dropMorph_20s_ease-in-out_infinite_2.3s]" />

        {/* Large orb bottom center */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.3)_0%,rgba(6,182,212,0.2)_40%,transparent_75%)] animate-[fadeInDark_1.5s_ease-out_0.6s_forwards,dropMorph_30s_ease-in-out_infinite_3s]" />
      </div>

      {/* Page Header */}
      <div className="flex flex-col gap-2 relative z-20">
        <Link
          href="/"
          className="w-fit mb-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors flex items-center gap-2 px-3 py-2 rounded-md relative z-20"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Billing & Plans</h1>
        <p className="text-sm text-zinc-400">
          Choose the perfect plan for your diagnostic training needs
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex justify-center items-center gap-8 relative z-10 flex-wrap py-8">
        {/* Free Plan Card */}
        <Card
          onMouseEnter={() => setHoveredCard("free")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm w-full max-w-sm transition-all duration-500 relative ${
            hoveredCard === "free"
              ? "scale-105 border-sky-500/50 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
              : "scale-100"
          }`}
        >
          {/* Floating Tooth */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 pointer-events-none z-50 ${
            hoveredCard === "free"
              ? "translate-y-[-80px] opacity-100"
              : "translate-y-[40px] opacity-0"
          }`}>
            <Image
              src="/images/tooth.png"
              alt="Tooth"
              width={80}
              height={80}
              className={`drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] ${
                hoveredCard === "free" ? "animate-[wiggle_1s_ease-in-out_infinite]" : ""
              }`}
            />
          </div>

          <CardHeader className="text-center pb-8 pt-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center mb-4 transition-transform duration-300">
              <Zap className={`h-6 w-6 text-sky-400 transition-all duration-300 ${hoveredCard === "free" ? "scale-110 rotate-12" : ""}`} />
            </div>
            <CardTitle className="text-2xl font-bold text-zinc-100">Free</CardTitle>
            <CardDescription className="text-zinc-400 mt-2">
              Perfect for getting started
            </CardDescription>
            <div className="mt-6">
              <span className="text-5xl font-bold text-zinc-100">$0</span>
              <span className="text-zinc-400 text-lg">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Up to 5 conversations per day</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Basic diagnostic cases</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Performance tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300">Community support</span>
              </li>
            </ul>
            <Button
              className="w-full bg-zinc-800/70 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 transition-all duration-300"
              disabled
            >
              Current Plan
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan Card */}
        <Card
          onMouseEnter={() => setHoveredCard("pro")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm w-full max-w-sm transition-all duration-500 relative ${
            hoveredCard === "pro"
              ? "scale-110 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.5)]"
              : "scale-100"
          }`}
        >
          {/* Floating Tooth */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 transition-all duration-500 pointer-events-none z-50 ${
            hoveredCard === "pro"
              ? "translate-y-[-80px] opacity-100"
              : "translate-y-[40px] opacity-0"
          }`}>
            <Image
              src="/images/tooth.png"
              alt="Tooth"
              width={80}
              height={80}
              className={`drop-shadow-[0_15px_25px_rgba(168,85,247,0.8)] ${
                hoveredCard === "pro" ? "animate-[wiggle_1s_ease-in-out_infinite]" : ""
              }`}
            />
          </div>

          {/* Popular Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              MOST POPULAR
            </div>
          </div>

          <CardHeader className="text-center pb-8 pt-12">
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center mb-4 transition-transform duration-300">
              <Sparkles className={`h-6 w-6 text-purple-400 transition-all duration-300 ${hoveredCard === "pro" ? "scale-125 rotate-12" : ""}`} />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pro
            </CardTitle>
            <CardDescription className="text-zinc-400 mt-2">
              For serious dental students
            </CardDescription>
            <div className="mt-6">
              <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                $5
              </span>
              <span className="text-zinc-400 text-lg">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-medium">Up to 20 conversations per day</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-medium">Advanced diagnostic cases</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-medium">Detailed performance analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-medium">Priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-medium">Export reports & history</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-medium">Early access to new features</span>
              </li>
            </ul>
            <Button
              className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 ${
                hoveredCard === "pro" ? "shadow-[0_0_30px_rgba(168,85,247,0.6)]" : ""
              }`}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10 pb-8">
        <p className="text-zinc-400 text-sm">
          All plans include access to our AI-powered virtual dental patient and core diagnostic training features.
        </p>
        <p className="text-zinc-500 text-xs">
          Cancel anytime. No questions asked. Your data is always yours.
        </p>
      </div>
    </div>
  );
}
