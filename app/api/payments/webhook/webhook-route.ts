export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { paymentAPI } from "@/lib/mercadopago";
import GiftRepository from "@/services/repositories/GiftRepository";
import { GiftContribution } from "@/app/types";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Ignora notificações que não sejam de pagamento
    if (body.type !== "payment") return NextResponse.json({ ok: true });

    const paymentId = String(body.data.id);
    const payment = await paymentAPI.get({ id: paymentId });

    // Só processa pagamentos aprovados
    if (payment.status !== "approved") return NextResponse.json({ ok: true });

    const metadata = payment.metadata as {
      gift_id: string;
      guest_name: string;
      guest_email?: string;
      message?: string;
    };

    const contribution: GiftContribution = {
      name: metadata.guest_name,
      email: metadata.guest_email ?? "",
      message: metadata.message ?? "",
      paymentId,
      createdAt: new Date().toISOString(),
    };

    // 1. Adiciona a contribution no Gift e incrementa taken
    await GiftRepository.addContribution(metadata.gift_id, contribution);

    // ✅ CORREÇÃO 2: Cria o documento na coleção "payments".
    // A page.tsx usa PaymentRepository.getAll() para montar giftsWithContributions.
    // Sem este documento, a coleção fica vazia e nada aparece como doado.
    const { FieldValue } = await import("firebase-admin/firestore");

    await adminDb
      .collection("payments")
      .doc(paymentId)
      .set({
        giftId: metadata.gift_id,
        guestName: metadata.guest_name,
        email: metadata.guest_email ?? "",
        message: metadata.message ?? "",
        status: "approved",
        method: payment.payment_method_id ?? "",
        amount: payment.transaction_amount ?? 0,
        createdAt: FieldValue.serverTimestamp(),
      });

    console.log("✅ Contribution e payment salvos:", paymentId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    // Sempre retorna 200 para o MP não retentar indefinidamente
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
