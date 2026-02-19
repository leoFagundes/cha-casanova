"use client";

import { Gift } from "@/app/types";
import { useEffect } from "react";

interface DeleteModalProps {
  gift: Gift | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  gift,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!gift) return null;

  return (
    <div
      className="fixed inset-0 bg-brand-dark/50 backdrop-blur-[6px] z-[200] grid place-items-center p-4"
      style={{ animation: "fadeIn .2s ease" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-warm-white rounded-3xl w-full max-w-sm text-center p-10 shadow-[0_30px_80px_rgba(44,30,26,0.25)]"
        style={{ animation: "slideUp .3s ease" }}
      >
        <div className="w-16 h-16 rounded-full bg-terracotta/10 grid place-items-center mx-auto mb-5">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8b4a35"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>

        <h2 className="font-cormorant text-[1.9rem] font-light text-brand-dark mb-2">
          Excluir <em className="italic text-terracotta">presente</em>?
        </h2>

        <p className="text-[0.85rem] font-light text-brand-text-light leading-relaxed mb-7">
          Tem certeza que deseja remover{" "}
          <span className="font-cormorant italic text-rose">"{gift.name}"</span>{" "}
          da lista? Esta ação não pode ser desfeita.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="text-[0.75rem] font-light tracking-[0.14em] uppercase px-5 py-3 rounded-full border border-blush text-brand-text-light hover:border-rose hover:text-rose transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex items-center gap-2 bg-terracotta text-white text-[0.75rem] font-medium tracking-[0.14em] uppercase px-6 py-3 rounded-full hover:bg-[#7a3a28] transition-all hover:-translate-y-0.5 shadow-[0_6px_18px_rgba(139,74,53,0.28)]"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            </svg>
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  );
}
