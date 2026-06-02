"use client";
import { Volume2 } from "lucide-react";
import { speakUrdu } from "@/lib/tts";

export function AudioButton({ text, size = "sm" }: { text: string; size?: "sm" | "md" }) {
  const cls =
    size === "sm"
      ? "p-1 text-amber-400 hover:text-amber-300"
      : "p-2 text-amber-400 hover:text-amber-300";
  return (
    <button
      onClick={() => speakUrdu(text)}
      className={`${cls} transition-colors rounded-full hover:bg-white/10`}
      title="Прослушать произношение"
      aria-label="Прослушать"
    >
      <Volume2 size={size === "sm" ? 16 : 20} />
    </button>
  );
}
