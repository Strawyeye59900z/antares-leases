/**
 * Todo o conteúdo editável da landing page fica aqui.
 * Itens marcados com TODO ainda precisam das informações reais.
 */
export const site = {
  name: "Antares Leases",
  tagline: "Aluguel de carros",
  description:
    "Aluguel de carros com atendimento próximo e sem complicação. Fale com a Antares Leases e encontre o carro certo para você.",

  hero: {
    eyebrow: "Aluguel de carros",
    title: "Antares Leases",
    subtitle:
      "O carro certo, no momento certo. Atendimento direto, contratos claros e uma frota pronta para rodar.", // TODO: confirmar texto
  },

  about: {
    // TODO: substituir pelo texto "Sobre nós" enviado pela empresa
    paragraphs: [
      "A Antares Leases nasceu para tornar o aluguel de carros simples e transparente. Cuidamos de cada detalhe para que você só precise se preocupar com o caminho.",
      "Trabalhamos com atendimento próximo, do primeiro contato até a devolução do veículo, sempre com condições claras e sem surpresas.",
    ],
    // TODO: confirmar se estes diferenciais se aplicam
    highlights: [
      { title: "Atendimento direto", text: "Fale com quem resolve, sem central de espera." },
      { title: "Frota revisada", text: "Veículos com manutenção em dia antes de cada locação." },
      { title: "Condições claras", text: "Contrato transparente, sem taxas escondidas." },
    ],
  },

  contact: {
    phone: "(00) 00000-0000", // TODO
    phoneHref: "tel:+5500000000000", // TODO
    whatsappHref: "https://wa.me/5500000000000", // TODO
    email: "contato@antaresleases.com.br", // TODO
    address: "Endereço da empresa, Cidade - UF", // TODO
    hours: "Seg. a sex., 8h às 18h · Sáb., 8h às 12h", // TODO
  },

  /**
   * Fotos do Unsplash (licença Unsplash, uso gratuito). Para usar arquivos locais,
   * coloque-os em /public e troque por "/hero.jpg", por exemplo.
   */
  images: {
    hero: {
      src: "https://unsplash.com/photos/9xhwtVIM0dE/download?w=2400",
      credit: "Ilya Godze",
      creditHref: "https://unsplash.com/photos/9xhwtVIM0dE",
    },
    about: {
      src: "https://unsplash.com/photos/odmg2fspBBU/download?w=1600",
      credit: "Hyundai Motor Group",
      creditHref: "https://unsplash.com/photos/odmg2fspBBU",
    },
    contact: {
      src: "https://unsplash.com/photos/i34LTsTiUKE/download?w=2400",
      credit: "Unsplash",
      creditHref: "https://unsplash.com/photos/i34LTsTiUKE",
    },
  },
} as const;
