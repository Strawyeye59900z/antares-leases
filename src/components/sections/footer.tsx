import { Logo } from "@/components/logo";
import { site } from "@/config/site";

export function Footer() {
  const { images } = site;
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <Logo className="h-16 self-start sm:self-center" />
        <p>
          © <Year /> {site.name}. Todos os direitos reservados.
        </p>
      </div>
      <p className="mx-auto max-w-6xl px-6 pb-8 text-xs text-neutral-600">
        Fotos:{" "}
        {[images.hero, images.about, ...site.fleet.items.map((f) => f.image), images.contact].map((img, i) => (
          <span key={img.creditHref}>
            {i > 0 && " · "}
            <a href={img.creditHref} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400">
              {img.credit}
            </a>
          </span>
        ))}{" "}
        / Unsplash
      </p>
    </footer>
  );
}

async function Year() {
  "use cache";
  return new Date().getFullYear();
}
