/**
 * Todo o conteúdo editável da landing page fica aqui.
 * Itens marcados com TODO ainda precisam das informações reais.
 */
export const site = {
  name: "Antares Leases",
  tagline: "Locação de picapes para empresas",
  description:
    "Locação comercial de picapes para empresas: frota revisada, contratos mensais e de longo prazo e atendimento direto. Fale com a Antares Leases.",

  hero: {
    title: "Antares Leases",
    subtitle:
      "Picapes prontas para o trabalho pesado. Contratos mensais e de longo prazo para a sua operação não parar.", // TODO: confirmar texto
  },

  about: {
    heading: "Sua frota de trabalho, sem o peso de ter uma.",
    // TODO: substituir pelo texto "Sobre nós" enviado pela empresa
    paragraphs: [
      "A Antares Leases é especializada na locação de picapes para empresas. Agro, construção, energia, manutenção e logística: atendemos operações que precisam de veículos robustos todos os dias.",
      "Com a locação, sua empresa deixa de imobilizar capital em veículos e passa a contar com manutenção, documentação e suporte incluídos, com custo mensal previsível.",
    ],
    // TODO: confirmar se estes diferenciais se aplicam
    highlights: [
      { title: "Custo previsível", text: "Mensalidade fixa, sem depreciação nem gastos inesperados no balanço." },
      { title: "Manutenção inclusa", text: "Revisões em dia e veículo reserva para a operação não parar." },
      { title: "Atendimento direto", text: "Um contato dedicado para a sua empresa, sem central de espera." },
    ],
  },

  fleet: {
    heading: "Picapes para cada tipo de operação.",
    subtitle: "Montamos a frota sob medida para a sua empresa, de uma unidade a dezenas de veículos.",
    // TODO: substituir pelos modelos reais da frota
    items: [
      {
        title: "Cabine dupla",
        text: "Leva a equipe e a ferramenta. Ideal para manutenção e serviços de campo.",
        image: {
          src: "https://unsplash.com/photos/6DnSGv4VZlo/download?w=1200",
          alt: "Picape prata cabine dupla estacionada ao entardecer",
          credit: "stevosdisposable",
          creditHref: "https://unsplash.com/photos/6DnSGv4VZlo",
        },
      },
      {
        title: "Tração 4x4",
        text: "Para obra, fazenda e estrada de terra, onde o asfalto acaba.",
        image: {
          src: "https://unsplash.com/photos/o7fqZ18YFXc/download?w=1200",
          alt: "Picape bege com rodas pretas em estrada de terra",
          credit: "Dusty Barnes",
          creditHref: "https://unsplash.com/photos/o7fqZ18YFXc",
        },
      },
      {
        title: "Alta capacidade de carga",
        text: "Caçamba ampla e motor diesel para transportar material e equipamento.",
        image: {
          src: "https://unsplash.com/photos/G3Irirjfl8s/download?w=1200",
          alt: "Picape grafite de frente em um pátio",
          credit: "FourFour",
          creditHref: "https://unsplash.com/photos/G3Irirjfl8s",
        },
      },
      {
        title: "Frota corporativa",
        text: "Padronização visual, gestão centralizada e substituição programada.",
        image: {
          src: "https://unsplash.com/photos/YscocmXUTUM/download?w=1200",
          alt: "Picape preta estacionada em um pátio",
          credit: "Jonathan Cooper",
          creditHref: "https://unsplash.com/photos/YscocmXUTUM",
        },
      },
    ],
  },

  contact: {
    heading: "Vamos montar a frota ideal para a sua empresa.",
    phone: "(00) 00000-0000", // TODO
    phoneHref: "tel:+5500000000000", // TODO
    whatsappHref: "https://wa.me/5500000000000", // TODO
    email: "contato@antaresleases.com.br", // TODO
  },

  /**
   * Fotos do Unsplash (licença Unsplash, uso gratuito). Para usar arquivos locais,
   * coloque-os em /public e troque por "/hero.jpg", por exemplo.
   */
  images: {
    hero: {
      src: "https://unsplash.com/photos/6VbVMrdbC14/download?w=2400",
      credit: "Bradley Dunn",
      creditHref: "https://unsplash.com/photos/6VbVMrdbC14",
    },
    about: {
      src: "https://unsplash.com/photos/WbWxuFhDmvw/download?w=1600",
      alt: "Picape preta parada no meio do deserto",
      credit: "Joey Chacon",
      creditHref: "https://unsplash.com/photos/WbWxuFhDmvw",
    },
    contact: {
      src: "https://unsplash.com/photos/eWhHTKQBHkE/download?w=2400",
      credit: "Royce Fonseca",
      creditHref: "https://unsplash.com/photos/eWhHTKQBHkE",
    },
  },
} as const;
