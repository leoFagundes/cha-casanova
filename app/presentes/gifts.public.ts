export type Priority = "alta" | "media" | "baixa";
export type GiftStatus = "disponivel" | "reservado" | "doado";

export interface Donor {
  name: string;
  message: string;
  avatar: string; // initials
  date: string;
}

export interface PublicGift {
  id: number;
  name: string;
  cat: string;
  emoji: string;
  desc: string;
  longDesc: string;
  price: string;
  prioridade: Priority;
  qty: number;
  taken: number;
  link: string;
  donors: Donor[];
}

export const PUBLIC_GIFTS: PublicGift[] = [
  {
    id: 1,
    name: "Jogo de panelas Tramontina 5 peças",
    cat: "Cozinha",
    emoji: "🍳",
    desc: "Conjunto antiaderente inox, ideal para o dia a dia do casal.",
    longDesc:
      "O conjunto Tramontina Professional conta com 5 peças em alumínio fundido com revestimento antiaderente Starflon Max. Inclui caçarola 16cm, caçarola 20cm, frigideira 24cm, panela 18cm e panela 22cm. Tampa de vidro temperado com válvula de escape. Adequado para todos os tipos de fogão, incluindo indução.",
    price: "R$ 1,00",
    prioridade: "alta",
    qty: 1,
    taken: 0,
    link: "https://tramontina.com.br",
    donors: [],
  },
  {
    id: 2,
    name: "Aparelho de jantar 12 peças",
    cat: "Cozinha",
    emoji: "🍳",
    desc: "Porcelana branca com detalhes dourados, para receber os amigos com charme.",
    longDesc:
      "Aparelho de jantar em porcelana de alta qualidade com 12 peças: 4 pratos fundos, 4 pratos rasos e 4 pratos de sobremesa. Acabamento branco com borda dourada delicada, perfeito para jantares especiais. Apto para micro-ondas e lava-louças.",
    price: "R$ 210,00",
    prioridade: "media",
    qty: 2,
    taken: 1,
    link: "",
    donors: [
      {
        name: "Fernanda Lima",
        message:
          "Que vocês tenham muitos jantares deliciosos juntos! Com muito amor ♡",
        avatar: "FL",
        date: "10 Jun 2025",
      },
    ],
  },
  {
    id: 3,
    name: "Jogo de cama casal percal 400 fios",
    cat: "Quarto",
    emoji: "🛏️",
    desc: "Lençol premium cor areia com bordas em tom cru.",
    longDesc:
      "Jogo de cama casal em percal egípcio 400 fios, composto por 1 lençol de baixo com elástico (2,20x1,58m), 1 lençol de cima (2,20x1,80m) e 2 fronhas (50x70cm). Cor areia suave com acabamento dobra dupla em tom cru. Toque sofisticado e durabilidade excepcional.",
    price: "R$ 290,00",
    prioridade: "alta",
    qty: 1,
    taken: 1,
    link: "",
    donors: [
      {
        name: "Mariana & Pedro Costa",
        message:
          "Que o lar de vocês seja sempre um ninho de amor e aconchego. Felicidades! 🌿",
        avatar: "MP",
        date: "8 Jun 2025",
      },
    ],
  },
  {
    id: 4,
    name: "Espelho de sala moldura rattan",
    cat: "Sala",
    emoji: "🛋️",
    desc: "80 cm, moldura em fibra natural, estilo boho elegante.",
    longDesc:
      "Espelho redondo 80cm com moldura artesanal em rattan natural trançado à mão. Acabamento em fibra de alta resistência, gancho metálico para parede incluído. Traz leveza e elegância para qualquer ambiente, ideal para salas, quartos e entradas.",
    price: "R$ 320,00",
    prioridade: "media",
    qty: 1,
    taken: 0,
    link: "",
    donors: [],
  },
  {
    id: 5,
    name: "Air fryer Philips Walita 4.1L",
    cat: "Cozinha",
    emoji: "⚡",
    desc: "Fritadeira sem óleo, capacidade família, timer digital.",
    longDesc:
      "Air Fryer Philips Walita com capacidade de 4,1 litros, ideal para a família. Tecnologia Rapid Air que circula ar quente em alta velocidade para fritar, assar, grelhar e refogar com até 80% menos gordura. Timer digital com 60 minutos, temperatura ajustável de 80°C a 200°C. Alça cool touch e cuba antiaderente lavável na lava-louças.",
    price: "R$ 499,00",
    prioridade: "alta",
    qty: 1,
    taken: 0,
    link: "https://philips.com.br",
    donors: [],
  },
  {
    id: 6,
    name: "Vasos decorativos terracota (trio)",
    cat: "Decoração",
    emoji: "🌿",
    desc: "Conjunto de 3 vasos em terracota esmaltados, tamanhos variados.",
    longDesc:
      "Trio de vasos artesanais em argila terracota com acabamento esmaltado em tons de âmbar, areia e cru. Tamanhos: P (12cm), M (18cm) e G (24cm). Cada peça é única, com leves variações do processo artesanal. Ideais para plantas, flores secas ou como elementos decorativos.",
    price: "R$ 175,00",
    prioridade: "baixa",
    qty: 3,
    taken: 0,
    link: "",
    donors: [],
  },
  {
    id: 7,
    name: "Jogo de toalhas de banho 4 peças",
    cat: "Banheiro",
    emoji: "🚿",
    desc: "100% algodão egípcio, cor off-white, 700g/m².",
    longDesc:
      "Jogo com 4 peças em algodão egípcio de fio longo, proporcionando maciez e alta absorção. Composição: 2 toalhas de banho (68x130cm) e 2 toalhas de rosto (50x80cm). Gramatura 700g/m², cor off-white com acabamento em ponto palito. Resistente a múltiplas lavagens sem perder a maciez.",
    price: "R$ 240,00",
    prioridade: "media",
    qty: 2,
    taken: 0,
    link: "",
    donors: [],
  },
  {
    id: 8,
    name: "Organizador de armário modular",
    cat: "Quarto",
    emoji: "🛏️",
    desc: "Kit 6 peças em veludo cinza, empilháveis, perfeito para roupas dobradas.",
    longDesc:
      "Sistema de organização modular com 6 caixas em veludo premium na cor cinza chumbo. Inclui 2 caixas grandes (30x20x10cm), 2 médias (20x15x10cm) e 2 pequenas (15x10x8cm). Empilháveis e encaixáveis entre si. Ideais para organizar roupas dobradas, acessórios, meias e roupas íntimas com elegância.",
    price: "R$ 155,00",
    prioridade: "baixa",
    qty: 2,
    taken: 0,
    link: "",
    donors: [],
  },
];

export const CAT_FILTERS = [
  { value: "todos", label: "Todos", emoji: "✨" },
  { value: "Cozinha", label: "Cozinha", emoji: "🍳" },
  { value: "Sala", label: "Sala", emoji: "🛋️" },
  { value: "Quarto", label: "Quarto", emoji: "🛏️" },
  { value: "Banheiro", label: "Banheiro", emoji: "🚿" },
  { value: "Decoração", label: "Decoração", emoji: "🌿" },
  { value: "Eletrodoméstico", label: "Eletro", emoji: "⚡" },
];

export const STATUS_FILTERS = [
  { value: "todos", label: "Todos" },
  { value: "disponivel", label: "Disponíveis" },
  { value: "doado", label: "Escolhidos" },
];

export function getStatus(g: PublicGift): GiftStatus {
  if (g.taken >= g.qty) return "doado";
  if (g.taken > 0) return "reservado";
  return "disponivel";
}
