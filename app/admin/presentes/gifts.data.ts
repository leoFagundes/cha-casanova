import { Priority } from "@/app/types";

export const CATEGORIES = [
  { value: "Cozinha", emoji: "🍳" },
  { value: "Sala", emoji: "🛋️" },
  { value: "Quarto", emoji: "🛏️" },
  { value: "Banheiro", emoji: "🚿" },
  { value: "Decoração", emoji: "🌿" },
  { value: "Eletrodoméstico", emoji: "⚡" },
  { value: "Cartão de Presente", emoji: "🎁" },
  { value: "Outro", emoji: "✨" },
];

export function prioLabel(p: Priority) {
  return p === "alta" ? "Alta" : p === "media" ? "Média" : "Baixa";
}

export function prioClass(p: Priority) {
  return {
    alta: "bg-terracotta/10 text-terracotta",
    media: "bg-gold/15 text-gold",
    baixa: "bg-sage/15 text-sage",
  }[p];
}
