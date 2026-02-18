import ScrollReveal from "./ScrollReveal";
import { ArrowRight } from "./Icons";

export default function CtaSection() {
  return (
    <section id="presentes" className="bg-warm-white text-center py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="inline-flex items-center justify-center gap-3 text-[0.7rem] font-light tracking-[0.3em] uppercase text-gold mb-4 before:content-[''] before:block before:w-8 before:h-px before:bg-gold after:content-[''] after:block after:w-8 after:h-px after:bg-gold">
            Lista de Presentes
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="font-cormorant font-light text-dark leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Escolha seu <em className="italic text-rose">presente</em>
            <br />
            com carinho
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.22}>
          <p className="text-[0.95rem] font-light leading-[1.9] text-text-light max-w-lg mx-auto mb-11">
            Navegue pela nossa lista de presentes. Cada presente nos ajuda
            demais. Muito Obrigado ♡.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.34}>
          <a
            href="/presentes"
            className="inline-flex items-center gap-2 bg-terracotta text-white text-[0.8rem] font-medium tracking-[0.16em] uppercase px-9 py-4 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(139,74,53,0.25)] hover:bg-deep-rose hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(139,74,53,0.35)] group"
          >
            Acessar Lista de Presentes
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
