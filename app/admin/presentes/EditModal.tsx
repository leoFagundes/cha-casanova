"use client";

import { useState, useEffect } from "react";
import { CATEGORIES } from "./gifts.data";
import { Gift, Priority } from "@/app/types";

interface EditModalProps {
  gift: Gift | null;
  onClose: () => void;
  onSave: (updated: Gift) => void;
}

const PRIO: { value: Priority; label: string }[] = [
  { value: "alta", label: "Alta" },
  { value: "media", label: "Média" },
  { value: "baixa", label: "Baixa" },
];

const PRIO_SEL: Record<Priority, string> = {
  alta: "border-terracotta bg-terracotta/8 text-terracotta shadow-[0_0_0_3px_rgba(139,74,53,0.1)]",
  media:
    "border-gold bg-gold/8 text-gold shadow-[0_0_0_3px_rgba(201,169,110,0.1)]",
  baixa:
    "border-sage bg-sage/8 text-sage shadow-[0_0_0_3px_rgba(138,158,137,0.1)]",
};

function formatCurrency(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return (parseInt(digits, 10) / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function EditModal({ gift, onClose, onSave }: EditModalProps) {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("Cozinha");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [prio, setPrio] = useState<Priority>("media");

  useEffect(() => {
    if (gift) {
      setName(gift.name);
      setCat(gift.cat);
      setPrice(gift.price);
      setQty(gift.qty);
      setLink(gift.link || "");
      setDesc(gift.desc);
      setPrio(gift.prioridade);
      setImageUrl(gift.imageUrl || "");
    }
  }, [gift]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!gift) return null;

  const inputCls =
    "w-full bg-cream border border-blush/60 rounded-xl px-4 py-3 text-[0.88rem] font-light text-brand-dark placeholder:text-brand-text-light/40 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/12 transition-all";

  return (
    <div
      className="fixed inset-0 bg-brand-dark/50 backdrop-blur-[6px] z-[200] grid place-items-center p-4"
      style={{ animation: "fadeIn .2s ease" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-warm-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-[0_30px_80px_rgba(44,30,26,0.25)]"
        style={{ animation: "slideUp .3s ease" }}
      >
        <div className="flex items-center justify-between p-7 pb-0">
          <h2 className="font-cormorant text-[1.9rem] font-light text-brand-dark">
            Editar <em className="italic text-rose">presente</em>
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-cream grid place-items-center text-brand-text-light hover:bg-rose/12 hover:text-rose transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-blush to-transparent mx-7 my-4" />

        <div className="px-7 pb-7 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                Nome <span className="text-rose">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                Categoria
              </label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className={`${inputCls} appearance-none cursor-pointer`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.emoji} {c.value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                Preço
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(formatCurrency(e.target.value))}
                inputMode="numeric"
                className={inputCls}
                placeholder="R$ 0,00"
              />
            </div>
            <div>
              <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                Prioridade
              </label>
              <div className="flex gap-2">
                {PRIO.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPrio(p.value)}
                    className={`flex-1 py-3 rounded-xl border text-[0.72rem] font-medium tracking-[0.1em] uppercase transition-all ${prio === p.value ? PRIO_SEL[p.value] : "border-blush/50 bg-cream text-brand-text-light hover:border-blush"}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                Quantidade
              </label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(+e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                Link da loja
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://…"
                className={inputCls}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                URL da imagem
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://…/imagem.jpg"
                className={inputCls}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[0.72rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-1.5">
                Descrição
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-blush/25">
            <button
              onClick={onClose}
              className="text-[0.75rem] font-light tracking-[0.14em] uppercase px-5 py-3 rounded-full border border-blush text-brand-text-light hover:border-rose hover:text-rose transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (!gift.id) {
                  console.error("Gift sem id!", gift);
                  return;
                }

                onSave({
                  id: gift.id,
                  name,
                  cat,
                  emoji:
                    CATEGORIES.find((c) => c.value === cat)?.emoji ??
                    gift.emoji,
                  price,
                  qty,
                  link: link || "",
                  desc,
                  prioridade: prio,
                  contributions: gift.contributions || [],
                  taken: gift.taken ?? 0,
                  imageUrl: gift.imageUrl || "",
                });
              }}
              className="inline-flex items-center gap-2 bg-terracotta text-white text-[0.75rem] font-medium tracking-[0.14em] uppercase px-6 py-3 rounded-full hover:bg-deep-rose transition-all hover:-translate-y-0.5 shadow-[0_6px_18px_rgba(139,74,53,0.28)]"
            >
              Salvar alterações
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
