"use client";

import { useRef, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Spawn floating bubbles dynamically
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const spawnBubble = () => {
      const b = document.createElement("div");
      const size = Math.random() * 6 + 3;
      const left = Math.random() * 60 + 70;
      const duration = Math.random() * 1.5 + 1.2;
      const delay = Math.random() * 0.5;

      b.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        width: ${size}px;
        height: ${size}px;
        left: ${left}px;
        bottom: 100px;
        z-index: 3;
        pointer-events: none;
        animation: bubbleFloat ${duration}s ${delay}s linear forwards;
      `;
      card.appendChild(b);
      setTimeout(() => b.remove(), (duration + delay) * 1000 + 100);
    };

    const interval = setInterval(spawnBubble, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="sobre" className="bg-warm-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div>
            <ScrollReveal>
              <p className="flex items-center gap-3 text-[0.7rem] font-light tracking-[0.3em] uppercase text-gold mb-4 before:content-[''] before:block before:w-8 before:h-px before:bg-gold">
                Sobre o Evento
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                className="font-cormorant font-light text-dark leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                Uma nova casa,
                <br />
                <em className="italic text-rose">uma nova história</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <p className="text-[0.95rem] font-light leading-[1.9] text-text-light mb-5">
                Natalia e Leonardo estão se mudando juntos pela primeira vez e
                começando uma nova fase cheia de novidades, aprendizados e
                desafios.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.34}>
              <p className="text-[0.95rem] font-light leading-[1.9] text-text-light">
                Escolha um presente com amor e faça parte dessa nova etapa tão
                especial. ♡
              </p>
            </ScrollReveal>
          </div>

          {/* Visual card */}
          <ScrollReveal delay={0.22} className="relative">
            <div className="relative">
              <div
                className="rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(74,48,40,0.1)]"
                style={{ aspectRatio: "3/4" }}
              >
                <div
                  ref={cardRef}
                  className="w-full h-full bg-gradient-to-br from-gold-light via-blush to-rose/50 grid place-items-center relative overflow-hidden"
                >
                  {/* Warm glow behind pot */}
                  <div className="pot-glow" />

                  <svg
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[62%] relative z-10"
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
                      <ellipse
                        cx="100"
                        cy="134"
                        rx="45"
                        ry="8"
                        fill="#a05c47"
                      />
                    </g>

                    {/* ── Lid (wobbles independently) ── */}
                    <g className="pot-lid-group">
                      <ellipse
                        cx="100"
                        cy="90"
                        rx="46"
                        ry="13"
                        fill="#e8c4b0"
                      />
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
                        <ellipse
                          cx="100"
                          cy="77"
                          rx="5"
                          ry="5"
                          fill="#a05c47"
                        />
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
                </div>
              </div>

              {/* Float card */}
              <div className="absolute -bottom-5 left-2 md:-left-8 bg-white rounded-2xl p-5 shadow-[0_10px_40px_rgba(74,48,40,0.12)] max-w-[220px]">
                <div className="text-[1.4rem] mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-house-heart-icon lucide-house-heart"
                  >
                    <path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <p className="font-cormorant italic text-[1.1rem] text-text-main leading-snug">
                  "Nosso primeiro lar, juntos"
                </p>
                <span className="text-[0.7rem] tracking-wider uppercase text-text-light mt-1 block">
                  Junho 2026
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
