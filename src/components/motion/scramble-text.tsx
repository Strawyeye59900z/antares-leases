"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#*+";

/** Revela o texto letra a letra, embaralhando os caracteres ainda não revelados. */
export function ScrambleText({
  text,
  className,
  delay = 0,
  duration = 1400,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      start ??= now + delay;
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      const revealed = Math.floor(progress * text.length);
      setOutput(
        text
          .split("")
          .map((char, i) =>
            char === " " || i < revealed ? char : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, delay, duration, reduce]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{output}</span>
    </span>
  );
}
