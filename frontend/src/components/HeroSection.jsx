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

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "0%"]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen overflow-hidden flex items-center justify-center md:justify-start pt-[80px] md:pt-[100px]"
    >
      {/* Background */}
      {!isMobile ? (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/araqueen-palacedesk.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "100% 100%",
            y,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-top"
          style={{
            backgroundImage: "url('/araqueen-palace002.jpg')",
            backgroundSize: "cover",
          }}
        />
      )}

      {/* Konten utama */}
      <div
        className={`relative z-20 flex flex-col ${
          isMobile
            ? "items-center text-center -mt-20"
            : "items-start text-left ml-[1%]"
        } justify-center max-w-6xl mx-auto px-3`}
      >
        {/* Judul dengan efek bersinar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="leading-[1.1] mb-4 group cursor-pointer"
        >
          <h1 className="text-[3rem] md:text-[5rem] font-extrabold text-gray-900 tracking-tight transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-pink-500 group-hover:drop-shadow-[0_0_20px_rgba(255,180,0,0.8)]">
            <span className="block">
              The{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400 group-hover:from-yellow-300 group-hover:to-pink-500">
                AraQueen
              </span>
            </span>
            <span className="block group-hover:text-yellow-400">Kingdom</span>
          </h1>
        </motion.div>

        {/* Paragraf */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-white-800 max-w-md md:max-w-sm mb-4 text-[15px] leading-relaxed font-medium"
        >
          From memes to meaning — a token that funds reality. Join the citizens
          building a sustainable kingdom.
        </motion.p>

        {/* Tombol Aksi */}
        <div
          className={`flex flex-wrap gap-4 ${
            isMobile
              ? "justify-center mt-[180px]"
              : "justify-start mt-4"
          } mb-8`}
        >
          <a
            href="https://pump.fun/profile/araqueencrypto?tab=coins"
                 target="_blank"
              rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-sm md:text-base font-semibold shadow hover:scale-105 transition-transform"
          >
            BUY COIN
          </a>
          <a
            href="https://drive.google.com/file/d/1-ctfdkHzcajUvy9IPueCkOYop7N7nqSh/view"
                 target="_blank"
              rel="noopener noreferrer"
            className="px-5 py-3 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50 text-sm md:text-base font-semibold transition"
          >
            Whitepaper
          </a>
        </div>


      </div>
    </section>
  );
}
