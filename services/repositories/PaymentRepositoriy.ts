import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Payment {
  id: string;
  giftId: string;
  guestName: string;
  message?: string;
  createdAt?: any;
}

class PaymentRepository {
  static collectionName = "payments";

  static async getAll(): Promise<Payment[]> {
    const snapshot = await getDocs(
      query(
        collection(db, this.collectionName),
        where("status", "==", "approved"),
        orderBy("createdAt", "desc"),
      ),
    );

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Payment, "id">),
    }));
  }
}

export default PaymentRepository;
