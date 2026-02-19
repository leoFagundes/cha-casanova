export type Priority = "alta" | "media" | "baixa";

export interface GiftContribution {
  name: string;
  email?: string;
  message?: string;
  paymentId: string;
  createdAt: Date | String;
}

export interface GiftBase {
  name: string;

  cat: string;

  emoji: string;

  desc: string;

  price: string;

  prioridade: Priority;

  qty: number;

  taken: number;

  link?: string;

  imageUrl?: string;

  contributions: GiftContribution[];
}

export interface Gift extends GiftBase {
  id: string;
}

export type GiftCreate = GiftBase;
