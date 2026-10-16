import Image from "next/image";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Logo oficial, versão para fundo escuro (contornos claros e fundo transparente).
 * A versão original para fundo claro está em /public/brand/logo.png.
 */
export function Logo({ className, preload }: { className?: string; preload?: boolean }) {
  return (
    <Image
      src="/brand/logo-dark.png"
      alt={site.name}
      width={937}
      height={574}
      preload={preload}
      className={cn("h-10 w-auto", className)}
    />
  );
}
