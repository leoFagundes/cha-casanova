import type { Metadata } from "next";
import Link from "next/link";
import PresentesList from "./PresentesList";

export const metadata: Metadata = {
  title: "Lista de Presentes — Natália & Leonardo",
  description:
    "Escolha um presente especial para o novo lar de Natália e Leonardo.",
};

export default function PresentesPage() {
  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">
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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-5 bg-cream/88 backdrop-blur-md shadow-[0_1px_0_rgba(201,134,109,0.12)] transition-all">
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
          className="absolute top-16 left-2 w-36 opacity-[0.10] -rotate-12 pointer-events-none"
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

      {/* ── LIST (client component with all interactive logic) ── */}
      <PresentesList />

      {/* Keyframes */}
      <style>{`
        @keyframes backdropIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalSlide { from { opacity: 0; transform: translateY(30px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes heartPop { 0% { transform: scale(0) } 60% { transform: scale(1.2) } 100% { transform: scale(1) } }
        @keyframes sparkle { 0% { opacity: 0; transform: scale(0) rotate(0deg) } 50% { opacity: 1; transform: scale(1.3) rotate(20deg) } 100% { opacity: 0; transform: scale(0.5) rotate(40deg) } }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px) } to { opacity: 1; transform: translateX(-50%) translateY(0) } }
      `}</style>
    </div>
  );
}
