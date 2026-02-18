"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-6 transition-all duration-400 bg-blush/10 backdrop-blur-[8px]`}
    >
      {/* Logo */}
      <a
        href="#"
        className="font-cormorant text-[1.4rem] font-light tracking-widest text-terracotta no-underline"
      >
        N <em className="italic">&amp;</em> L
      </a>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-10">
        <a
          href="#sobre"
          className="text-xs font-light tracking-[0.14em] uppercase text-text-light hover:text-rose transition-colors"
        >
          Sobre
        </a>
        <a
          href="#evento"
          className="text-xs font-light tracking-[0.14em] uppercase text-text-light hover:text-rose transition-colors"
        >
          O Evento
        </a>
        <a
          href="/presentes"
          className="text-[0.75rem] font-medium tracking-[0.14em] uppercase px-5 py-[0.55rem] border border-rose text-rose rounded-full hover:bg-rose hover:text-white transition-all"
        >
          Ver Presentes
        </a>
      </nav>

      {/* Hamburger */}
      <label
        aria-label="Abrir menu"
        className="flex md:hidden cursor-pointer flex-col gap-2 w-8 scale-75 z-[102]"
      >
        <input
          type="checkbox"
          className="peer hidden"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />

        <div className="rounded-2xl h-[3px] w-1/2 bg-rose duration-500 origin-right peer-checked:rotate-[225deg] peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]" />

        <div className="rounded-2xl h-[3px] w-full bg-rose duration-500 peer-checked:-rotate-45" />

        <div className="rounded-2xl h-[3px] w-1/2 bg-rose duration-500 place-self-end origin-left peer-checked:rotate-[225deg] peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]" />
      </label>

      {/* Mobile menu overlay */}
      <nav
        className={`${menuOpen && "opacity-100 z-[101] !translate-x-0"} transition-all duration-500 -translate-x-full opacity-0 fixed top-0 left-0 w-full h-screen inset-0 bg-cream flex flex-col items-center justify-center gap-10 `}
      >
        {/* Gradient blobs */}
        <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-[100px] -right-[150px] bg-radial-blush animate-drift" />
        <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -bottom-[80px] -left-[120px] bg-radial-sage animate-drift-reverse" />

        <a
          href="#sobre"
          onClick={closeMenu}
          className="text-base tracking-[0.2em] uppercase text-text-light hover:text-rose transition-colors"
        >
          Sobre
        </a>
        <a
          href="#evento"
          onClick={closeMenu}
          className="text-base tracking-[0.2em] uppercase text-text-light hover:text-rose transition-colors"
        >
          O Evento
        </a>
        <a
          href="/presentes"
          onClick={closeMenu}
          className="text-base tracking-[0.2em] uppercase px-6 py-3 border border-rose text-rose rounded-full hover:bg-rose hover:text-white transition-all"
        >
          Ver Presentes
        </a>
      </nav>
    </header>
  );
}
