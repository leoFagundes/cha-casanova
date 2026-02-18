"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { MOCK_GIFTS, CATEGORIES, type Gift } from "./gifts.data";
import StatsRow from "./StatsRow";
import GiftCard from "./GiftCard";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import Toast, { type ToastData } from "./Toast";

type ViewMode = "grid" | "list";

let toastIdCounter = 0;

export default function GiftsList() {
  const [gifts, setGifts] = useState<Gift[]>(MOCK_GIFTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [view, setView] = useState<ViewMode>("grid");
  const [editGift, setEditGift] = useState<Gift | null>(null);
  const [deleteGift, setDeleteGift] = useState<Gift | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);

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
    const matchQ = !q || g.name.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q) || g.cat.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const handleSaveEdit = (updated: Gift) => {
    setGifts((gs) => gs.map((g) => (g.id === updated.id ? updated : g)));
    setEditGift(null);
    addToast("Presente atualizado com sucesso!");
  };

  const handleConfirmDelete = () => {
    if (!deleteGift) return;
    setGifts((gs) => gs.filter((g) => g.id !== deleteGift.id));
    setDeleteGift(null);
    addToast("Presente removido da lista.", "error");
  };

  const catEmoji: Record<string, string> = Object.fromEntries(CATEGORIES.map((c) => [c.value, c.emoji]));

  return (
    <>
      {/* Page heading */}
      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-7 h-px bg-gold" />
            <span className="text-[0.68rem] font-light tracking-[0.3em] uppercase text-gold">Painel Admin</span>
          </div>
          <h1 className="font-cormorant font-light text-brand-dark leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
            Lista de<br />
            <em className="italic text-rose">presentes</em>
          </h1>
        </div>

        <div className="flex gap-3 items-center flex-shrink-0 flex-wrap">
          <button className="inline-flex items-center gap-2 text-[0.75rem] font-light tracking-[0.14em] uppercase px-5 py-3.5 rounded-full border border-blush text-brand-text-light hover:border-rose hover:text-rose transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Exportar
          </button>
          <Link
            href="/admin/cadastrar-presente"
            className="group inline-flex items-center gap-2 bg-terracotta text-white text-[0.78rem] font-medium tracking-[0.14em] uppercase px-6 py-3.5 rounded-full hover:bg-deep-rose transition-all hover:-translate-y-0.5 shadow-[0_6px_20px_rgba(139,74,53,0.28)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Novo presente
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-2.5 transition-all ${view === "list" ? "bg-terracotta text-white" : "text-brand-text-light hover:text-rose"}`}
            title="Lista"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="3" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="3" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>
          </button>
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl opacity-40 mb-4">🎁</div>
          <h3 className="font-cormorant text-[1.8rem] font-light text-brand-dark mb-2">Nenhum presente encontrado</h3>
          <p className="text-[0.88rem] font-light text-brand-text-light">Tente outro filtro ou adicione um novo presente.</p>
        </div>
      ) : (
        <div className={`grid gap-5 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
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
      {editGift && <EditModal gift={editGift} onClose={() => setEditGift(null)} onSave={handleSaveEdit} />}
      {deleteGift && <DeleteModal gift={deleteGift} onClose={() => setDeleteGift(null)} onConfirm={handleConfirmDelete} />}

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => <Toast key={t.id} toast={t} onRemove={removeToast} />)}
      </div>
    </>
  );
}
