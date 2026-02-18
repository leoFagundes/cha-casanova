"use client";

import { useState, useEffect } from "react";
import type { PublicGift } from "./gifts.public";
import { getStatus } from "./gifts.public";

interface GiftModalProps {
  gift: PublicGift | null;
  onClose: () => void;
  onChoose: (giftId: number, name: string, message: string) => void;
}

type Step = "detail" | "form" | "success";

export default function GiftModal({ gift, onClose, onChoose }: GiftModalProps) {
  const [step, setStep] = useState<Step>("detail");
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [nameErr, setNameErr] = useState(false);

  // Reset on open
  useEffect(() => {
    if (gift) {
      setStep("detail");
      setGuestName("");
      setMessage("");
      setNameErr(false);
    }
  }, [gift]);

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

  const handleSubmit = () => {
    if (!guestName.trim()) {
      setNameErr(true);
      return;
    }
    onChoose(gift.id, guestName.trim(), message.trim());
    setStep("success");
  };

  const inputCls =
    "w-full bg-cream border border-blush/60 rounded-xl px-4 py-3 text-[0.9rem] font-light text-brand-dark placeholder:text-brand-text-light/40 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/12 transition-all resize-none font-jost";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ animation: "backdropIn .25s ease" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/55 backdrop-blur-[8px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative bg-warm-white w-full sm:max-w-2xl max-h-[95svh] sm:max-h-[90vh] overflow-y-auto sm:rounded-3xl rounded-t-3xl shadow-[0_40px_100px_rgba(44,30,26,0.3)]"
        style={{ animation: "modalSlide .35s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-cream/80 backdrop-blur-sm grid place-items-center text-brand-text-light hover:bg-rose/15 hover:text-rose transition-all"
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

        {/* ── STEP: DETAIL ── */}
        {step === "detail" && (
          <>
            {/* Hero image area */}
            <div className="relative w-full aspect-[16/8] bg-gradient-to-br from-gold-light via-blush to-rose/40 flex items-center justify-center overflow-hidden">
              {/* Soft glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-warm-white/30 to-transparent" />
              <span
                className="text-[6rem] relative z-10"
                style={{ filter: "drop-shadow(0 8px 20px rgba(74,48,40,0.2))" }}
              >
                {gift.emoji}
              </span>
              {isFull && (
                <div className="absolute inset-0 bg-brand-dark/40 flex items-center justify-center">
                  <span className="text-white font-cormorant italic text-2xl font-light border border-white/40 px-6 py-2 rounded-full backdrop-blur-sm">
                    Já foi escolhido ♡
                  </span>
                </div>
              )}
              {/* Cat tag */}
              <span className="absolute bottom-4 left-4 text-[0.68rem] font-light tracking-[0.16em] uppercase text-white/80 bg-brand-dark/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {gift.emoji} {gift.cat}
              </span>
            </div>

            <div className="p-7 pt-5">
              {/* Title & price row */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="font-cormorant text-[1.7rem] font-light text-brand-dark leading-tight flex-1">
                  {gift.name}
                </h2>
                <span className="font-cormorant text-[1.6rem] font-light text-terracotta shrink-0">
                  {gift.price}
                </span>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 mb-5">
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

              {/* Long description */}
              <div className="h-px bg-gradient-to-r from-transparent via-blush/50 to-transparent mb-5" />
              <p className="text-[0.88rem] font-light text-brand-text-light leading-relaxed mb-6">
                {gift.longDesc}
              </p>

              {/* Donors section */}
              {gift.donors.length > 0 && (
                <>
                  <div className="h-px bg-gradient-to-r from-transparent via-blush/50 to-transparent mb-5" />
                  <p className="text-[0.68rem] font-light tracking-[0.22em] uppercase text-gold mb-4 flex items-center gap-2">
                    <span className="block w-5 h-px bg-gold" />
                    Escolhido por
                  </p>
                  <div className="space-y-3 mb-6">
                    {gift.donors.map((d, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-start p-4 bg-cream rounded-2xl"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush to-rose flex items-center justify-center text-white text-[0.72rem] font-medium tracking-wide shrink-0">
                          {d.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-jost text-[0.82rem] font-medium text-brand-dark">
                              {d.name}
                            </span>
                            <span className="text-[0.68rem] font-light text-brand-text-light shrink-0">
                              {d.date}
                            </span>
                          </div>
                          {d.message && (
                            <p className="font-cormorant italic text-[0.95rem] text-brand-text-light leading-snug">
                              "{d.message}"
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* CTA */}
              {!isFull ? (
                <button
                  onClick={() => setStep("form")}
                  className="w-full group flex items-center justify-center gap-2.5 bg-terracotta text-white text-[0.82rem] font-medium tracking-[0.14em] uppercase py-4 rounded-full hover:bg-rose-deep transition-all hover:-translate-y-0.5 shadow-[0_8px_28px_rgba(139,74,53,0.3)] hover:shadow-[0_12px_36px_rgba(139,74,53,0.4)]"
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
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <div className="w-full text-center py-4 rounded-full bg-blush/30 text-brand-text-light text-[0.82rem] font-light tracking-wide">
                  Este presente já foi escolhido com amor ♡
                </div>
              )}
            </div>
          </>
        )}

        {/* ── STEP: FORM ── */}
        {step === "form" && (
          <div className="p-7 sm:p-9">
            {/* Back */}
            <button
              onClick={() => setStep("detail")}
              className="flex items-center gap-1.5 text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light hover:text-rose transition-colors mb-7 group"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>

            {/* Heading */}
            <div className="flex items-center gap-2 mb-1">
              <span className="block w-6 h-px bg-gold" />
              <span className="text-[0.68rem] font-light tracking-[0.25em] uppercase text-gold">
                Confirmação
              </span>
            </div>
            <h2 className="font-cormorant text-[2rem] font-light text-brand-dark leading-tight mb-1">
              Que presente <em className="italic text-rose">lindo!</em>
            </h2>
            <p className="text-[0.85rem] font-light text-brand-text-light mb-7 leading-relaxed">
              Deixe seu nome e, se quiser, uma mensagem carinhosa para o casal.
            </p>

            {/* Gift summary */}
            <div className="flex items-center gap-4 p-4 bg-cream rounded-2xl mb-7 border border-blush/30">
              <span className="text-3xl">{gift.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-cormorant text-[1.05rem] font-normal text-brand-dark leading-tight truncate">
                  {gift.name}
                </p>
                <p className="text-[0.78rem] font-light text-brand-text-light mt-0.5">
                  {gift.price} · {gift.cat}
                </p>
              </div>
            </div>

            {/* Form */}
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
                  <p className="text-[0.72rem] text-terracotta mt-1.5 flex items-center gap-1">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Por favor, informe seu nome.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                  Mensagem para o casal{" "}
                  <span className="text-brand-text-light/50">(opcional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Escreva uma mensagem carinhosa para Natália & Leonardo…"
                  className={inputCls}
                  maxLength={300}
                />
                <p className="text-right text-[0.68rem] text-brand-text-light/50 mt-1">
                  {message.length}/300
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setStep("detail")}
                className="text-[0.78rem] font-light tracking-[0.14em] uppercase px-5 py-3.5 rounded-full border border-blush text-brand-text-light hover:border-rose hover:text-rose transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 group flex items-center justify-center gap-2 bg-terracotta text-white text-[0.78rem] font-medium tracking-[0.14em] uppercase py-3.5 rounded-full hover:bg-rose-deep transition-all hover:-translate-y-0.5 shadow-[0_6px_22px_rgba(139,74,53,0.28)]"
              >
                Confirmar presente
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: SUCCESS ── */}
        {step === "success" && (
          <div className="p-10 text-center flex flex-col items-center">
            {/* Animated heart */}
            <div className="relative mb-7">
              <div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-blush to-rose grid place-items-center shadow-[0_12px_40px_rgba(201,134,109,0.4)]"
                style={{
                  animation: "heartPop .5s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
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
              {/* Sparkles */}
              {["-top-2 -right-2", "top-0 -left-3", "-bottom-1 right-0"].map(
                (pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} text-gold text-lg`}
                    style={{
                      animation: `sparkle .6s ${i * 0.15}s ease forwards`,
                    }}
                  >
                    ✦
                  </div>
                ),
              )}
            </div>

            <div className="flex items-center gap-2 justify-center mb-2">
              <span className="block w-5 h-px bg-gold" />
              <span className="text-[0.68rem] font-light tracking-[0.25em] uppercase text-gold">
                Obrigado!
              </span>
              <span className="block w-5 h-px bg-gold" />
            </div>

            <h2 className="font-cormorant text-[2.2rem] font-light text-brand-dark leading-tight mb-3">
              Presente <em className="italic text-rose">confirmado!</em>
            </h2>

            <p className="text-[0.88rem] font-light text-brand-text-light leading-relaxed mb-2 max-w-sm">
              <span className="font-medium text-brand-dark">{guestName}</span>,
              seu presente foi registrado com sucesso. Natália & Leonardo vão
              amar receber{" "}
              <span className="font-cormorant italic text-rose">
                "{gift.name}"
              </span>{" "}
              de você!
            </p>

            {message && (
              <div className="mt-4 mb-6 w-full max-w-sm bg-cream rounded-2xl p-5 border border-blush/30 text-left">
                <p className="text-[0.68rem] font-light tracking-[0.18em] uppercase text-gold mb-2">
                  Sua mensagem
                </p>
                <p className="font-cormorant italic text-[1.05rem] text-brand-text-light leading-snug">
                  "{message}"
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 w-full max-w-xs">
              <button
                onClick={onClose}
                className="w-full group flex items-center justify-center gap-2 bg-terracotta text-white text-[0.78rem] font-medium tracking-[0.14em] uppercase py-3.5 rounded-full hover:bg-rose-deep transition-all hover:-translate-y-0.5 shadow-[0_6px_22px_rgba(139,74,53,0.28)]"
              >
                Ver outros presentes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
