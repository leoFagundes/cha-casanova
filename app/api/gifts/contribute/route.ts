import { NextRequest, NextResponse } from "next/server";
import GiftRepository from "@/services/repositories/GiftRepository";
import { GiftContribution } from "@/app/types";

export async function POST(req: NextRequest) {
  try {
    const { giftId, name, email, message, paymentMethod } = await req.json();

    if (!giftId || !name) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const contribution: GiftContribution = {
      name: name.trim(),
      email: email?.trim() ?? "",
      message: message?.trim() ?? "",
      paymentId: paymentMethod === "in_person" ? "in_person" : "",
      createdAt: new Date().toISOString(),
    };

    const ok = await GiftRepository.addContribution(giftId, contribution);

    if (!ok) {
      return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
    }

    console.log(`✅ Entrega em mãos registrada: ${name} → gift ${giftId}`);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contribute route error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
