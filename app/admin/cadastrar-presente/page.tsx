import type { Metadata } from "next";
import AdminHeader from "./AdminHeader";
import GiftForm from "./GiftForm";

export const metadata: Metadata = {
  title: "Cadastrar Presente — Admin | Chá de Panela Ana & Lucas",
};

export default function CadastrarPresentePage() {
  return (
    <div className="min-h-screen bg-cream relative overflow-x-hidden">
      {/* Decorative background blobs */}
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

      <AdminHeader />

      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-32 pb-24">
        {/* Page heading */}
        <div className="mb-12">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-gold" />
            <span className="text-[0.68rem] font-light tracking-[0.3em] uppercase text-gold">
              Painel Admin
            </span>
          </div>

          <h1
            className="font-cormorant font-light text-brand-dark leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)" }}
          >
            Cadastrar
            <br />
            <em className="italic text-rose">novo presente</em>
          </h1>

          <p className="mt-4 text-[0.9rem] font-light text-brand-text-light leading-relaxed max-w-md">
            Preencha as informações do presente para adicioná-lo à lista dos
            convidados. Os campos marcados com{" "}
            <span className="text-rose">*</span> são obrigatórios.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blush to-transparent mb-12" />

        {/* Form card */}
        <div className="bg-warm-white/80 backdrop-blur-sm rounded-3xl border border-blush/30 shadow-[0_4px_40px_rgba(74,48,40,0.07)] p-6 md:p-10 space-y-10">
          <GiftForm />
        </div>

        {/* Footer note */}
        <p className="text-center text-[0.72rem] font-light text-brand-text-light/60 mt-8 tracking-wide">
          Chá de Panela · Natália &amp; Leonardo · Junho 2026
        </p>
      </main>
    </div>
  );
}
