export type Priority = "alta" | "media" | "baixa";

export interface GiftContribution {
  name: string;
  email?: string;
  message?: string;
  paymentId: string;
  createdAt: string;
}

export interface Gift {
  /**
   * ID do documento Firestore
   */
  id: string;

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
