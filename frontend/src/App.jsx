import { useEffect } from "react";
import { fetchHealth } from "./api/backend";

import RunningText from "./components/RunningText";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import RoyalFoundation from "./components/RoyalFoundation";
import JourneySection from "./components/JourneySection";
import JoinCTA from "./components/JoinCTA";
import Footer from "./components/Footer";


export default function App() {

  useEffect(() => {
    fetchHealth()
      .then(data => {
        console.log("Backend connected:", data);
      })
      .catch(err => {
        console.error("Backend error:", err);
      });
  }, []);


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
        <section id="hero" className="scroll-mt-[40px]">
          <HeroSection />
        </section>

        <section id="royal-foundation" className="scroll-mt-[40px]">
          <RoyalFoundation />
        </section>

        <section id="journey" className="scroll-mt-[40px]">
          <JourneySection />
        </section>

        <section id="join" className="scroll-mt-[40px]">
          <JoinCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
}
