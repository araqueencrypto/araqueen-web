import React from "react";
import { motion } from "framer-motion";

export default function RoyalEcosystem() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const ecosystemData = [
    {
      title: "Economic Loop",
      image: "/economic-loop.png",
      border: "border-pink-200",
      glow: "bg-pink-200/25",
      desc: "The continuous value cycle — investment, profit, buyback, and rewards — all return to strengthen AraQueen’s treasury.",
    },
    {
      title: "Real-Economy Flow",
      image: "/real economy.png",
      border: "border-yellow-200",
      glow: "bg-yellow-200/30",
      desc: "Real-world investments in agriculture, energy, and technology fuel AraQueen’s sustainability and stability.",
    },
    {
      title: "Structured Ecosystem",
      image: "/structured ecosystem.png",
      border: "border-pink-200",
      glow: "bg-pink-100/40",
      desc: "A bonding-curve-based economy ensures long-term growth, fair rewards, and a self-sustaining royal kingdom.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50 text-gray-800 px-6 py-16 overflow-x-hidden relative">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[200px] h-[200px] bg-pink-300/20 blur-[90px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 w-[180px] h-[180px] bg-yellow-200/20 blur-[90px] rounded-full"></div>
      </div>

      {/* Header */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          The Royal Ecosystem
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          The AraQueen ecosystem bridges digital wealth with real-world prosperity through a structured, sustainable economic loop.
        </p>
      </motion.section>

      {/* 🌐 Unified Ecosystem Visuals */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-20"
      >
        <h2 className="text-2xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          The Core of AraQueen’s Economy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {ecosystemData.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center text-center bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-inner hover:shadow-pink-200/50 transition-all"
            >
              <div className="relative group w-full rounded-xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`mx-auto w-full h-56 object-contain rounded-xl border ${item.border} shadow-md transition-transform duration-500 group-hover:scale-[1.05]`}
                />
                <div
                  className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 ${item.glow} blur-lg transition-all duration-700`}
                ></div>
              </div>

              <h3 className="text-lg font-bold text-pink-600 mt-4">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-sm text-gray-600 max-w-xl mx-auto">
          Together, these pillars form a unified economic ecosystem — connecting blockchain innovation with tangible, sustainable growth.
        </p>
      </motion.section>

      {/* Divider */}
      <div className="mt-16 w-48 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full"></div>
      <p className="text-gray-500 mt-4 italic text-center">
        “Sustainability is the crown jewel of AraQueen.” 👑
      </p>
    </main>
  );
}
