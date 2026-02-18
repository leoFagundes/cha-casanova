import type { Metadata } from "next";
import Link from "next/link";
import GiftsList from "./GiftsList";

export const metadata: Metadata = {
  title: "Gerenciar Presentes — Admin | Chá de Panela Ana & Lucas",
};

export default function PresentesPage() {
  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">
      {/* Background blobs */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(232,196,176,0.5) 0%, transparent 70%)",
          transform: "translate(150px, -150px)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(138,158,137,0.35) 0%, transparent 70%)",
          transform: "translate(-120px, 100px)",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-warm-white/92 backdrop-blur-md shadow-[0_1px_0_rgba(201,134,109,0.15)]">
        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="group flex items-center gap-2 text-[0.72rem] font-light tracking-[0.18em] uppercase text-brand-text-light hover:text-terracotta transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Voltar ao site
          </Link>
          <span className="w-px h-4 bg-blush/60" />
          <span className="font-cormorant text-[1.2rem] font-light tracking-widest text-terracotta">
            N <em className="italic">&amp;</em> L
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[0.68rem] font-light tracking-[0.22em] uppercase text-gold border border-gold/30 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
          Painel Admin
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-28 pb-20">
        <GiftsList />
        <p className="text-center text-[0.72rem] font-light text-brand-text-light/50 mt-10 tracking-wide">
          Chá de Panela · Natália &amp; Leonardo · Junho 2026
        </p>
      </main>

      {/* Keyframes for modals/toasts */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes toastIn { from { opacity: 0; transform: translateY(10px) scale(.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}
