import { Gift } from "@/app/types";
import { prioClass, prioLabel } from "./gifts.data";

interface GiftCardProps {
  gift: Gift;
  viewMode: "grid" | "list";
  onEdit: (g: Gift) => void;
  onDelete: (g: Gift) => void;
}

export default function GiftCard({
  gift: g,
  viewMode,
  onEdit,
  onDelete,
}: GiftCardProps) {
  const isTaken = g.taken >= g.qty;
  const pct = g.qty > 0 ? Math.round((g.taken / g.qty) * 100) : 0;

  const ImageBlock = (
    <div
      className={`relative bg-gradient-to-br from-gold-light via-blush to-rose/40 overflow-hidden ${
        viewMode === "list"
          ? "w-[110px] shrink-0 self-stretch"
          : "aspect-[16/9] w-full"
      }`}
    >
      {g.imageUrl ? (
        <img
          src={g.imageUrl}
          alt={g.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-4xl">
          {g.emoji}
        </div>
      )}

      {isTaken && (
        <div className="absolute inset-0 bg-brand-dark/45 flex items-center justify-center">
          <span className="text-white text-[0.68rem] font-medium tracking-[0.18em] uppercase border border-white/50 rounded-full px-3.5 py-1 backdrop-blur-sm">
            Escolhido ♡
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`group relative bg-warm-white rounded-[20px] border border-blush/25 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(74,48,40,0.1)] hover:border-rose/20 ${
        isTaken ? "opacity-65" : ""
      } ${viewMode === "list" ? "flex items-stretch" : ""}`}
    >
      {/* Accent bar */}
      {viewMode === "list" ? (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blush via-rose to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      ) : (
        <div className="h-[3px] bg-gradient-to-r from-blush via-rose to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {ImageBlock}

      {/* Body */}
      <div
        className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}
      >
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3
            className={`font-cormorant font-normal text-brand-dark leading-tight ${
              viewMode === "list" ? "text-[1.05rem]" : "text-[1.15rem]"
            }`}
          >
            {g.name}
          </h3>
          <span
            className={`shrink-0 text-[0.62rem] font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${prioClass(
              g.prioridade,
            )}`}
          >
            {prioLabel(g.prioridade)}
          </span>
        </div>

        <p className="text-[0.78rem] font-light text-brand-text-light leading-relaxed mb-3 line-clamp-2">
          {g.desc}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span className="font-cormorant text-[1.3rem] font-light text-brand-dark">
            {g.price}
          </span>
          <span className="text-[0.68rem] font-light tracking-[0.08em] uppercase text-brand-text-light">
            {g.emoji} {g.cat}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-2.5">
          <p className="text-[0.7rem] font-light text-brand-text-light mb-1">
            {g.taken} de {g.qty} escolhido{g.qty > 1 ? "s" : ""}
          </p>
          <div className="h-[3px] bg-blush/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blush to-rose rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className={`flex gap-2 ${
          viewMode === "list"
            ? "flex-col justify-center items-end pr-4 shrink-0"
            : "px-4 pb-4 justify-end"
        }`}
      >
        <button
          onClick={() => onEdit(g)}
          className="inline-flex items-center gap-1.5 text-[0.7rem] font-normal tracking-[0.08em] uppercase px-3.5 py-2 rounded-full bg-rose/10 text-rose hover:bg-rose/20 transition-colors"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Editar
        </button>
        <button
          onClick={() => onDelete(g)}
          className="inline-flex items-center gap-1.5 text-[0.7rem] font-normal tracking-[0.08em] uppercase px-3.5 py-2 rounded-full bg-terracotta/8 text-terracotta hover:bg-terracotta/18 transition-colors"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          </svg>
          Excluir
        </button>
      </div>
    </div>
  );
}
