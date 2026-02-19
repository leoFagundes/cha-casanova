import { Gift } from "@/app/types";

export default function StatsRow({ gifts }: { gifts: Gift[] }) {
  const total = gifts.length;
  const taken = gifts.filter((g) => g.taken >= g.qty).length;
  const avail = total - taken;
  const highPrio = gifts.filter((g) => g.prioridade === "alta").length;

  const stats = [
    {
      icon: "🎁",
      num: total,
      label: "Total de itens",
      accent: "bg-terracotta/10",
    },
    { icon: "✅", num: avail, label: "Disponíveis", accent: "bg-sage/12" },
    { icon: "💝", num: taken, label: "Escolhidos", accent: "bg-rose/12" },
    {
      icon: "⭐",
      num: highPrio,
      label: "Alta prioridade",
      accent: "bg-gold/12",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-warm-white rounded-2xl px-4 py-4 border border-blush/25 flex items-center gap-3"
        >
          <div
            className={`w-11 h-11 rounded-xl ${s.accent} grid place-items-center text-lg shrink-0`}
          >
            {s.icon}
          </div>
          <div>
            <div className="font-cormorant text-[1.9rem] font-light text-brand-dark leading-none">
              {s.num}
            </div>
            <div className="text-[0.68rem] font-light tracking-[0.1em] uppercase text-brand-text-light mt-0.5">
              {s.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
