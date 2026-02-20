"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES } from "./gifts.data";
import StatsRow from "./StatsRow";
import GiftCard from "./GiftCard";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import Toast, { type ToastData } from "./Toast";
import GiftRepository from "@/services/repositories/GiftRepository";
import { Gift } from "@/app/types";

type ViewMode = "grid" | "list";

let toastIdCounter = 0;

export default function GiftsList() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [view, setView] = useState<ViewMode>("grid");
  const [editGift, setEditGift] = useState<Gift | null>(null);
  const [deleteGift, setDeleteGift] = useState<Gift | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const giftsData = await GiftRepository.getAll();

        const normalized: Gift[] = giftsData.map((gift) => ({
          ...gift,

          // garante que contributions sempre existe
          contributions: gift.contributions ?? [],

          // taken vem do próprio gift, ou recalcula por segurança
          taken: gift.contributions?.length ?? gift.taken ?? 0,
        }));

        setGifts(normalized);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const addToast = (message: string, type: "success" | "error" = "success") => {
    const id = ++toastIdCounter;
    setToasts((t) => [...t, { id, message, type }]);
  };

  const removeToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const visibleCats = ["todos", ...new Set(gifts.map((g) => g.cat))];

  const filtered = gifts.filter((g) => {
    const matchCat = filter === "todos" || g.cat === filter;
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      g.name.toLowerCase().includes(q) ||
      g.desc.toLowerCase().includes(q) ||
      g.cat.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const handleSaveEdit = async (updated: Gift) => {
    await GiftRepository.update(updated.id, updated);

    setGifts((gs) => gs.map((g) => (g.id === updated.id ? updated : g)));

    setEditGift(null);

    addToast("Presente atualizado com sucesso!");
  };

  const handleConfirmDelete = async () => {
    if (!deleteGift) return;

    await GiftRepository.delete(deleteGift.id);

    setGifts((gs) => gs.filter((g) => g.id !== deleteGift.id));

    setDeleteGift(null);

    addToast("Presente removido da lista.", "error");
  };

  const catEmoji: Record<string, string> = Object.fromEntries(
    CATEGORIES.map((c) => [c.value, c.emoji]),
  );

  return (
    <>
      {/* Page heading */}
      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
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
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-7 h-px bg-gold" />
            <span className="text-[0.68rem] font-light tracking-[0.3em] uppercase text-gold">
              Painel Admin
            </span>
          </div>
          <h1
            className="font-cormorant font-light text-brand-dark leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            Lista de
            <br />
            <em className="italic text-rose">presentes</em>
          </h1>
        </div>

        <div className="flex gap-3 items-center flex-shrink-0 flex-wrap">
          <Link
            href="/admin/cadastrar-presente"
            className="group inline-flex items-center gap-2 bg-terracotta text-white text-[0.78rem] font-medium tracking-[0.14em] uppercase px-6 py-3.5 rounded-full hover:bg-deep-rose transition-all hover:-translate-y-0.5 shadow-[0_6px_20px_rgba(139,74,53,0.28)]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo presente
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <StatsRow gifts={gifts} />

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-text-light/50 pointer-events-none">
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
            className="w-full bg-warm-white border border-blush/60 rounded-full px-4 py-2.5 pl-10 text-[0.85rem] font-light text-brand-dark placeholder:text-brand-text-light/40 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/10 transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap">
          {visibleCats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-[0.7rem] font-light tracking-[0.1em] uppercase px-4 py-2 rounded-full border transition-all ${
                filter === c
                  ? "border-rose text-rose bg-rose/6"
                  : "border-blush/50 text-brand-text-light bg-warm-white hover:border-rose/40 hover:text-rose"
              }`}
            >
              {c === "todos" ? "Todos" : `${catEmoji[c] ?? ""} ${c}`}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex bg-warm-white border border-blush/50 rounded-full overflow-hidden shrink-0">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-2.5 transition-all ${view === "grid" ? "bg-terracotta text-white" : "text-brand-text-light hover:text-rose"}`}
            title="Grade"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-2.5 transition-all ${view === "list" ? "bg-terracotta text-white" : "text-brand-text-light hover:text-rose"}`}
            title="Lista"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <circle cx="3" cy="6" r="1.5" fill="currentColor" stroke="none" />
              <circle
                cx="3"
                cy="12"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="3"
                cy="18"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl opacity-40 mb-4">🎁</div>
          <h3 className="font-cormorant text-[1.8rem] font-light text-brand-dark mb-2">
            Nenhum presente encontrado
          </h3>
          <p className="text-[0.88rem] font-light text-brand-text-light">
            Tente outro filtro ou adicione um novo presente.
          </p>
        </div>
      ) : (
        <div
          className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {filtered.map((g) => (
            <GiftCard
              key={g.id}
              gift={g}
              viewMode={view}
              onEdit={setEditGift}
              onDelete={setDeleteGift}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {editGift && (
        <EditModal
          gift={editGift}
          onClose={() => setEditGift(null)}
          onSave={handleSaveEdit}
        />
      )}
      {deleteGift && (
        <DeleteModal
          gift={deleteGift}
          onClose={() => setDeleteGift(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
    </>
  );
}
