import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  const { giftId, giftName, price, guestName, message } = await req.json();

  // Converte "R$ 389,90" → 389.90
  const amount = parseFloat(
    price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
  );

  const preference = new Preference(client);

  const response = await preference.create({
    body: {
      items: [
        {
          id: String(giftId),
          title: giftName,
          quantity: 1,
          unit_price: amount,
          currency_id: "BRL",
        },
      ],
      metadata: { gift_id: giftId, guest_name: guestName, message },
      payment_methods: { installments: 3 },
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/webhook`,
    },
  });

  return NextResponse.json({
    amount,
  });
}
