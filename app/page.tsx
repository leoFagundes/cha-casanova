import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import InfoCards from "@/components/InfoCards";
import QuoteBand from "@/components/QuoteBand";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="z-10">
        <Hero />
        <About />
        <InfoCards />
        <QuoteBand />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
