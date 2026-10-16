import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/config/site";

const { contact } = site;

const items = [
  { icon: Phone, label: "Telefone", value: contact.phone, href: contact.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Chamar no WhatsApp", href: contact.whatsappHref },
  { icon: Mail, label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
  { icon: MapPin, label: "Endereço", value: contact.address },
  { icon: Clock, label: "Horário", value: contact.hours },
];

export function Contact() {
  return (
    <section id="contato" className="grain relative isolate scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-neutral-950 bg-cover bg-center opacity-35 grayscale"
        style={{ backgroundImage: `url(${site.images.contact.src})` }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Contato</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Vamos encontrar o carro ideal para você.
          </h2>
          <p className="mt-4 text-neutral-400 sm:text-lg">
            Envie uma mensagem ou ligue. Respondemos o mais rápido possível.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border bg-card/70 p-6 shadow-2xl shadow-black/50 backdrop-blur-md sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <div className="grid content-start gap-3 lg:col-span-2">
            {items.map(({ icon: Icon, label, value, href }, i) => {
              const body = (
                <SpotlightCard className="flex items-center gap-4 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-white/5">
                    <Icon className="size-4.5 text-neutral-300" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs tracking-wider text-muted-foreground uppercase">{label}</span>
                    <span className="block truncate text-sm font-medium">{value}</span>
                  </span>
                </SpotlightCard>
              );
              return (
                <Reveal key={label} delay={0.15 + i * 0.06}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block rounded-xl focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
