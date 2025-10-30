"use client";

import { Input } from "@/components/ui/input";
import BlurText from "@/components/ui/blur-text";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Loader2 } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  function submitQuery() {
    if (!query.trim() || isSubmitting) return;
    setIsSubmitting(true);

    // Simulate processing; then navigate to conversation page with the query
    const id = Date.now().toString();
    setTimeout(() => {
      router.push(`/conversation/${id}?q=${encodeURIComponent(query.trim())}`);
    }, 3000);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-[30px]">
      <div className="relative flex w-full flex-col items-center gap-[28px]">
        {/* Glow background behind paragraph + input */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-40 w-[min(800px,85vw)] rounded-[48px] opacity-80 blur-3xl bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.45)_0%,_rgba(6,182,212,0.3)_40%,_transparent_75%)] animate-[dropMorph_16s_ease-in-out_infinite]" />
        </div>

        <BlurText
          text="Let's find the diagnosis for today!"
          className="text-[28px] font-semibold tracking-tight font-raleway leading-none"
          delay={150}
          animateBy="words"
          direction="top"
        />
        {/* Custom input with right-side submit button */}
        <div className="relative w-2/5">
          <Input
            type="text"
            placeholder="Ask a question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitQuery();
            }}
            className="w-full rounded-[20px] border-zinc-800 px-4 py-5 pr-12 placeholder:text-zinc-500"
            disabled={isSubmitting}
          />
          <button
            type="button"
            aria-label={isSubmitting ? "Loading…" : "Submit"}
            onClick={submitQuery}
            disabled={isSubmitting}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-lg px-2 py-2 opacity-50 bg-transparent text-zinc-100 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CornerDownLeft className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
