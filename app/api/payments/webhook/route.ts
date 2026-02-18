export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { paymentAPI } = await import("../../../../lib/mercadopago");
    const { adminDb } = await import("../../../../lib/firebase-admin");
    const { FieldValue } = await import("firebase-admin/firestore");

    const body = await req.json();

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

    await adminDb.runTransaction(async (tx: any) => {
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

      tx.update(giftRef, {
        taken: FieldValue.increment(1),
        donors: FieldValue.arrayUnion(donor),
      });

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
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
