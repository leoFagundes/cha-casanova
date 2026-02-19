import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payment = new Payment(client);

    const result = await payment.create({
      body: {
        ...body,
        payment_method_id: body.payment_method_id || "pix",
      },
    });

    console.log("Payment created:", result.id);
    console.log("result:", result);

    return NextResponse.json({
      id: String(result.id),
      qr_code: result.point_of_interaction?.transaction_data?.qr_code,
      qr_code_base64:
        result.point_of_interaction?.transaction_data?.qr_code_base64,
      ticket_url: result.point_of_interaction?.transaction_data?.ticket_url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
