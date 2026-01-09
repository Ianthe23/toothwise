"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ArrowUp, ArrowDown, Activity, CheckCircle2, TrendingUp, Target, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock data for the area chart
const chartData = [
  { date: "2024-01-01", correct: 12, total: 15 },
  { date: "2024-01-08", correct: 18, total: 22 },
  { date: "2024-01-15", correct: 25, total: 28 },
  { date: "2024-01-22", correct: 30, total: 35 },
  { date: "2024-01-29", correct: 38, total: 42 },
  { date: "2024-02-05", correct: 45, total: 50 },
  { date: "2024-02-12", correct: 52, total: 58 },
];

const chartConfig = {
  correct: {
    label: "Correct",
    color: "rgba(59, 130, 246, 0.8)",
  },
  total: {
    label: "Total",
    color: "rgba(6, 182, 212, 0.6)",
  },
} satisfies ChartConfig;

// Mock data for recent cases
const recentCases = [
  {
    id: 1,
    diagnosis: "Dental Caries",
    date: "2024-02-12",
    correct: true,
    difficulty: "Medium",
    timeSpent: "4m 32s",
  },
  {
    id: 2,
    diagnosis: "Periodontal Disease",
    date: "2024-02-11",
    correct: true,
    difficulty: "Hard",
    timeSpent: "6m 15s",
  },
  {
    id: 3,
    diagnosis: "Tooth Sensitivity",
    date: "2024-02-11",
    correct: false,
    difficulty: "Easy",
    timeSpent: "3m 20s",
  },
  {
    id: 4,
    diagnosis: "Root Canal",
    date: "2024-02-10",
    correct: true,
    difficulty: "Hard",
    timeSpent: "8m 45s",
  },
  {
    id: 5,
    diagnosis: "Gingivitis",
    date: "2024-02-10",
    correct: true,
    difficulty: "Medium",
    timeSpent: "5m 10s",
  },
];

// Calculate stats
const totalCases = 58;
const correctDiagnoses = 52;
const accuracyRate = ((correctDiagnoses / totalCases) * 100).toFixed(1);
const diversityScore = 15; // Number of unique conditions diagnosed
const improvementRate = "+12.5";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full relative">
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
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Dashboard</h1>
        <p className="text-sm text-zinc-400">
          Track your diagnostic performance and progress over time
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 relative">
        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Total Cases
            </CardTitle>
            <Activity className="h-4 w-4 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">{totalCases}</div>
            <p className="text-xs text-zinc-400 mt-1">
              <span className="text-sky-400 inline-flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                {improvementRate}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Accuracy Rate
            </CardTitle>
            <Target className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">{accuracyRate}%</div>
            <p className="text-xs text-zinc-400 mt-1">
              <span className="text-cyan-400 inline-flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                +4.2%
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Correct Diagnoses
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">
              {correctDiagnoses}/{totalCases}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Strong diagnostic performance
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-200">
              Case Diversity
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">
              {diversityScore} types
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Unique conditions diagnosed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Area Chart */}
      <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm relative">
        <CardHeader>
          <CardTitle className="text-zinc-100">Performance Over Time</CardTitle>
          <CardDescription className="text-zinc-400">
            Your diagnostic accuracy trend for the last 7 weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <defs>
                <linearGradient id="fillCorrect" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(59, 130, 246, 0.8)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="rgba(59, 130, 246, 0.8)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(6, 182, 212, 0.6)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="rgba(6, 182, 212, 0.6)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                stroke="rgba(255,255,255,0.5)"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="total"
                type="monotone"
                fill="url(#fillTotal)"
                fillOpacity={0.4}
                stroke="rgba(6, 182, 212, 0.8)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="correct"
                type="monotone"
                fill="url(#fillCorrect)"
                fillOpacity={0.4}
                stroke="rgba(59, 130, 246, 1)"
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Cases Table */}
      <Card className="border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-zinc-100">Recent Cases</CardTitle>
          <CardDescription className="text-zinc-400">
            Your most recent diagnostic attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                    Diagnosis
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                    Result
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                    Difficulty
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((case_) => (
                  <tr
                    key={case_.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-zinc-200">
                      {case_.diagnosis}
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-400">
                      {new Date(case_.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      {case_.correct ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-md">
                          <CheckCircle2 className="h-3 w-3" />
                          Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded-md">
                          <ArrowDown className="h-3 w-3" />
                          Incorrect
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-md ${
                          case_.difficulty === "Easy"
                            ? "text-sky-400 bg-sky-500/10"
                            : case_.difficulty === "Medium"
                            ? "text-cyan-400 bg-cyan-500/10"
                            : "text-purple-400 bg-purple-500/10"
                        }`}
                      >
                        {case_.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-400">
                      {case_.timeSpent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
