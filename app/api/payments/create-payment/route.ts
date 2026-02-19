import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payment = new Payment(client);

    const isPix = body.payment_method_id === "pix";

    const result = await payment.create({
      body: {
        transaction_amount: body.transaction_amount,
        description: body.description,
        payment_method_id: body.payment_method_id,

        ...(body.token && { token: body.token }),

        installments: isPix ? 1 : (body.installments ?? 1),

        payer: body.payer,

        metadata: {
          gift_id: body.metadata?.gift_id,
          guest_name: body.metadata?.guest_name,
          // guest_email: necessário para o webhook gravar na GiftContribution
          guest_email: body.payer?.email ?? "",
          message: body.metadata?.message ?? "",
        },

        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/webhook`,
      },
    });

    console.log(
      "Payment created:",
      result.id,
      "| method:",
      result.payment_method_id,
      "| installments:",
      result.installments,
      "| status:",
      result.status,
    );

    return NextResponse.json({
      id: String(result.id),
      // ✅ Retorna status: cartão aprovado na hora vem "approved" aqui mesmo.
      // O GiftModal usa isso para ir direto para a tela de sucesso.
      status: result.status,
      // Campos Pix — null para cartão
      qr_code: result.point_of_interaction?.transaction_data?.qr_code ?? null,
      qr_code_base64:
        result.point_of_interaction?.transaction_data?.qr_code_base64 ?? null,
      ticket_url:
        result.point_of_interaction?.transaction_data?.ticket_url ?? null,
    });
  } catch (error) {
    console.error("create-payment error:", error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
