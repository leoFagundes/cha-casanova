import type { Gift } from "@/app/types";
import { getStatus, makeAvatar } from "./gifts.public";

interface PublicGiftCardProps {
  gift: Gift;
  onClick: () => void;
}

export default function PublicGiftCard({ gift, onClick }: PublicGiftCardProps) {
  const status = getStatus(gift);
  const isFull = status === "doado";
  const remaining = gift.qty - gift.taken;
  const pct = gift.qty > 0 ? (gift.taken / gift.qty) * 100 : 0;

  // contributions são os doadores reais do Firebase
  const contributors = gift.contributions ?? [];

  return (
    <button
      onClick={onClick}
      className={`flex flex-col group relative w-full text-left bg-warm-white rounded-[22px] border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(74,48,40,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/50 ${
        isFull
          ? "border-blush/20 opacity-70"
          : "border-blush/30 hover:border-rose/25"
      }`}
    >
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-blush via-rose to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image area — imagem real se existir, senão emoji */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {gift.imageUrl ? (
          <img
            src={gift.imageUrl}
            alt={gift.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold-light via-blush to-rose/35 flex items-center justify-center">
            <span
              className="text-[4.5rem] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
              style={{ filter: "drop-shadow(0 6px 14px rgba(74,48,40,0.18))" }}
            >
              {gift.emoji}
            </span>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[0.65rem] font-light tracking-[0.14em] uppercase text-white/85 bg-brand-dark/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {gift.cat}
        </span>

        {/* Taken overlay — mantém suas classes: backdrop-blur-[4px] + bg-terracotta/30 */}
        {isFull && (
          <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-[4px] flex items-center justify-center">
            <span className="font-cormorant italic text-white text-xl font-light border border-white/40 px-5 py-1.5 rounded-full backdrop-blur-sm bg-terracotta/30">
              Escolhido ♡
            </span>
          </div>
        )}

        {/* Contributor avatars — gerados a partir do nome real */}
        {contributors.length > 0 && !isFull && (
          <div className="absolute bottom-3 right-3 flex -space-x-1.5">
            {contributors.slice(0, 3).map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-rose to-terracotta border-2 border-warm-white flex items-center justify-center text-white text-[0.6rem] font-medium shadow-sm"
              >
                {makeAvatar(c.name)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 pb-5">
        <h3 className="font-cormorant text-[1.15rem] font-normal text-brand-dark leading-snug mb-1.5 group-hover:text-terracotta transition-colors duration-300">
          {gift.name}
        </h3>
        <p className="text-[0.78rem] font-light text-brand-text-light leading-relaxed line-clamp-2 mb-3">
          {gift.desc}
        </p>

        {/* Footer row */}
        <div className="flex items-end justify-between gap-2">
          <span className="font-cormorant text-[1.3rem] font-light text-brand-dark">
            {gift.price}
          </span>
          <div className="text-right">
            {isFull ? (
              <span className="text-[0.68rem] font-light text-brand-text-light">
                Já escolhido
              </span>
            ) : (
              <span
                className={`text-[0.68rem] font-light ${remaining <= 1 ? "text-terracotta" : "text-sage"}`}
              >
                {remaining} disponíve{remaining > 1 ? "is" : "l"}
              </span>
            )}
          </div>
        </div>

        {/* Progress */}
        {gift.qty > 1 && (
          <div className="mt-2.5">
            <div className="h-[3px] bg-blush/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blush to-rose rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* Choose button hint */}
        {!isFull && (
          <div className="mt-3 flex items-center gap-1.5 text-[0.7rem] font-light tracking-[0.1em] uppercase text-rose opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Escolher este presente
          </div>
        )}
      </div>
    </button>
  );
}
