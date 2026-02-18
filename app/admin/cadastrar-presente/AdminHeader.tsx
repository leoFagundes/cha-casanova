"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-warm-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(201,134,109,0.15)]"
          : "bg-transparent"
      }`}
    >
      {/* Back link + logo */}
      <div onClick={() => router.back()} className="flex items-center gap-5">
        <Link
          href="#"
          className="group flex items-center gap-2 text-[0.72rem] font-light tracking-[0.18em] uppercase text-brand-text-light hover:text-terracotta transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>

        <span className="w-px h-4 bg-blush/60" />

        <span className="font-cormorant text-[1.25rem] font-light tracking-widest text-terracotta">
          A <em className="italic">&amp;</em> L
        </span>
      </div>

      {/* Admin badge */}
      <div className="hidden md:flex items-center gap-2 text-[0.68rem] font-light tracking-[0.22em] uppercase text-gold border border-gold/30 rounded-full px-4 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
        Painel Admin
      </div>
    </header>
  );
}
