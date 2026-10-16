"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Pontos de luz cintilando, uma referência à estrela Antares. Determinístico para evitar diferenças de hidratação. */
export function StarField({ count = 60 }: { count?: number }) {
  const reduce = useReducedMotion();
  const stars = useMemo(() => makeStars(count), [count]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          initial={{ opacity: 0.15 }}
          animate={reduce ? undefined : { opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function makeStars(count: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rand() * 100,
    top: rand() * 60,
    size: rand() * 1.6 + 0.6,
    delay: rand() * 4,
    duration: rand() * 3 + 2.5,
  }));
}
