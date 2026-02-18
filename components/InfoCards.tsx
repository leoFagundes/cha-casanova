import ScrollReveal from "./ScrollReveal";

const cards = [
  {
    icon: "📅",
    title: "Data & Hora",
    text: "Sábado, 14 de Junho de 2025\nàs 16h00",
  },
  {
    icon: "📍",
    title: "Local",
    text: "Espaço Villa Jardim\nRua das Flores, 128 — São Paulo",
  },
  {
    icon: "🎁",
    title: "Lista de Presentes",
    text: "Escolha um item especial para ajudar o casal a montar o lar dos sonhos.",
  },
];

export default function InfoCards() {
  return (
    <section id="evento" className="bg-cream py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="inline-flex items-center justify-center gap-3 text-[0.7rem] font-light tracking-[0.3em] uppercase text-gold mb-4 before:content-[''] before:block before:w-8 before:h-px before:bg-gold after:content-[''] after:block after:w-8 after:h-px after:bg-gold">
              Detalhes
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2
              className="font-cormorant font-light text-dark leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Tudo que você precisa
              <br />
              <em className="italic text-rose">saber</em>
            </h2>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={0.1 + i * 0.12}>
              <div className="cursor-pointer relative bg-warm-white rounded-[20px] p-10 text-center border border-rose/10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(74,48,40,0.1)] card-top-border group">
                <div className="w-14 h-14 bg-gradient-to-br from-cream to-gold-light rounded-2xl grid place-items-center mx-auto mb-5 text-2xl">
                  {card.icon}
                </div>
                <h3 className="font-cormorant text-[1.3rem] font-normal text-dark mb-2">
                  {card.title}
                </h3>
                <p className="text-[0.85rem] font-light text-text-light leading-[1.7] whitespace-pre-line">
                  {card.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
