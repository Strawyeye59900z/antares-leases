import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { site } from "@/config/site";

export function Fleet() {
  const { fleet } = site;
  return (
    <section id="frota" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Frota</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {fleet.heading}
          </h2>
          <p className="mt-4 text-neutral-400 sm:text-lg">{fleet.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {fleet.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.1}>
              <a
                href="#contato"
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border bg-neutral-900 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <div
                  role="img"
                  aria-label={item.image.alt}
                  className="absolute inset-0 bg-cover bg-center grayscale-[25%] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${item.image.src})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <span className="font-mono text-xs text-neutral-400">0{i + 1}</span>
                    <h3 className="mt-1 font-display text-xl font-medium">{item.title}</h3>
                    <p className="mt-1 max-w-sm text-sm text-neutral-300">{item.text}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
