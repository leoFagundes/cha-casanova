"use client";

import { useState } from "react";

type Category =
  | ""
  | "cozinha"
  | "sala"
  | "quarto"
  | "banheiro"
  | "decoracao"
  | "eletrodomestico"
  | "outro";

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: "cozinha", label: "Cozinha", emoji: "🍳" },
  { value: "sala", label: "Sala", emoji: "🛋️" },
  { value: "quarto", label: "Quarto", emoji: "🛏️" },
  { value: "banheiro", label: "Banheiro", emoji: "🚿" },
  { value: "decoracao", label: "Decoração", emoji: "🌿" },
  { value: "eletrodomestico", label: "Eletrodoméstico", emoji: "⚡" },
  { value: "outro", label: "Outro", emoji: "✨" },
];

const PRIORITY = [
  { value: "alta", label: "Alta", color: "text-terracotta" },
  { value: "media", label: "Média", color: "text-gold" },
  { value: "baixa", label: "Baixa", color: "text-sage" },
];

export default function GiftForm() {
  const [category, setCategory] = useState<Category>("");
  const [priority, setPriority] = useState("media");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [price, setPrice] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const formatPrice = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    const number = parseInt(digits, 10) / 100;
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(formatPrice(e.target.value));
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-[fadeUp_0.6s_ease_forwards]">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blush to-rose flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(201,134,109,0.35)]">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-cormorant text-[2.2rem] font-light text-brand-dark mb-3">
          Presente <em className="italic text-rose">cadastrado!</em>
        </h2>
        <p className="text-sm font-light text-brand-text-light mb-8 max-w-sm">
          O presente foi adicionado à lista com sucesso e já estará disponível
          para os convidados.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => {
              setSubmitted(false);
              setImagePreview(null);
              setPrice("");
              setCategory("");
            }}
            className="inline-flex items-center gap-2 bg-terracotta text-white text-[0.78rem] font-medium tracking-[0.14em] uppercase px-7 py-3.5 rounded-full hover:bg-rose-deep transition-all hover:-translate-y-0.5 shadow-[0_6px_20px_rgba(139,74,53,0.25)]"
          >
            + Cadastrar outro
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-brand-text-light text-[0.78rem] font-light tracking-[0.14em] uppercase px-7 py-3.5 rounded-full border border-blush hover:border-rose hover:text-rose transition-all"
          >
            Ver site
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-10"
    >
      {/* ── SECTION: Informações Básicas ── */}
      <FormSection
        number="01"
        title="Informações básicas"
        subtitle="Nome, descrição e categoria do presente"
      >
        {/* Name */}
        <div className="md:col-span-2">
          <FieldLabel required>Nome do presente</FieldLabel>
          <input
            type="text"
            required
            placeholder="Ex: Jogo de panelas tramontina 5 peças"
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div className="md:col-span-2">
          <FieldLabel required>Categoria</FieldLabel>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-light transition-all duration-200 ${
                  category === cat.value
                    ? "border-rose bg-rose/8 text-rose shadow-[0_0_0_3px_rgba(201,134,109,0.12)]"
                    : "border-blush/50 bg-warm-white text-brand-text-light hover:border-rose/50 hover:text-rose"
                }`}
              >
                <span className="text-base">{cat.emoji}</span>
                <span className="tracking-wide">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <FieldLabel>Descrição</FieldLabel>
          <textarea
            rows={3}
            placeholder="Descreva o presente brevemente para os convidados…"
            className={`${inputClass} resize-none`}
          />
        </div>
      </FormSection>

      {/* ── SECTION: Preço & Prioridade ── */}
      <FormSection
        number="02"
        title="Preço & prioridade"
        subtitle="Valor sugerido e urgência do item"
      >
        {/* Price */}
        <div>
          <FieldLabel required>Preço sugerido</FieldLabel>
          <div className="relative">
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              required
              placeholder="R$ 0,00"
              className={`${inputClass} pl-4`}
              inputMode="numeric"
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <FieldLabel>Prioridade</FieldLabel>
          <div className="flex gap-2.5">
            {PRIORITY.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={`flex-1 py-3.5 rounded-xl border text-[0.78rem] font-medium tracking-[0.1em] uppercase transition-all duration-200 ${
                  priority === p.value
                    ? p.value === "alta"
                      ? "border-terracotta bg-terracotta/8 text-terracotta shadow-[0_0_0_3px_rgba(139,74,53,0.1)]"
                      : p.value === "media"
                        ? "border-gold bg-gold/8 text-gold shadow-[0_0_0_3px_rgba(201,169,110,0.1)]"
                        : "border-sage bg-sage/8 text-sage shadow-[0_0_0_3px_rgba(138,158,137,0.1)]"
                    : "border-blush/50 bg-warm-white text-brand-text-light hover:border-blush"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <FieldLabel>Quantidade disponível</FieldLabel>
          <input
            type="number"
            min={1}
            defaultValue={1}
            className={inputClass}
          />
          <p className="mt-1.5 text-[0.72rem] text-brand-text-light font-light">
            Quantos convidados podem escolher este presente
          </p>
        </div>

        {/* Store link */}
        <div>
          <FieldLabel>Link da loja (opcional)</FieldLabel>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-light/60">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
            </span>
            <input
              type="url"
              placeholder="https://…"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
      </FormSection>

      {/* ── SECTION: Imagem ── */}
      <FormSection
        number="03"
        title="Imagem do presente"
        subtitle="Uma foto bonita para exibir na lista"
      >
        <div className="md:col-span-2">
          <FieldLabel>Foto do presente</FieldLabel>

          {imagePreview ? (
            <div
              className="relative group w-full rounded-2xl overflow-hidden border border-blush/40 shadow-[0_4px_20px_rgba(74,48,40,0.08)]"
              style={{ aspectRatio: "16/7" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="text-white text-[0.75rem] tracking-[0.15em] uppercase font-medium border border-white/50 rounded-full px-5 py-2.5 hover:bg-white/10 transition-colors"
                >
                  Trocar imagem
                </button>
              </div>
            </div>
          ) : (
            <label
              className="flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed border-blush/60 bg-warm-white hover:border-rose/50 hover:bg-cream transition-all duration-300 cursor-pointer group"
              style={{ aspectRatio: "16/7" }}
            >
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
              <div className="flex flex-col items-center gap-3 text-center px-4">
                <div className="w-12 h-12 rounded-2xl bg-cream group-hover:bg-blush/30 transition-colors grid place-items-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c9866d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <div>
                  <p className="text-[0.85rem] font-light text-brand-text-light">
                    <span className="text-rose font-normal">
                      Clique para enviar
                    </span>{" "}
                    ou arraste aqui
                  </p>
                  <p className="text-[0.72rem] text-brand-text-light/60 mt-0.5">
                    PNG, JPG, WEBP — até 5MB
                  </p>
                </div>
              </div>
            </label>
          )}
        </div>

        {/* Image URL alternative */}
        <div className="md:col-span-2">
          <FieldLabel>Ou cole uma URL de imagem</FieldLabel>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-light/60">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </span>
            <input
              type="url"
              placeholder="https://…/imagem.jpg"
              className={`${inputClass} pl-10`}
              onChange={(e) => {
                if (e.target.value) setImagePreview(e.target.value);
              }}
            />
          </div>
        </div>
      </FormSection>

      {/* ── SECTION: Observações ── */}
      <FormSection
        number="04"
        title="Observações"
        subtitle="Notas internas ou mensagem para o convidado"
      >
        <div className="md:col-span-2">
          <FieldLabel>Mensagem ao convidado (opcional)</FieldLabel>
          <textarea
            rows={2}
            placeholder="Ex: Se puder, prefira a versão inox…"
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="md:col-span-2">
          <FieldLabel>Nota interna (visível só no admin)</FieldLabel>
          <textarea
            rows={2}
            placeholder="Notas internas sobre este item…"
            className={`${inputClass} resize-none`}
          />
        </div>
      </FormSection>

      {/* ── SUBMIT ── */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-blush/30">
        <p className="text-[0.75rem] font-light text-brand-text-light tracking-wide text-center sm:text-left">
          O presente ficará visível na lista assim que for salvo.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            type="button"
            className="text-[0.78rem] font-light tracking-[0.14em] uppercase px-6 py-3.5 rounded-full border border-blush text-brand-text-light hover:border-rose hover:text-rose transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="group inline-flex items-center gap-2.5 bg-terracotta text-white text-[0.78rem] font-medium tracking-[0.14em] uppercase px-8 py-3.5 rounded-full hover:bg-rose-deep transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(139,74,53,0.3)] hover:shadow-[0_12px_32px_rgba(139,74,53,0.4)]"
          >
            Salvar presente
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}

/* ── Reusable sub-components ── */

function FormSection({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10">
      {/* Section label */}
      <div className="flex flex-row md:flex-col gap-3 md:gap-2 items-start pt-1">
        <span className="font-cormorant text-[2rem] font-light text-blush leading-none select-none">
          {number}
        </span>
        <div>
          <p className="font-cormorant text-[1.05rem] font-light text-brand-dark leading-tight">
            {title}
          </p>
          <p className="text-[0.72rem] font-light text-brand-text-light mt-0.5 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Fields grid */}
      <div className="grid md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-[0.73rem] font-light tracking-[0.14em] uppercase text-brand-text-light mb-2">
      {children}
      {required && <span className="text-rose ml-1">*</span>}
    </label>
  );
}

const inputClass =
  "w-full bg-warm-white border border-blush/60 rounded-xl px-4 py-3.5 text-[0.9rem] font-light text-brand-dark placeholder:text-brand-text-light/50 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/15 transition-all duration-200 hover:border-blush";
