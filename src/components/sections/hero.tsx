"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";

import { ScrambleText } from "@/components/motion/scramble-text";
import { StarField } from "@/components/motion/star-field";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 160]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section id="inicio" className="grain relative isolate flex min-h-svh items-center overflow-hidden">
      {/* Foto de fundo com parallax e zoom lento */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20 bg-neutral-950">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${site.images.hero.src})` }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease }}
        />
      </motion.div>
      {/* Camadas de escurecimento para manter o texto legível */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/55 to-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_95%)]" />
      <StarField />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-[0.25em] text-muted-foreground uppercase backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-star shadow-[0_0_10px_2px] shadow-star/60" />
          {site.hero.eyebrow}
        </motion.p>

        <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-7xl lg:text-8xl">
          <ScrambleText text={site.hero.title} delay={300} className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="mt-6 max-w-xl text-lg text-pretty text-neutral-300 sm:text-xl"
        >
          {site.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="group rounded-full">
            <a href="#contato">
              Solicitar orçamento
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href={site.contact.phoneHref}>
              <Phone />
              {site.contact.phone}
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para Sobre nós"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-6" />
      </motion.a>
    </section>
  );
}
