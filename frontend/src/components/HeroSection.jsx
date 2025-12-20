import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center pt-[90px]"
    >
      {/* === BACKGROUND CORE === */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#12001f] via-[#2b0040] to-[#0b0012]" />

      {/* === COSMIC AURA GLOW === */}
      <motion.div
        style={{ y: glowY }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full 
        bg-[radial-gradient(circle_at_center,rgba(200,120,255,0.35),transparent_65%)] blur-3xl"
      />

      <motion.div
        className="absolute bottom-[-30%] right-[-20%] w-[700px] h-[700px] rounded-full 
        bg-[radial-gradient(circle_at_center,rgba(255,200,100,0.25),transparent_70%)] blur-3xl"
      />

      {/* === NOISE OVERLAY (MYSTIC TEXTURE) === */}
      <div
        className="absolute inset-0 z-10 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 120 120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
        }}
      />

      {/* === CONTENT === */}
      <div
        className={`relative z-20 max-w-6xl mx-auto px-4 flex flex-col ${
          isMobile ? "items-center text-center" : "items-start text-left"
        }`}
      >
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="leading-[1.05] mb-5"
        >
          <span className="block text-[3rem] md:text-[5.5rem] font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-400 to-amber-300 drop-shadow-[0_0_25px_rgba(200,120,255,0.6)]">
              AraQueen
            </span>
          </span>

          <span className="block text-[2.2rem] md:text-[4.5rem] font-extrabold text-white/90">
            Kingdom
          </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-md text-[15px] md:text-base text-white/80 leading-relaxed mb-6"
        >
          Born beyond the stars — AraQueen is a mystic alien sovereign who can
          transform into anything, yet remains eternally violet.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className={`flex gap-4 ${
            isMobile ? "justify-center mt-6" : "justify-start"
          }`}
        >
          <a
            href="https://pump.fun/profile/araqueencrypto?tab=coins"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-sm md:text-base font-semibold text-black
            bg-gradient-to-r from-violet-300 via-fuchsia-400 to-amber-300
            shadow-[0_0_25px_rgba(200,120,255,0.6)]
            hover:scale-105 transition-transform"
          >
            ENTER THE KINGDOM
          </a>
        </motion.div>
      </div>
    </section>
  );
}
