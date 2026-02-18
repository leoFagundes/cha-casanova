export type Priority = "alta" | "media" | "baixa";

export interface Gift {
  id: number;
  name: string;
  cat: string;
  emoji: string;
  desc: string;
  price: string;
  prioridade: Priority;
  qty: number;
  taken: number;
  link: string;
}

export const MOCK_GIFTS: Gift[] = [
  { id: 1, name: "Jogo de panelas Tramontina 5 peças", cat: "Cozinha", emoji: "🍳", desc: "Conjunto antiaderente inox, ideal para o dia a dia do casal.", price: "R$ 389,90", prioridade: "alta", qty: 1, taken: 0, link: "https://tramontina.com.br" },
  { id: 2, name: "Aparelho de jantar 12 peças", cat: "Cozinha", emoji: "🍳", desc: "Porcelana branca com detalhes dourados, para receber os amigos com charme.", price: "R$ 210,00", prioridade: "media", qty: 2, taken: 1, link: "" },
  { id: 3, name: "Jogo de cama casal percal 400 fios", cat: "Quarto", emoji: "🛏️", desc: "Lençol premium cor areia com bordas em tom cru.", price: "R$ 290,00", prioridade: "alta", qty: 1, taken: 1, link: "" },
  { id: 4, name: "Espelho de sala moldura rattan", cat: "Sala", emoji: "🛋️", desc: "80 cm, moldura em fibra natural, estilo boho elegante.", price: "R$ 320,00", prioridade: "media", qty: 1, taken: 0, link: "" },
  { id: 5, name: "Air fryer Philips Walita 4.1L", cat: "Cozinha", emoji: "⚡", desc: "Fritadeira sem óleo, capacidade família, timer digital.", price: "R$ 499,00", prioridade: "alta", qty: 1, taken: 0, link: "https://philips.com.br" },
  { id: 6, name: "Vasos decorativos terracota (trio)", cat: "Decoração", emoji: "🌿", desc: "Conjunto de 3 vasos em terracota esmaltados, tamanhos variados.", price: "R$ 175,00", prioridade: "baixa", qty: 3, taken: 0, link: "" },
  { id: 7, name: "Jogo de toalhas de banho 4 peças", cat: "Banheiro", emoji: "🚿", desc: "100% algodão egípcio, cor off-white, 700g/m².", price: "R$ 240,00", prioridade: "media", qty: 2, taken: 0, link: "" },
  { id: 8, name: "Organizador de armário modular", cat: "Quarto", emoji: "🛏️", desc: "Kit 6 peças em veludo cinza, empilháveis, perfeito para roupas dobradas.", price: "R$ 155,00", prioridade: "baixa", qty: 2, taken: 0, link: "" },
];

export const CATEGORIES = [
  { value: "Cozinha",        emoji: "🍳" },
  { value: "Sala",           emoji: "🛋️" },
  { value: "Quarto",         emoji: "🛏️" },
  { value: "Banheiro",       emoji: "🚿" },
  { value: "Decoração",      emoji: "🌿" },
  { value: "Eletrodoméstico",emoji: "⚡" },
  { value: "Outro",          emoji: "✨" },
];

export function prioLabel(p: Priority) {
  return p === "alta" ? "Alta" : p === "media" ? "Média" : "Baixa";
}

export function prioClass(p: Priority) {
  return {
    alta:  "bg-terracotta/10 text-terracotta",
    media: "bg-gold/15 text-gold",
    baixa: "bg-sage/15 text-sage",
  }[p];
}
