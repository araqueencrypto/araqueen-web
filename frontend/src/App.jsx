import { useEffect } from "react";
import RunningText from "./components/RunningText";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import RoyalFoundation from "./components/RoyalFoundation";
import Footer from "./components/Footer";


export default function App() {


  return (
    <div className="relative text-gray-900 overflow-x-hidden scroll-smooth">
      {/* 🔥 Running Text di paling atas */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <RunningText />
      </div>

      {/* 🔹 Navbar solid di bawah running text */}
      <Navbar />

      {/* Konten utama dimulai tepat setelah bar atas */}
      <main className="relative z-10 pt-[40px] bg-white">
        <section id="home" className="scroll-mt-[40px]">
          <HeroSection />
        </section>

        <section id="foundation" className="scroll-mt-[40px]">
          <RoyalFoundation />
        </section>

        <section id="footer" className="scroll-mt-[40px]">
          <Footer />
        </section>
      </main>

      
    </div>
  );
}
