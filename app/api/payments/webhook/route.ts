import { NextRequest, NextResponse } from "next/server";
import { paymentAPI } from "@/lib/mercadopago";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // MP também envia notificações de outros tipos — ignora o que não for pagamento
    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const paymentId = String(body.data?.id);
    const payment = await paymentAPI.get({ id: paymentId });

    if (payment.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    const { gift_id, guest_name, message } = payment.metadata as {
      gift_id: string;
      guest_name: string;
      message: string;
    };

    const giftRef = adminDb.collection("gifts").doc(gift_id);
    const paymentRef = adminDb.collection("payments").doc(paymentId);

    // Roda tudo em uma transação para evitar condições de corrida
    await adminDb.runTransaction(async (tx) => {
      const giftSnap = await tx.get(giftRef);
      if (!giftSnap.exists) throw new Error("Gift not found");

      const donor = {
        name: guest_name,
        message: message || "",
        paymentId,
        date: new Date().toISOString(),
        avatar: guest_name
          .split(" ")
          .slice(0, 2)
          .map((w: string) => w[0]?.toUpperCase() ?? "")
          .join(""),
      };

      // Incrementa o contador e adiciona o doador
      tx.update(giftRef, {
        taken: FieldValue.increment(1),
        donors: FieldValue.arrayUnion(donor),
      });

      // Salva o pagamento para referência
      tx.set(paymentRef, {
        giftId: gift_id,
        guestName: guest_name,
        message: message || "",
        status: "approved",
        method: payment.payment_method_id,
        amount: payment.transaction_amount,
        createdAt: FieldValue.serverTimestamp(),
      });
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    // Retorna 200 mesmo com erro — MP re-tenta em caso de 5xx
    return NextResponse.json({ ok: true });
  }
}

// MP faz GET para verificar se o webhook está ativo
export async function GET() {
  return NextResponse.json({ ok: true });
}
