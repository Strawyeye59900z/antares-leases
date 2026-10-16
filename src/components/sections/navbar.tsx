"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "#sobre", label: "Sobre nós" },
  { href: "#frota", label: "Frota" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "border-white/10 bg-black/60 shadow-lg shadow-black/40 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#inicio"
          aria-label={`${site.name} — início`}
          className={cn("transition-opacity duration-300", scrolled ? "opacity-100" : "pointer-events-none opacity-0")}
        >
          <Logo className="-my-1 h-12" />
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="rounded-full">
            <a href={site.contact.phoneHref}>
              <Phone />
              <span className="hidden sm:inline">{site.contact.phone}</span>
              <span className="sm:hidden">Ligar</span>
            </a>
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
