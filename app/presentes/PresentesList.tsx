"use client";

import { useState, useCallback, useEffect } from "react";
import type { Gift } from "@/app/types";
import { CAT_FILTERS, STATUS_FILTERS, getStatus } from "./gifts.public";
import PublicGiftCard from "./PublicGiftCard";
import GiftModal from "./GiftModal";
import DonorsWall from "./DonorsWall";

interface PresentesListProps {
  initialGifts: Gift[];
}

export default function PresentesList({ initialGifts }: PresentesListProps) {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);

  useEffect(() => {
    setGifts(initialGifts);
  }, [initialGifts]);

  const [catFilter, setCatFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Gift | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = gifts.filter((g) => {
    const s = getStatus(g);
    const matchCat =
      catFilter === "todos" || g.cat.toLowerCase() === catFilter.toLowerCase();
    const matchStatus =
      statusFilter === "todos" ||
      (statusFilter === "disponivel" && s !== "doado") ||
      (statusFilter === "doado" && s === "doado");
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      g.name.toLowerCase().includes(q) ||
      g.desc.toLowerCase().includes(q);
    return matchCat && matchStatus && matchQ;
  });

  const available = gifts.filter((g) => getStatus(g) !== "doado").length;
  const chosen = gifts.filter((g) => getStatus(g) === "doado").length;

  // Chamado pelo GiftModal após pagamento aprovado.
  // giftId agora é string (ID do Firestore).
  // Atualiza o estado local otimisticamente — o Firebase já foi gravado pelo webhook.
  // const handleChoose = useCallback(
  //   (giftId: string, name: string, message: string) => {
  //     setGifts((prev) =>
  //       prev.map((g) => {
  //         if (g.id !== giftId) return g;
  //         return {
  //           ...g,
  //           taken: g.taken + 1,
  //           contributions: [
  //             ...g.contributions,
  //             {
  //               name,
  //               email: "",
  //               message: message || undefined,
  //               paymentId: "pending", // será substituído pelo webhook
  //               createdAt: new Date().toISOString(),
  //             },
  //           ],
  //         };
  //       }),
  //     );

  //     const giftName = gifts.find((g) => g.id === giftId)?.name ?? "";
  //     setToast(`${name} escolheu "${giftName}" ♡`);
  //     setTimeout(() => setToast(null), 4000);
  //   },
  //   [gifts],
  // );
  const handleChoose = useCallback(
    (giftId: string, name: string, message: string) => {
      // Apenas mostra o toast — o Firebase listener atualizará o estado
      const giftName = gifts.find((g) => g.id === giftId)?.name ?? "";
      setToast(`${name} escolheu "${giftName}" ♡`);
      setTimeout(() => setToast(null), 4000);
    },
    [gifts],
  );

  return (
    <>
      {/* ── FILTERS BAR ── */}
      <div className="sticky top-[72px] z-30 bg-cream/90 backdrop-blur-md py-4 mb-8 border-b border-blush/20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Search */}
          <div className="relative mb-3">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-light/50 pointer-events-none">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar presente…"
              className="w-full bg-warm-white border border-blush/50 rounded-full pl-10 pr-4 py-2.5 text-[0.85rem] font-light text-brand-dark placeholder:text-brand-text-light/40 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/10 transition-all"
            />
          </div>

          {/* Filter pills row */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Status filters */}
            <div className="flex gap-1.5 p-1 bg-warm-white rounded-full border border-blush/40">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`text-[0.7rem] font-light tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-full transition-all ${
                    statusFilter === f.value
                      ? "bg-terracotta text-white shadow-sm"
                      : "text-brand-text-light hover:text-rose"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <span className="w-px h-5 bg-blush/50" />

            {/* Category filters */}
            <div className="flex gap-1.5 flex-wrap">
              {CAT_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setCatFilter(f.value)}
                  className={`text-[0.7rem] font-light tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                    catFilter === f.value
                      ? "border-rose text-rose bg-rose/6"
                      : "border-blush/40 text-brand-text-light bg-warm-white hover:border-rose/40 hover:text-rose"
                  }`}
                >
                  {f.value !== "todos" ? `${f.emoji} ` : ""}
                  {f.label}
                </button>
              ))}
            </div>

            {/* Counter */}
            <span className="ml-auto text-[0.72rem] font-light text-brand-text-light shrink-0">
              <span className="text-brand-dark font-normal">{available}</span>{" "}
              disponíve{available !== 1 ? "is" : "l"} ·{" "}
              <span className="text-rose">{chosen}</span> escolhido
              {chosen !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4 opacity-40">🎁</p>
            <h3 className="font-cormorant text-[1.8rem] font-light text-brand-dark mb-2">
              Nenhum presente encontrado
            </h3>
            <p className="text-[0.88rem] font-light text-brand-text-light">
              Tente outro filtro ou limpe a busca.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((g) => (
              <PublicGiftCard
                key={g.id}
                gift={g}
                onClick={() => setSelected(g)}
              />
            ))}
          </div>
        )}

        {/* Donors wall */}
        <DonorsWall gifts={gifts} />

        {/* Bottom note */}
        <p className="text-center text-[0.72rem] font-light text-brand-text-light/50 mt-12 tracking-wide pb-8">
          Chá de Casa Nova · Natália &amp; Leonardo
        </p>
      </div>

      {/* Modal */}
      {selected && (
        <GiftModal
          gift={gifts.find((g) => g.id === selected.id) ?? selected}
          onClose={() => setSelected(null)}
          onChoose={handleChoose}
        />
      )}

      {/* Toast */}
      {/* {toast && (
        <div
          className="!text-rose backdrop-blur-[4px] font-semibold fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 bg-brand-dark text-white/90 text-[0.82rem] px-6 py-3.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          style={{ animation: "toastIn .35s ease" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#7fc47f] shrink-0" />
          {toast}
        </div>
      )} */}
    </>
  );
}
