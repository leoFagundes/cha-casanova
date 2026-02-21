"use client";

import Link from "next/link";
import PresentesList from "./PresentesList";
import GiftRepository from "@/services/repositories/GiftRepository";
import { useEffect, useState } from "react";
import { Gift } from "../types";

export default function PresentesPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    async function loadInitial() {
      const initial = await GiftRepository.getAll();
      setGifts(initial);
      setLoading(false);

      unsubscribe = GiftRepository.subscribe((updatedGifts) => {
        setGifts(updatedGifts);
      });
    }

    loadInitial();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">
      {loading && (
        <div className="fixed w-screen h-screen top-0 left-0 flex flex-col gap-4 items-center justify-center z-[90] bg-cream">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" relative z-10 sm:scale-50"
            style={{
              filter: "drop-shadow(0 8px 20px rgba(139,74,53,0.25))",
            }}
          >
            {/* Shadow */}
            <ellipse
              className="pot-shadow-el"
              cx="100"
              cy="147"
              rx="48"
              ry="8"
              fill="rgba(139,74,53,0.18)"
            />

            {/* ── Pot body ── */}
            <g className="pot-body-group">
              <rect
                x="55"
                y="90"
                width="90"
                height="44"
                rx="8"
                fill="#c9866d"
              />
              {/* Handles */}
              <rect
                x="43"
                y="88"
                width="22"
                height="9"
                rx="4.5"
                fill="#8b4a35"
              />
              <rect
                x="135"
                y="88"
                width="22"
                height="9"
                rx="4.5"
                fill="#8b4a35"
              />
              {/* Handle highlights */}
              <rect
                x="46"
                y="89.5"
                width="8"
                height="2.5"
                rx="1.25"
                fill="rgba(255,255,255,0.2)"
              />
              <rect
                x="138"
                y="89.5"
                width="8"
                height="2.5"
                rx="1.25"
                fill="rgba(255,255,255,0.2)"
              />
              {/* Body shine */}
              <rect
                x="62"
                y="94"
                width="30"
                height="4"
                rx="2"
                fill="rgba(255,255,255,0.18)"
              />
              {/* Bottom */}
              <ellipse cx="100" cy="134" rx="45" ry="8" fill="#a05c47" />
            </g>

            {/* ── Lid (wobbles independently) ── */}
            <g className="pot-lid-group">
              <ellipse cx="100" cy="90" rx="46" ry="13" fill="#e8c4b0" />
              <ellipse
                cx="100"
                cy="89"
                rx="46"
                ry="13"
                fill="none"
                stroke="#c9a96e"
                strokeWidth="1"
                opacity="0.4"
              />
              {/* Lid highlight */}
              <ellipse
                cx="88"
                cy="86"
                rx="16"
                ry="4"
                fill="rgba(255,255,255,0.25)"
              />
              {/* Knob base */}
              <ellipse cx="100" cy="80" rx="7" ry="3" fill="#c9866d" />
              {/* Knob bob */}
              <g className="pot-knob">
                <ellipse cx="100" cy="77" rx="5" ry="5" fill="#a05c47" />
                <ellipse
                  cx="98"
                  cy="75.5"
                  rx="2"
                  ry="1.5"
                  fill="rgba(255,255,255,0.3)"
                />
              </g>
            </g>

            {/* ── Steam ── */}
            <path
              className="pot-steam-1"
              d="M85 72 Q83 56 85 42 Q87 28 85 14"
              stroke="#c9a96e"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="pot-steam-2"
              d="M100 75 Q97 57 100 42 Q103 27 100 12"
              stroke="#c9a96e"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              className="pot-steam-3"
              d="M115 72 Q113 56 115 42 Q117 28 115 14"
              stroke="#c9a96e"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* ── Hearts ── */}
            <g className="pot-heart-r">
              <path
                d="M165 50 C165 47 162 44 159 47 C156 44 153 47 153 50 C153 55 159 60 159 60 C159 60 165 55 165 50Z"
                fill="#c9866d"
              />
            </g>
            <g className="pot-heart-l">
              <path
                d="M49 59 C49 56.5 46.5 54 44 56.5 C41.5 54 39 56.5 39 59 C39 63 44 67 44 67 C44 67 49 63 49 59Z"
                fill="#8a9e89"
              />
            </g>

            {/* ── Sparkles ── */}
            <g className="pot-sparkle-1">
              <path
                d="M170 80 L171.5 76 L173 80 L177 81.5 L173 83 L171.5 87 L170 83 L166 81.5Z"
                fill="#c9a96e"
                opacity="0.7"
              />
            </g>
            <g className="pot-sparkle-2">
              <path
                d="M30 75 L31 72 L32 75 L35 76 L32 77 L31 80 L30 77 L27 76Z"
                fill="#c9a96e"
                opacity="0.6"
              />
            </g>
            <g className="pot-sparkle-3">
              <path
                d="M155 35 L156 32.5 L157 35 L159.5 36 L157 37 L156 39.5 L155 37 L152.5 36Z"
                fill="#e8c4b0"
                opacity="0.8"
              />
            </g>
          </svg>
          <span className="absolute text-rose font-semibold italic text-xl translate-y-[160px]">
            Carregando...
          </span>
        </div>
      )}
      {/* Background blobs */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[600px] h-[600px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(232,196,176,0.55) 0%, transparent 70%)",
          transform: "translate(200px,-200px)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 w-[450px] h-[450px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(138,158,137,0.4) 0%, transparent 70%)",
          transform: "translate(-150px,100px)",
        }}
      />

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-[101] flex items-center justify-between px-5 md:px-12 py-5 bg-cream/88 backdrop-blur-md shadow-[0_1px_0_rgba(201,134,109,0.12)] transition-all">
        <Link
          href="/"
          className="font-cormorant text-[1.3rem] font-light tracking-widest text-terracotta hover:opacity-80 transition-opacity"
        >
          N <em className="italic">&amp;</em> L
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#sobre"
            className="text-[0.75rem] font-light tracking-[0.14em] uppercase text-brand-text-light hover:text-rose transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="/#evento"
            className="text-[0.75rem] font-light tracking-[0.14em] uppercase text-brand-text-light hover:text-rose transition-colors"
          >
            O Evento
          </Link>
          <span className="text-[0.75rem] font-light tracking-[0.14em] uppercase text-rose border-b border-rose pb-0.5">
            Presentes
          </span>
        </nav>

        {/* Mobile back */}
        <Link
          href="/"
          className="md:hidden flex items-center gap-1.5 text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light hover:text-rose transition-colors"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Início
        </Link>
      </header>

      {/* ── HERO ── */}
      <div className="relative pt-32 pb-10 px-4 text-center overflow-hidden">
        {/* Botanical decorations */}
        <svg
          className="absolute top-16 left-2 w-36 opacity-[0.10] -rotate-12 pointer-events-none "
          viewBox="0 0 200 300"
          fill="none"
        >
          <path
            d="M100 280 C80 220 20 180 10 100 C5 60 30 20 60 30 C90 40 100 80 100 120 C100 80 110 40 140 30 C170 20 195 60 190 100 C180 180 120 220 100 280Z"
            fill="#c9866d"
          />
          <line
            x1="100"
            y1="280"
            x2="100"
            y2="50"
            stroke="#a05c47"
            strokeWidth="1.5"
          />
          <path
            d="M100 160 C70 140 40 150 20 140"
            stroke="#a05c47"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M100 200 C130 180 160 190 180 175"
            stroke="#a05c47"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <svg
          className="absolute top-16 right-2 w-32 opacity-[0.09] rotate-[165deg] pointer-events-none"
          viewBox="0 0 200 300"
          fill="none"
        >
          <path
            d="M100 280 C80 220 20 180 10 100 C5 60 30 20 60 30 C90 40 100 80 100 120 C100 80 110 40 140 30 C170 20 195 60 190 100 C180 180 120 220 100 280Z"
            fill="#8a9e89"
          />
          <line
            x1="100"
            y1="280"
            x2="100"
            y2="50"
            stroke="#6b7f6a"
            strokeWidth="1.5"
          />
          <path
            d="M100 160 C70 140 40 150 20 140"
            stroke="#6b7f6a"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M100 200 C130 180 160 190 180 175"
            stroke="#6b7f6a"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[0.68rem] font-light tracking-[0.28em] uppercase text-gold border border-gold/30 rounded-full px-5 py-1.5 mb-5">
            ✦ Lista de Presentes ✦
          </div>

          {/* Title */}
          <h1
            className="font-cormorant font-light text-brand-dark leading-tight mb-4"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
          >
            Escolha um presente
            <br />
            <em className="italic text-rose">com carinho</em>
          </h1>

          <p className="text-[0.92rem] font-light text-brand-text-light leading-relaxed max-w-lg mx-auto">
            Cada item desta lista foi escolhido com muito cuidado. Clique em um
            presente para ver os detalhes e deixar uma mensagem especial para o
            casal.
          </p>

          {/* Couple names decoration */}
          <div className="flex items-center justify-center gap-4 mt-6 mb-2">
            <span className="block h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-blush" />
            <span className="font-cormorant text-[1.1rem] font-light italic text-brand-text-light tracking-wide">
              Natália &amp; Leonardo
            </span>
            <span className="block h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-blush" />
          </div>
        </div>
      </div>

      {/* Divider wave */}
      <div className="w-full overflow-hidden leading-none mb-0">
        <div className="h-px bg-gradient-to-r from-transparent via-blush/40 to-transparent" />
      </div>

      {/* Passa os dados reais do Firebase via prop */}
      <PresentesList initialGifts={gifts} />

      {/* Keyframes */}
      <style>{`
        @keyframes backdropIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalSlide { from { opacity: 0; transform: translateY(30px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes heartPop { 0% { transform: scale(0) } 60% { transform: scale(1.2) } 100% { transform: scale(1) } }
        @keyframes sparkle { 0% { opacity: 0; transform: scale(0) rotate(0deg) } 50% { opacity: 1; transform: scale(1.3) rotate(20deg) } 100% { opacity: 0; transform: scale(0.5) rotate(40deg) } }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px) } to { opacity: 1; transform: translateX(-50%) translateY(0) } }
      `}</style>

      {/* Botão scroll to top*/}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-6 z-[100] w-11 h-11 rounded-full bg-warm-white border border-blush/40 shadow-[0_8px_28px_rgba(74,48,40,0.14)] flex items-center justify-center text-terracotta hover:bg-terracotta hover:text-white hover:border-terracotta hover:shadow-[0_8px_28px_rgba(139,74,53,0.3)] transition-all duration-300 hover:-translate-y-1 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 13V3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M3.5 7L8 2.5L12.5 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
