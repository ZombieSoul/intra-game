import { useSignals, signal } from "@preact/signals-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { currentResponse } from "@/lib/llm";

export function CalculatingThrobber() {
  useSignals();

  const displayText = useState("");
  const [isGenerating] = useState(false);

  // Update display text and generation state based on LLM activity
  useEffect(() => {
    const hasResponse =
      currentResponse.value && currentResponse.value.length > 0;
    setDisplayText(hasResponse ? "" : "Thinking...");
    setIsGenerating(hasResponse);
  }, [currentResponse.value]);

  // Heartbeat animation
  const frameIndex = signal(0);
  const colorIndex = signal(Math.floor(Math.random() * 5));
  const opacity = signal(0);

  useEffect(() => {
    const frameTimer = setInterval(() => {
      frameIndex.value = (frameIndex.value + 1) % 10;
    }, 100);
    return () => clearInterval(frameTimer);
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      {/* Thinking/Generating indicator */}
      <div
        className={twMerge(
          "text-yellow-500",
          isGenerating ? "animate-pulse" : "text-green-500",
        )}
      >
        {displayText}
      </div>

      {/* Silly Phrase with Fading Color - only show when not generating */}
      {!isGenerating && (
        <div
          className="text-green-500 flex-grow text-right animate-fade-in-out"
          style={{ animation: "fadeIn 1s infinite" }}
        >
          Thinking...
        </div>
      )}
    </div>
  );
}
