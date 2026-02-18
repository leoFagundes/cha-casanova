import { NextRequest, NextResponse } from "next/server";
import { paymentAPI } from "@/lib/mercadopago";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ status: "unknown" });

  try {
    const payment = await paymentAPI.get({ id });
    return NextResponse.json({ status: payment.status });
  } catch {
    return NextResponse.json({ status: "error" });
  }
}
