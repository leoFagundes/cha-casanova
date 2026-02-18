import { MercadoPagoConfig, Payment } from "mercadopago";

export const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export const paymentAPI = new Payment(mpClient);
