"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CornerDownLeft, Loader2, Pencil } from "lucide-react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
  animated?: boolean;
  edited?: boolean; // NEW: only user messages; true after first edit
};

// Simple typewriter that reveals `text` quickly, letter by letter.
function TypewriterText({
  text,
  speed = 18,
  startDelay = 200,
  onDone,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");
  const intervalRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);
  // NEW: keep a stable ref to onDone; do not depend on it in the animation effect
  const onDoneRef = useRef<typeof onDone>(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let i = 0;
    startTimeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // Call the latest onDone without retriggering the effect
          onDoneRef.current?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // IMPORTANT: do not include onDone as a dependency — that causes restarts on every render
  }, [text, speed, startDelay]);

  return <span>{shown}</span>;
}

export default function ConversationPage() {
  const params = useSearchParams();
  const { id } = useParams() as { id: string };
  const storageKey = useMemo(() => `tw-convo:${id}`, [id]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const isEditing = editingIndex !== null;
  const saveEditGuard = useRef(false); // NEW: one-shot guard

  const mockAnswers = useMemo(
    () => [
      "For sensitivity, desensitizing toothpaste and fluoride varnishes often help.",
      "If pain persists, a dental exam can rule out decay or cracks.",
      "Lifestyle tweaks—avoid very cold foods and use a soft-bristle brush.",
      "For sensitivity, desensitizing toothpaste and fluoride varnishes often help.",
      "If pain persists, a dental exam can rule out decay or cracks.",
      "Lifestyle tweaks—avoid very cold foods and use a soft-bristle brush.",
    ],
    []
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [minLoadingElapsed, setMinLoadingElapsed] = useState(false); // NEW: 2s minimum spinner

  // Compute last user message index
  const lastUserIndex = useMemo(() => {
    let idx = -1;
    messages.forEach((m, i) => {
      if (m.role === "user") idx = i;
    });
    return idx;
  }, [messages]);

  // Initialize typing state once (for the initial animated assistant bubble)
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last && last.role === "assistant" && last.animated) {
      setIsAssistantTyping(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startEdit(index: number) {
    // Only allow editing the latest user message that hasn't been edited
    const target = messages[index];
    if (!target || target.role !== "user") return;
    if (index !== lastUserIndex) return;
    if (target.edited) return; // already edited once
    if (isAssistantTyping) return;

    saveEditGuard.current = false; // reset guard for this session
    setEditingIndex(index);
    setEditingText(target.content);
  }

  function saveEdit() {
    if (editingIndex === null || saveEditGuard.current) return;
    saveEditGuard.current = true;

    const nextUserText = editingText.trim();
    if (!nextUserText) {
      setEditingIndex(null);
      setEditingText("");
      saveEditGuard.current = false;
      return;
    }

    setMessages((prev) => {
      const next = [...prev];

      // Update edited user message and mark as edited (one-time)
      next[editingIndex] = {
        ...next[editingIndex],
        content: nextUserText,
        edited: true,
      };

      // Regenerate the last assistant reply exactly once
      const nextIdx = (answerIndex + 1) % mockAnswers.length;
      if (next.length > 0 && next[next.length - 1].role === "assistant") {
        next[next.length - 1] = {
          role: "assistant",
          content: mockAnswers[nextIdx],
          animated: true,
        };
      } else {
        next.push({
          role: "assistant",
          content: mockAnswers[nextIdx],
          animated: true,
        });
      }

      setAnswerIndex(nextIdx);
      setIsAssistantTyping(true); // hide pencil until done

      return next;
    });

    setEditingIndex(null);
    setEditingText("");
    // Release the guard after state settles (Strict Mode safe)
    setTimeout(() => {
      saveEditGuard.current = false;
    }, 0);
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditingText("");
  }

  // Bootstrap on client: restore from localStorage or start with URL question
  useEffect(() => {
    const fallbackQuestion = "What dental treatments are best for sensitivity?";

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.messages)) {
          setMessages(
            parsed.messages.map((m: Message) => ({ ...m, animated: false }))
          );
        }
        if (typeof parsed?.answerIndex === "number") {
          setAnswerIndex(parsed.answerIndex);
        }
      } else {
        const q = params.get("q") || fallbackQuestion;
        setMessages([
          { role: "user", content: q },
          { role: "assistant", content: mockAnswers[0], animated: true },
        ]);
        setAnswerIndex(0);
        // NEW: ensure we’re in typing mode for the initial animated message
        setIsAssistantTyping(true);
      }
    } catch {
      setMessages([
        { role: "user", content: fallbackQuestion },
        { role: "assistant", content: mockAnswers[0], animated: true },
      ]);
      setAnswerIndex(0);
      // NEW: initial typing state when bootstrapping from fallback
      setIsAssistantTyping(true);
    } finally {
      setHydrated(true);
    }
  }, [params, storageKey, mockAnswers]);

  // NEW: ensure loading spinner shows for 2s on each conversation id
  useEffect(() => {
    setMinLoadingElapsed(false);
    const t = window.setTimeout(() => setMinLoadingElapsed(true), 2000);
    return () => window.clearTimeout(t);
  }, [id]);

  // Persist conversation whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ messages, answerIndex })
      );
    } catch {
      // ignore storage errors
    }
  }, [messages, answerIndex, storageKey, hydrated]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Block sends while editing to avoid premature regeneration
    if (!query.trim() || isSubmitting || isEditing) return;

    setIsSubmitting(true);
    const text = query.trim();
    setQuery("");
    // New user question is editable (edited: false)
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text, edited: false },
    ]);

    setTimeout(() => {
      const nextIdx = (answerIndex + 1) % mockAnswers.length;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: mockAnswers[nextIdx], animated: true },
      ]);
      setAnswerIndex(nextIdx);
      setIsAssistantTyping(true);
      setIsSubmitting(false);
    }, 3000);
  }

  // Render a stable empty shell on server; fill content after hydration
  // Render a spinner while hydrating/loading the conversation
  if (!hydrated || !minLoadingElapsed) {
    return (
      <div
        className="mx-auto max-w-3xl w-full px-4 py-8 pb-28 relative"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="flex h-[50vh] items-center justify-center">
          <div className="flex items-center gap-3 text-zinc-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm">Loading conversation…</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Glow background in bottom right corner */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 z-0 overflow-hidden"
      >
        {/* Larger, darker orb behind */}
        <div className="h-[800px] w-[1000px] rounded-[48px] opacity-40 blur-3xl bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.2)_0%,_rgba(6,182,212,0.15)_40%,_transparent_75%)] animate-[dropMorph_20s_ease-in-out_infinite] translate-x-1/3 translate-y-1/3" />
        {/* Brighter orb in front */}
        <div className="absolute bottom-0 right-0 h-[500px] w-[700px] rounded-[48px] opacity-80 blur-3xl bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.45)_0%,_rgba(6,182,212,0.3)_40%,_transparent_75%)] animate-[dropMorph_16s_ease-in-out_infinite] translate-x-1/4 translate-y-1/4" />
        {/* Floating tooth image */}
        <div className="absolute bottom-[100px] right-[150px] animate-[float_6s_ease-in-out_infinite]">
          <Image
            src="/images/tooth.png"
            alt="Tooth"
            width={200}
            height={200}
            className="opacity-90 drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl w-full h-full px-4 py-8 flex flex-col gap-6 pb-28 relative z-10">
        {messages.map((msg, i) => {
          const isUser = msg.role === "user";
          const isEditableTarget =
            isUser &&
            i === lastUserIndex &&
            !isAssistantTyping &&
            !isSubmitting &&
            editingIndex === null &&
            !messages[i]?.edited; // NEW: only if not yet edited

          return (
            <div
              key={i}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div className="relative w-fit group">
                {isEditableTarget && (
                  <button
                    type="button"
                    aria-label="Edit message"
                    onClick={() => startEdit(i)}
                    className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-zinc-200"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}

                <div
                  className={
                    isUser
                      ? "max-w-[70ch] rounded-xl px-4 py-2 border text-zinc-100 bg-[linear-gradient(to_right,rgba(59,130,246,0.26),rgba(6,182,212,0.22))] border-sky-500/40 shadow-sm"
                      : "max-w-[70ch] rounded-xl px-4 py-2 text-zinc-100 shadow-sm"
                  }
                >
                  {isUser ? (
                    editingIndex === i ? (
                      <Input
                        autoFocus
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            e.preventDefault();
                            e.stopPropagation();
                            cancelEdit();
                            return;
                          }
                          // Only save on a single Enter press (no Shift, no repeat, not composing)
                          const composing =
                            (e.nativeEvent as KeyboardEvent).isComposing ??
                            false;
                          if (
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            !e.repeat &&
                            !composing
                          ) {
                            e.preventDefault();
                            e.stopPropagation();
                            saveEdit();
                          }
                        }}
                        className="w-full rounded-[14px] px-3 py-2 border-none"
                      />
                    ) : (
                      msg.content
                    )
                  ) : msg.animated ? (
                    <TypewriterText
                      text={msg.content}
                      startDelay={400}
                      onDone={() => setIsAssistantTyping(false)}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom input centered within this container */}
        <form
          onSubmit={handleSubmit}
          className="absolute bottom-6 left-0 right-0"
        >
          <div className="relative w-full">
            <Input
              type="text"
              placeholder={
                isEditing ? "Finish editing above…" : "Ask a question"
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleSubmit(e as unknown as React.FormEvent);
              }}
              className="w-full rounded-[20px] border-zinc-800 px-4 py-5 pr-12 placeholder:text-zinc-500"
              disabled={isSubmitting || isEditing}
            />
            <button
              type="submit"
              aria-label={isSubmitting ? "Loading…" : "Submit"}
              disabled={isSubmitting || !query.trim() || isEditing}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-lg px-2 py-2 bg-transparent opacity-50 text-zinc-100 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CornerDownLeft className="h-4 w-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
