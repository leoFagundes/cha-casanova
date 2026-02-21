import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  arrayUnion,
  increment,
  serverTimestamp,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Gift, GiftContribution } from "@/app/types";

class GiftRepository {
  static collectionName = "gifts";

  /**
   * Busca todos os presentes
   */
  static async getAll(): Promise<Gift[]> {
    try {
      const snapshot = await getDocs(
        query(collection(db, this.collectionName), orderBy("name")),
      );

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Gift, "id">),
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Cria um novo presente
   */
  static async create(data: Omit<Gift, "id">): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), data);

      return docRef.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Atualiza um presente
   */
  static async update(id: string, data: Partial<Gift>): Promise<boolean> {
    try {
      if (!id) {
        console.error("ID inválido:", id);
        return false;
      }

      const docRef = doc(db, this.collectionName, id);

      await updateDoc(docRef, data);

      return true;
    } catch (error) {
      console.error("Erro ao atualizar presente:", error);
      return false;
    }
  }

  /**
   * Deleta um presente
   */
  static async delete(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));

      console.log("Presente deletado");

      return true;
    } catch (error) {
      console.error("Erro ao deletar presente:", error);

      return false;
    }
  }

  /**
   * Busca um presente pelo name
   */
  static async getByName(name: string): Promise<Gift | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("name", "==", name),
        limit(1),
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) return null;

      const docSnap = snapshot.docs[0];

      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Gift, "id">),
      };
    } catch (error) {
      console.error("Erro ao buscar gift por name:", error);
      return null;
    }
  }

  /**
   * Adiciona uma contribuição ao presente
   * Usado quando pagamento for aprovado
   */
  static async addContribution(
    giftId: string,
    contribution: GiftContribution,
  ): Promise<boolean> {
    try {
      const docRef = doc(db, this.collectionName, giftId);

      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        const existing: GiftContribution[] = data.contributions ?? [];
        const alreadySaved = existing.some(
          (c) => c.paymentId === contribution.paymentId,
        );
        if (alreadySaved) {
          console.log(
            "Contribution já existe, ignorando:",
            contribution.paymentId,
          );
          return true;
        }
      }

      await updateDoc(docRef, {
        contributions: arrayUnion(contribution),
        taken: increment(1),
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  static subscribe(callback: (gifts: Gift[]) => void) {
    const q = query(collection(db, this.collectionName), orderBy("name"));

    return onSnapshot(q, (snapshot) => {
      const gifts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Gift, "id">),
        contributions: doc.data().contributions ?? [],
        taken: doc.data().contributions?.length ?? 0,
      }));

      callback(gifts);
    });
  }
}

export default GiftRepository;
