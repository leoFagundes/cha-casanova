"use client";

import { useRouter } from "next/navigation";
import ScrollReveal from "./ScrollReveal";

const EVENT = {
  title: "Chá de Casa Nova Natália & Leonardo",
  description: "Celebre conosco este momento especial!",
  location: "SHIN Qi 4 Conjunto 1 Casa 23 - Brasília",

  date: "2026-06-14",
  startTime: "12:00",
  endTime: "18:00",
  timezone: "America/Sao_Paulo",

  coords: {
    lat: -15.72425984479039,
    lng: -47.88069270669907,
  },
};

const cards = [
  {
    icon: "📅",
    title: "Data & Hora",
    text: "Sábado, 14 de Junho de 2026\nàs 12h00 (Alterar para o certo)",
    action: "calendar",
  },
  {
    icon: "📍",
    title: "Local",
    text: EVENT.location,
    action: "maps",
  },
  {
    icon: "🎁",
    title: "Lista de Presentes",
    text: "Escolha um item especial para ajudar o casal a montar o lar dos sonhos.",
    action: "gifts",
  },
];

export default function InfoCards() {
  const router = useRouter();

  function toGoogleDate(date: string, time: string, timezone: string) {
    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);

    const local = new Date(
      new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date(`${date}T00:00:00`)),
    );

    local.setHours(hour, minute, 0, 0);

    const utc = new Date(local.getTime() - local.getTimezoneOffset() * 60000);

    return utc.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  function openCalendar() {
    const start = toGoogleDate(EVENT.date, EVENT.startTime, EVENT.timezone);
    const end = toGoogleDate(EVENT.date, EVENT.endTime, EVENT.timezone);

    const url = new URL("https://calendar.google.com/calendar/render");

    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", EVENT.title);
    url.searchParams.set("details", EVENT.description);
    url.searchParams.set("location", EVENT.location);
    url.searchParams.set("dates", `${start}/${end}`);

    window.open(url.toString(), "_blank");
  }

  function openMaps() {
    const { lat, lng } = EVENT.coords;

    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  }

  function goToGifts() {
    router.push("/presentes");
  }

  function handleClick(action: string) {
    if (action === "calendar") openCalendar();
    if (action === "maps") openMaps();
    if (action === "gifts") goToGifts();
  }

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
              <button
                onClick={() => handleClick(card.action)}
                className="cursor-pointer relative bg-warm-white rounded-[20px] p-10 text-center border border-rose/10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(74,48,40,0.1)] card-top-border group w-full"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cream to-gold-light rounded-2xl grid place-items-center mx-auto mb-5 text-2xl">
                  {card.icon}
                </div>

                <h3 className="font-cormorant text-[1.3rem] font-normal text-dark mb-2">
                  {card.title}
                </h3>

                <p className="text-[0.85rem] font-light text-text-light leading-[1.7] whitespace-pre-line">
                  {card.text}
                </p>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
