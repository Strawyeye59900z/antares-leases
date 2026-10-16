import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { site } from "@/config/site";

export function About() {
  return (
    <section id="sobre" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Sobre nós</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {site.about.heading}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-pretty text-neutral-400 sm:text-lg">
            {site.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="relative">
          <div
            className="aspect-[4/5] overflow-hidden rounded-2xl border bg-neutral-900 bg-cover bg-center grayscale-[35%] sm:aspect-[4/3] lg:aspect-[4/5]"
            style={{ backgroundImage: `url(${site.images.about.src})` }}
            role="img"
            aria-label={site.images.about.alt}
          >
            <div className="h-full w-full bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
          <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-white/15 to-transparent blur-2xl" />
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-4 px-6 sm:grid-cols-3">
        {site.about.highlights.map((h, i) => (
          <Reveal key={h.title} delay={i * 0.1}>
            <SpotlightCard className="h-full p-6">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-medium">{h.title}</h3>
              <p className="mt-1.5 text-sm text-neutral-400">{h.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
