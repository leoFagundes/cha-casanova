import BotanicalSvg from "./BotanicalSvg";
import { ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-svh grid place-items-center text-center px-4 pt-28 pb-20 overflow-hidden"
    >
      {/* Gradient blobs */}
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-[100px] -right-[150px] bg-radial-blush animate-drift" />
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -bottom-[80px] -left-[120px] bg-radial-sage animate-drift-reverse" />

      {/* Botanical decorations */}
      <BotanicalSvg
        color="#c9866d"
        strokeColor="#a05c47"
        className="absolute top-20 left-5 w-48 opacity-[0.12] -rotate-[15deg] pointer-events-none"
      />
      <BotanicalSvg
        color="#8a9e89"
        strokeColor="#6b7f6a"
        className="absolute bottom-16 right-5 w-44 opacity-[0.12] rotate-[165deg] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Badge */}
        <div className="inline-block text-[0.7rem] font-light tracking-[0.25em] uppercase text-gold border border-gold-light rounded-full px-5 py-[0.4rem] mb-8 opacity-0 animate-fadeUp animation-delay-200 animation-fill-forwards">
          ✦ Chá de Casa Nova ✦
        </div>

        {/* Date */}
        <p className="font-cormorant text-base italic text-text-light tracking-wider mb-2 opacity-0 animate-fadeUp animation-delay-350 animation-fill-forwards">
          Sábado, 14 de Junho de 2026
        </p>

        {/* Names */}
        <div className="flex flex-col gap-2 py-2 font-cormorant font-light leading-none text-dark opacity-0 animate-fadeUp animation-delay-500 animation-fill-forwards">
          <h1 className="italic text-rose sm:text-7xl text-5xl">Natália</h1>
          <span className="block font-cormorant font-light text-blush py-2 sm:text-6xl text-4xl">
            &amp;
          </span>
          <h1 className="italic text-rose sm:text-7xl text-5xl">Leonardo</h1>
        </div>

        {/* Subtitle */}
        <p className="font-cormorant italic font-light text-text-light my-7 leading-relaxed opacity-0 animate-fadeUp animation-delay-750 animation-fill-forwards">
          "Ficamos muito felizes em ter você com a gente.
          <br />
          Obrigado por celebrar esse novo capítulo ao nosso lado."
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center opacity-0 animate-fadeUp animation-delay-1000 animation-fill-forwards">
          {/* <a
            href="/presentes"
            className="inline-flex items-center gap-2 bg-terracotta text-white text-[0.8rem] font-medium tracking-[0.16em] uppercase px-9 py-4 rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(139,74,53,0.25)] hover:bg-deep-rose hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(139,74,53,0.35)] group"
          >
            Ver Lista de Presentes
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a> */}
          <a
            href="#sobre"
            className="inline-flex items-center gap-2 text-text-light text-[0.8rem] font-light tracking-[0.14em] uppercase px-7 py-4 rounded-full border border-text-main/20 hover:border-rose hover:text-rose transition-all duration-300"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  );
}
