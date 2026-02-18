export default function QuoteBand() {
  return (
    <div className="relative bg-terracotta py-20 px-4 text-center overflow-hidden quote-mark">
      <blockquote
        className="font-cormorant font-light italic text-white/95 max-w-3xl mx-auto leading-relaxed relative z-10"
        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
      >
        "Para uma casa se tornar um lar,
        <br />é preciso ser edificada com amor."
      </blockquote>
      <cite className="text-[0.8rem] tracking-[0.2em] uppercase text-white/55 not-italic mt-6 block">
        — Para Natália &amp; Leonardo, com amor ♡
      </cite>
    </div>
  );
}
