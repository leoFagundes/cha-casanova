"use client";

import { useState, useEffect, useRef } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import type { Gift, GiftContribution } from "@/app/types";
import { getStatus, makeAvatar, formatDate } from "./gifts.public";
import GiftRepository from "@/services/repositories/GiftRepository";

// Inicializa o SDK do MP uma vez
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: "pt-BR" });

type Step = "detail" | "form" | "payment" | "success";

interface GiftModalProps {
  gift: Gift | null;
  onClose: () => void;
  // giftId agora é string (ID do Firestore)
  onChoose: (giftId: string, name: string, message: string) => void;
}

export default function GiftModal({ gift, onClose, onChoose }: GiftModalProps) {
  const [step, setStep] = useState<Step>("detail");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [isCreatingPref, setIsCreatingPref] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkState, setCheckState] = useState<
    "idle" | "checking" | "approved" | "pending" | "error"
  >("idle");
  const [deliveryMethod, setDeliveryMethod] = useState<
    "pix_card" | "in_person"
  >("pix_card");
  const [isSubmittingInPerson, setIsSubmittingInPerson] = useState(false);

  const paymentHandledRef = useRef(false);

  // Polling automático a cada 3s enquanto aguarda pagamento Pix
  useEffect(() => {
    if (!paymentId || paymentApproved) return;
    const interval = setInterval(autoCheckPaymentStatus, 3000);
    return () => clearInterval(interval);
  }, [paymentId, paymentApproved]);

  // Reset completo ao abrir um novo presente
  const lastGiftIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!gift) return;

    // Só reseta se for OUTRO gift
    if (lastGiftIdRef.current === gift.id) return;

    lastGiftIdRef.current = gift.id;

    paymentHandledRef.current = false;

    setStep("detail");
    setGuestName("");
    setGuestEmail("");
    setMessage("");
    setNameErr(false);
    setEmailErr(false);
    setPreferenceId(null);
    setPaymentError(null);
    setPixQrCode(null);
    setPixCode(null);
    setPaymentId(null);
    setPaymentApproved(false);
    setCopied(false);
    setCheckState("idle");
    setDeliveryMethod("pix_card");
    setIsSubmittingInPerson(false);
  }, [gift?.id]);
  // useEffect(() => {
  //   if (gift) {
  //     paymentHandledRef.current = false;

  //     setStep("detail");
  //     setGuestName("");
  //     setGuestEmail("");
  //     setMessage("");
  //     setNameErr(false);
  //     setEmailErr(false);
  //     setPreferenceId(null);
  //     setPaymentError(null);
  //     setPixQrCode(null);
  //     setPixCode(null);
  //     setPaymentId(null);
  //     setPaymentApproved(false);
  //     setCopied(false);
  //     setCheckState("idle");
  //     setDeliveryMethod("pix_card");
  //     setIsSubmittingInPerson(false);
  //   }
  // }, [gift]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!gift) return null;

  const status = getStatus(gift);
  const isFull = status === "doado";
  const remaining = gift.qty - gift.taken;
  const contributors = gift.contributions ?? [];

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ── Valida o formulário e cria a preferência de pagamento ──────────────────
  // async function handleGoToPayment() {
  //   let hasError = false;
  //   if (!guestName.trim()) {
  //     setNameErr(true);
  //     hasError = true;
  //   }
  //   if (!guestEmail.trim() || !isValidEmail(guestEmail)) {
  //     setEmailErr(true);
  //     hasError = true;
  //   }
  //   if (hasError) return;

  //   if (!gift) return;

  //   setIsCreatingPref(true);
  //   try {
  //     const res = await fetch("/api/payments/create-preference", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         giftId: gift.id,
  //         giftName: gift.name,
  //         price: gift.price,
  //         guestName: guestName.trim(),
  //         message: message.trim(),
  //       }),
  //     });

  //     if (!res.ok) throw new Error("Erro ao criar pagamento");

  //     const data = await res.json();
  //     setPreferenceId(data.preferenceId);
  //     setAmount(data.amount);
  //     setStep("payment");
  //   } catch (err) {
  //     setPaymentError("Não foi possível iniciar o pagamento. Tente novamente.");
  //     console.error(err);
  //   } finally {
  //     setIsCreatingPref(false);
  //   }
  // }

  // No handleGoToPayment — REMOVA a chamada para /create-preference
  async function handleGoToPayment() {
    let hasError = false;
    if (!guestName.trim()) {
      setNameErr(true);
      hasError = true;
    }
    if (!guestEmail.trim() || !isValidEmail(guestEmail)) {
      setEmailErr(true);
      hasError = true;
    }
    if (hasError) return;

    // Converte "R$ 389,90" → 389.90
    const parsed = parseFloat(
      gift!.price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
    );
    setAmount(parsed);
    setStep("payment"); // vai direto, sem criar preferência
  }

  // ── Copia o código Pix para o clipboard ────────────────────────────────────
  function handleCopyPix() {
    if (!pixCode) return;
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Polling silencioso (chamado pelo interval) ─────────────────────────────
  async function autoCheckPaymentStatus() {
    if (!paymentId || paymentApproved) return;
    try {
      const res = await fetch(`/api/payments/status?id=${paymentId}`);
      const data = await res.json();
      if (data.status === "approved") {
        handlePaymentSuccess();
      }
    } catch {}
  }

  // ── Verificação manual (botão "Já paguei") ─────────────────────────────────
  async function checkPaymentStatus() {
    if (!paymentId || paymentApproved || checkState === "checking") return;
    setCheckState("checking");
    try {
      const res = await fetch(`/api/payments/status?id=${paymentId}`);
      const data = await res.json();
      if (data.status === "approved") {
        setCheckState("approved");
        handlePaymentSuccess();
      } else {
        setCheckState("pending");
        setTimeout(() => setCheckState("idle"), 2000);
      }
    } catch {
      setCheckState("error");
      setTimeout(() => setCheckState("idle"), 2000);
    }
  }

  // ── Confirma pagamento e avança para sucesso ───────────────────────────────
  async function handlePaymentSuccess() {
    if (paymentHandledRef.current) return;
    if (step === "success") return;

    paymentHandledRef.current = true;

    setPaymentApproved(true);

    onChoose(gift!.id, guestName, message);

    const contribution: GiftContribution = {
      name: guestName,
      email: guestEmail ?? "",
      message: message ?? "",
      paymentId: paymentId ?? "",
      createdAt: new Date(),
    };

    await GiftRepository.addContribution(gift!.id, contribution);

    setStep("success");
  }

  // ── Entrega em mãos: salva direto no Firebase sem pagamento ──────────────────
  async function handleInPerson() {
    let hasError = false;
    if (!guestName.trim()) {
      setNameErr(true);
      hasError = true;
    }
    if (hasError) return;

    setIsSubmittingInPerson(true);
    try {
      const res = await fetch("/api/gifts/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId: gift!.id,
          name: guestName.trim(),
          email: guestEmail.trim(),
          message: message.trim(),
          paymentMethod: "in_person",
        }),
      });
      if (!res.ok) throw new Error("Erro ao registrar");
      onChoose(gift!.id, guestName, message);
      setStep("success");
    } catch (err) {
      setPaymentError("Não foi possível registrar. Tente novamente.");
      console.error(err);
    } finally {
      setIsSubmittingInPerson(false);
    }
  }

  const inputCls =
    "w-full bg-cream border border-blush/60 rounded-xl px-4 py-3 text-[0.9rem] font-light text-brand-dark placeholder:text-brand-text-light/40 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/12 transition-all font-jost";

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-brand-dark/55 backdrop-blur-[8px]"
        onClick={onClose}
      />

      <div className="relative bg-warm-white w-full sm:max-w-2xl max-h-[95svh] sm:max-h-[90vh] overflow-y-auto sm:rounded-3xl rounded-t-3xl shadow-[0_40px_100px_rgba(44,30,26,0.3)]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-cream/80 grid place-items-center text-brand-text-light hover:bg-rose/15 hover:text-rose transition-all"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── DETALHE ── */}
        {step === "detail" && (
          <>
            {/* Hero: imagem real ou emoji */}
            <div className="relative w-full aspect-[16/8] bg-white overflow-hidden">
              {gift.imageUrl ? (
                <img
                  src={gift.imageUrl}
                  alt={gift.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gold-light via-blush to-rose/40 flex items-center justify-center">
                  <span
                    className="text-[6rem]"
                    style={{
                      filter: "drop-shadow(0 8px 20px rgba(74,48,40,0.2))",
                    }}
                  >
                    {gift.emoji}
                  </span>
                </div>
              )}

              {isFull && (
                <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[4px] flex items-center justify-center">
                  <span className="font-cormorant italic text-white text-xl font-light border border-white/40 px-5 py-1.5 rounded-full backdrop-blur-sm bg-gray-500/30 text-shadow">
                    Item já foi Escolhido ♡
                  </span>
                </div>
              )}
              <span className="absolute bottom-4 left-4 text-[0.68rem] font-light text-white tracking-[0.16em] uppercase  border border-white/40 px-5 py-1.5 rounded-full backdrop-blur-sm bg-gray-500/30 text-shadow">
                {gift.emoji} {gift.cat}
              </span>
            </div>

            <div className="p-7 pt-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="font-cormorant text-[1.7rem] font-light text-brand-dark leading-tight flex-1">
                  {gift.name}
                </h2>
                <span className="font-cormorant text-[1.6rem] font-light text-terracotta shrink-0">
                  {gift.price}
                </span>
              </div>

              {/* Disponibilidade e link */}
              {(remaining > 0 || gift.link) && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${isFull ? "bg-blush" : "bg-sage"}`}
                    />
                    <span className="text-[0.75rem] font-light text-brand-text-light">
                      {isFull
                        ? "Presente já escolhido"
                        : `${remaining} disponíve${remaining > 1 ? "is" : "l"}`}
                    </span>
                  </div>
                  {gift.link && (
                    <a
                      href={gift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.72rem] font-light text-rose hover:underline flex items-center gap-1 ml-auto"
                    >
                      Ver na loja
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              {/* Progress bar */}
              {gift.qty > 1 && (
                <div className="mb-5">
                  <div className="flex justify-between text-[0.7rem] font-light text-brand-text-light mb-1.5">
                    <span>
                      {gift.taken} de {gift.qty} escolhidos
                    </span>
                    <span>{Math.round((gift.taken / gift.qty) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-blush/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blush to-rose rounded-full transition-all duration-700"
                      style={{ width: `${(gift.taken / gift.qty) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <p className="text-[0.88rem] font-light text-brand-text-light leading-relaxed mb-6">
                {gift.desc}
              </p>

              {/* Contribuintes reais do Firebase */}
              {contributors.length > 0 && (
                <div className="mb-6">
                  <p className="text-[0.68rem] font-light tracking-[0.22em] uppercase text-gold mb-3 flex items-center gap-2">
                    <span className="block w-5 h-px bg-gold" />
                    Escolhido por
                  </p>
                  {contributors.map((c, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-4 bg-cream rounded-2xl mb-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush to-rose flex items-center justify-center text-white text-[0.72rem] font-medium shrink-0">
                        {makeAvatar(c.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-[0.82rem] font-medium text-brand-dark">
                            {c.name}
                          </p>
                          {c.createdAt && (
                            <span className="text-[0.68rem] font-light text-brand-text-light/60 shrink-0">
                              {formatDate(c.createdAt.toString())}
                            </span>
                          )}
                        </div>
                        {c.message && (
                          <p className="font-cormorant italic text-[0.95rem] text-brand-text-light">
                            "{c.message}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isFull ? (
                <button
                  onClick={() => setStep("form")}
                  className="w-full flex items-center justify-center gap-2.5 bg-terracotta text-white text-[0.82rem] font-medium tracking-[0.14em] uppercase py-4 rounded-full hover:bg-rose-deep transition-all hover:-translate-y-0.5 shadow-[0_8px_28px_rgba(139,74,53,0.3)]"
                >
                  Quero dar este presente
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <div className="w-full text-center py-4 rounded-full bg-blush/30 text-brand-text-light text-[0.82rem] font-light">
                  Este presente já foi escolhido com amor ♡
                </div>
              )}
            </div>
          </>
        )}

        {/* ── FORMULÁRIO ── */}
        {step === "form" && (
          <div className="p-7 sm:p-9">
            <button
              onClick={() => setStep("detail")}
              className="flex items-center gap-1.5 text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light hover:text-rose mb-7 group"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="block w-6 h-px bg-gold" />
              <span className="text-[0.68rem] font-light tracking-[0.25em] uppercase text-gold">
                Confirmação
              </span>
            </div>
            <h2 className="font-cormorant text-[2rem] font-light text-brand-dark mb-1">
              Que presente <em className="italic text-rose">lindo!</em>
            </h2>
            <p className="text-[0.85rem] font-light text-brand-text-light mb-5 leading-relaxed">
              Deixe seus dados e uma mensagem para o casal.
            </p>

            {/* ── Seletor de método de entrega ── */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              <button
                onClick={() => setDeliveryMethod("pix_card")}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  deliveryMethod === "pix_card"
                    ? "border-terracotta bg-terracotta/6"
                    : "border-blush/40 bg-cream hover:border-rose/40"
                }`}
              >
                <span className="text-2xl">💳</span>
                <span className="text-[0.72rem] font-medium tracking-[0.08em] uppercase text-brand-dark">
                  Pix ou Cartão
                </span>
                <span className="text-[0.65rem] font-light text-brand-text-light text-center">
                  Pagamento online seguro
                </span>
              </button>
              <button
                onClick={() => {
                  setDeliveryMethod("in_person");
                  setEmailErr(false);
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  deliveryMethod === "in_person"
                    ? "border-sage bg-sage/10"
                    : "border-blush/40 bg-cream hover:border-sage/40"
                }`}
              >
                <span className="text-2xl">🤝</span>
                <span className="text-[0.72rem] font-medium tracking-[0.08em] uppercase text-brand-dark">
                  Entregar em mãos
                </span>
                <span className="text-[0.65rem] font-light text-brand-text-light text-center">
                  Combinar com o casal
                </span>
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-cream rounded-2xl mb-7 border border-blush/30">
              <span className="text-3xl">{gift.emoji}</span>
              <div>
                <p className="font-cormorant text-[1.05rem] text-brand-dark">
                  {gift.name}
                </p>
                <p className="text-[0.78rem] font-light text-brand-text-light">
                  {gift.price} · {gift.cat}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                  Seu nome <span className="text-rose">*</span>
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    setNameErr(false);
                  }}
                  placeholder="Como você se chama?"
                  className={`${inputCls} ${nameErr ? "border-terracotta ring-2 ring-terracotta/15" : ""}`}
                />
                {nameErr && (
                  <p className="text-[0.72rem] text-terracotta mt-1">
                    Por favor, informe seu nome.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                  Seu e-mail{" "}
                  {deliveryMethod === "pix_card" ? (
                    <span className="text-rose">*</span>
                  ) : (
                    <span className="text-brand-text-light/40">(opcional)</span>
                  )}
                </label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => {
                    setGuestEmail(e.target.value);
                    setEmailErr(false);
                  }}
                  placeholder="seu@email.com"
                  className={`${inputCls} ${emailErr ? "border-terracotta ring-2 ring-terracotta/15" : ""}`}
                />
                {emailErr && (
                  <p className="text-[0.72rem] text-terracotta mt-1">
                    Por favor, informe um e-mail válido.
                  </p>
                )}
                {deliveryMethod === "pix_card" && (
                  <p className="text-[0.7rem] text-brand-text-light/60 mt-1">
                    Necessário para confirmação do pagamento
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                  Mensagem para o casal{" "}
                  <span className="text-brand-text-light/40">(opcional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Escreva uma mensagem carinhosa para Natália & Leonardo…"
                  className={`${inputCls} resize-none`}
                  maxLength={300}
                />
              </div>
            </div>

            {paymentError && (
              <p className="mt-3 text-[0.8rem] text-terracotta bg-terracotta/8 rounded-xl px-4 py-3">
                {paymentError}
              </p>
            )}

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setStep("detail")}
                className="sm:text-[0.78rem] text-[0.6rem] font-light tracking-[0.14em] uppercase px-5 py-3.5 rounded-full border border-blush text-brand-text-light hover:border-rose hover:text-rose transition-all"
              >
                Cancelar
              </button>

              {deliveryMethod === "pix_card" ? (
                <button
                  onClick={handleGoToPayment}
                  disabled={isCreatingPref}
                  className="flex-1 flex items-center justify-center gap-2 bg-terracotta text-white sm:text-[0.78rem] text-[0.6rem] font-medium tracking-[0.14em] uppercase py-3.5 rounded-full hover:bg-rose-deep transition-all hover:-translate-y-0.5 shadow-[0_6px_22px_rgba(139,74,53,0.28)] disabled:opacity-60"
                >
                  {isCreatingPref
                    ? "Preparando pagamento…"
                    : "Ir para o pagamento →"}
                </button>
              ) : (
                <button
                  onClick={handleInPerson}
                  disabled={isSubmittingInPerson}
                  className="flex-1 flex items-center justify-center gap-2 bg-sage text-white sm:text-[0.78rem] text-[0.6rem] font-medium tracking-[0.14em] uppercase py-3.5 rounded-full hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-[0_6px_22px_rgba(138,158,137,0.35)] disabled:opacity-60"
                >
                  {isSubmittingInPerson
                    ? "Registrando…"
                    : "Confirmar presente 🤝"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── PAGAMENTO (Brick do MP) ── */}
        {step === "payment" && amount > 0 && (
          <div className="p-7">
            <button
              onClick={() => setStep("form")}
              className="flex items-center gap-1.5 text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light hover:text-rose mb-6 group"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="group-hover:-translate-x-1 transition-transform"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="block w-6 h-px bg-gold" />
              <span className="text-[0.68rem] font-light tracking-[0.25em] uppercase text-gold">
                Pagamento seguro
              </span>
            </div>
            <h2 className="font-cormorant text-[1.9rem] font-light text-brand-dark mb-1">
              Finalize o <em className="italic text-rose">presente</em>
            </h2>
            <p className="text-[0.82rem] font-light text-brand-text-light mb-6">
              Escolha Pix ou cartão de crédito para confirmar.
            </p>

            {/* Resumo */}
            <div className="flex items-center justify-between p-4 bg-cream rounded-2xl mb-6 border border-blush/30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{gift.emoji}</span>
                <p className="font-cormorant text-[1rem] text-brand-dark">
                  {gift.name}
                </p>
              </div>
              <span className="font-cormorant text-[1.2rem] text-terracotta">
                {gift.price}
              </span>
            </div>

            {/* Brick do MP — só renderiza enquanto o QR Code não aparece */}
            {!pixQrCode && (
              <Payment
                initialization={{
                  amount,
                  // preferenceId: preferenceId!,
                  payer: { email: guestEmail },
                }}
                customization={{
                  paymentMethods: {
                    ticket: "all",
                    creditCard: "all",
                    // debitCard: "all",
                    bankTransfer: ["pix"],
                    minInstallments: 1,
                    maxInstallments: 5,
                  },

                  visual: {
                    style: {
                      theme: "default",
                      customVariables: {
                        baseColor: "#8b4a35",
                        buttonTextColor: "#ffffff",
                      },
                    },
                  },
                }}
                onSubmit={async ({ formData }) => {
                  const res = await fetch("/api/payments/create-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...formData, // contém payment_method_id, token, installments

                      transaction_amount: amount,
                      description: gift!.name,

                      payer: {
                        ...formData.payer,
                        email: guestEmail,
                      },

                      metadata: {
                        gift_id: gift!.id,
                        guest_name: guestName,
                        message,
                      },
                    }),
                  });

                  const data = await res.json();

                  // ✅ CORREÇÃO 3: cartão de crédito aprovado na hora retorna
                  // status "approved" diretamente — não há QR Code nem polling.
                  // Nesse caso vamos direto para a tela de sucesso.
                  if (data.status === "approved") {
                    handlePaymentSuccess();
                    return { id: data.id };
                  }

                  // Pix: guarda o id para polling e exibe o QR Code
                  setPaymentId(data.id);
                  setPixQrCode(data.qr_code_base64 ?? null);
                  setPixCode(data.qr_code ?? null);

                  return { id: data.id };
                }}
                onError={(error) => {
                  console.error("Payment error:", error);
                  setPaymentError(
                    "Ocorreu um erro no pagamento. Tente novamente.",
                  );
                }}
                onReady={() => {}}
              />
            )}

            {/* QR Code do Pix */}
            {pixQrCode && (
              <div className="flex flex-col items-center gap-4 bg-cream rounded-2xl my-6 p-4 border border-blush/30">
                <img
                  src={`data:image/png;base64,${pixQrCode}`}
                  alt="QR Code Pix"
                  className="w-64 h-64"
                />

                <textarea
                  value={pixCode || ""}
                  readOnly
                  className="w-full text-xs p-2 border rounded max-w-[80%]"
                />

                <button
                  onClick={handleCopyPix}
                  className="px-4 py-2 bg-terracotta text-white rounded-lg text-sm hover:bg-rose-deep transition-all"
                >
                  {copied ? "Copiado ✓" : "Copiar código Pix"}
                </button>

                <button
                  onClick={checkPaymentStatus}
                  disabled={checkState === "checking" || paymentApproved}
                  className="mt-4 bg-terracotta text-white px-4 py-2 rounded transition-all disabled:opacity-60"
                >
                  {checkState === "idle" && "Já paguei, verificar pagamento"}
                  {checkState === "checking" && "Verificando..."}
                  {checkState === "approved" && "Pagamento confirmado ✓"}
                  {checkState === "pending" && "Pagamento ainda não encontrado"}
                  {checkState === "error" && "Erro ao verificar"}
                </button>
              </div>
            )}

            <p className="text-center text-[0.7rem] font-light text-brand-text-light/50 mt-4 flex items-center justify-center gap-1.5">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Pagamento 100% seguro via Mercado Pago
            </p>
          </div>
        )}

        {/* ── SUCESSO ── */}
        {step === "success" && (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blush to-rose grid place-items-center shadow-[0_12px_40px_rgba(201,134,109,0.4)] mb-7">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="white"
                stroke="none"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
            <h2 className="font-cormorant text-[2.2rem] font-light text-brand-dark mb-3">
              Presente <em className="italic text-rose">confirmado!</em>
            </h2>
            <p className="text-[0.88rem] font-light text-brand-text-light leading-relaxed max-w-sm mb-2">
              <span className="font-medium text-brand-dark">{guestName}</span>,{" "}
              {deliveryMethod === "in_person"
                ? "seu presente foi registrado! Natália & Leonardo ficarão felizes. Não esqueça de combiná-lo pessoalmente 🤝"
                : "seu pagamento foi aprovado e o presente foi registrado. Natália & Leonardo vão adorar!"}
            </p>
            {message && (
              <div className="mt-4 w-full max-w-sm bg-cream rounded-2xl p-5 border border-blush/30 text-left">
                <p className="text-[0.68rem] font-light tracking-[0.18em] uppercase text-gold mb-2">
                  Sua mensagem
                </p>
                <p className="font-cormorant italic text-[1.05rem] text-brand-text-light">
                  "{message}"
                </p>
              </div>
            )}
            <button
              onClick={onClose}
              className="mt-7 flex items-center justify-center gap-2 bg-terracotta text-white text-[0.78rem] font-medium tracking-[0.14em] uppercase px-8 py-3.5 rounded-full hover:bg-rose-deep transition-all shadow-[0_6px_22px_rgba(139,74,53,0.28)]"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
