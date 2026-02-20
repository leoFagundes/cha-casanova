// Tipos reais do Firebase — fonte única da verdade.
// Não há mais PublicGift, Donor, ou PUBLIC_GIFTS mock.
export type { Gift, GiftContribution, Priority } from "@/app/types";

import type { Gift } from "@/app/types";

export type GiftStatus = "disponivel" | "reservado" | "doado";

export function getStatus(g: Gift): GiftStatus {
  // if (g.contributions.length >= g.qty) return "doado";
  if (g.taken >= g.qty) return "doado";
  if (g.taken > 0) return "reservado";
  return "disponivel";
}

/** Gera iniciais a partir do nome (ex: "Fernanda Lima" → "FL") */
export function makeAvatar(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Formata ISO string do Firestore para exibição (ex: "10 jun. 2025") */
export function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export const CAT_FILTERS = [
  { value: "todos", label: "Todos", emoji: "✨" },
  { value: "Cozinha", label: "Cozinha", emoji: "🍳" },
  { value: "Sala", label: "Sala", emoji: "🛋️" },
  { value: "Quarto", label: "Quarto", emoji: "🛏️" },
  { value: "Banheiro", label: "Banheiro", emoji: "🚿" },
  { value: "Decoração", label: "Decoração", emoji: "🌿" },
  { value: "Cartão de Presente", label: "Cartão de Presente", emoji: "🎁" },
  { value: "Eletrodoméstico", label: "Eletro", emoji: "⚡" },
];

export const STATUS_FILTERS = [
  { value: "todos", label: "Todos" },
  { value: "disponivel", label: "Disponíveis" },
  { value: "doado", label: "Escolhidos" },
];
