"use client";

import type { Gift } from "@/app/types";
import { makeAvatar, formatDate } from "./gifts.public";

export default function DonorsWall({
  gifts,
  onClick,
}: {
  gifts: Gift[];
  onClick: (name: string) => void;
}) {
  // Achata contributions de todos os presentes em uma lista única
  const allDonors = gifts.flatMap((g) =>
    (g.contributions ?? []).map((c) => ({
      ...c,
      giftName: g.name,
      giftEmoji: g.emoji,
    })),
  );

  if (allDonors.length === 0) return null;

  return (
    <section className="mt-20 mb-4">
      {/* Section header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="block w-8 h-px bg-gold/60" />
          <span className="text-[0.68rem] font-light tracking-[0.28em] uppercase text-gold">
            Com muito amor
          </span>
          <span className="block w-8 h-px bg-gold/60" />
        </div>
        <h2 className="font-cormorant text-[2rem] font-light text-brand-dark leading-tight">
          Quem já <em className="italic text-rose">presenteou</em>
        </h2>
        <p className="text-[0.85rem] font-light text-brand-text-light mt-2">
          Pessoas incríveis que já escolheram um presente especial ♡
        </p>
      </div>

      {/* Donors grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allDonors.map((d, i) => (
          <div
            onClick={() => onClick(d.giftName)}
            key={i}
            className={`cursor-pointer relative bg-warm-white rounded-2xl p-5 ${d.paymentId === "in_person" && "pb-10"}  border border-blush/25 hover:border-rose/20 transition-all hover:shadow-[0_8px_30px_rgba(74,48,40,0.07)]`}
          >
            {d.paymentId === "in_person" && (
              <div className="absolute bottom-2 right-3 text-xs italic p-1 border rounded-md bg-cream font-semibold text-rose">
                <span>🤝 Entregar em mãos</span>
              </div>
            )}
            <div className="flex items-start gap-3">
              {/* Avatar com iniciais geradas dinamicamente */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blush to-rose flex items-center justify-center text-white text-[0.75rem] font-medium shrink-0 shadow-[0_4px_12px_rgba(201,134,109,0.3)]">
                {makeAvatar(d.name)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[0.85rem] font-medium text-brand-dark leading-tight">
                    {d.name}
                  </p>
                  {d.createdAt && (
                    <span className="text-[0.65rem] font-light text-brand-text-light/60 shrink-0">
                      {formatDate(d.createdAt.toString())}
                    </span>
                  )}
                </div>

                {/* Gift chip */}
                <div className="flex items-center gap-1.5 mt-1.5 mb-2">
                  <span className="text-sm">{d.giftEmoji}</span>
                  <span className="text-[0.7rem] font-light text-brand-text-light truncate">
                    {d.giftName}
                  </span>
                </div>

                {/* Message */}
                {d.message && (
                  <p className="font-cormorant italic text-[0.95rem] text-brand-text-light leading-snug">
                    "{d.message}"
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
