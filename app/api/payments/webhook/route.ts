export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { paymentAPI } from "@/lib/mercadopago";
import GiftRepository from "@/services/repositories/GiftRepository";
import { GiftContribution } from "@/app/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type !== "payment") return NextResponse.json({ ok: true });

    const paymentId = String(body.data.id);

    const payment = await paymentAPI.get({ id: paymentId });

    if (payment.status !== "approved") return NextResponse.json({ ok: true });

    const metadata = payment.metadata as {
      gift_id: string;
      guest_name: string;
      guest_email: string;
      message: string;
    };

    const contribution: GiftContribution = {
      name: metadata.guest_name,
      email: metadata.guest_email,
      message: metadata.message,
      paymentId,
      createdAt: new Date().toISOString(),
    };

    await GiftRepository.addContribution(metadata.gift_id, contribution);

    console.log("Contribution salva:", contribution);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
