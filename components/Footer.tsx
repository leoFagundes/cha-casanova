export default function Footer() {
  return (
    <footer className="bg-terracotta text-white/50 p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
        <div className="font-cormorant text-[1rem] font-light text-white/75 tracking-widest">
          <em className="italic text-blush">Natália</em>
          <span className="italic text-blush"> &amp;</span>{" "}
          <em className="italic text-blush">Leonardo</em>
        </div>

        <div className="hidden md:block w-px h-8 bg-blush/60" />
        <div className="block md:hidden w-10 h-px bg-blush/60" />

        <div className="text-[0.75rem] tracking-wider text-center md:text-right italic text-blush font-semibold">
          <p>Chá de Casa Nova · Junho 2026</p>
        </div>
      </div>
    </footer>
  );
}
