import React from "react";
import { motion } from "framer-motion";

export default function RoyalEcosystem() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50 text-gray-800 px-6 py-16 overflow-x-hidden relative">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[250px] h-[250px] bg-pink-300/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 w-[220px] h-[220px] bg-yellow-200/20 blur-[100px] rounded-full"></div>
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
          The AraQueen ecosystem bridges digital wealth with real-world prosperity through a
          structured, sustainable economic loop.
        </p>
      </motion.section>

      {/* Economic Loop */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          Economic Loop
        </h2>
        <div className="relative group">
          <img
            src="/economic-loop.png"
            alt="Economic Loop"
            className="mx-auto w-full max-w-lg rounded-xl shadow-md border border-pink-200 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-pink-200/30 blur-lg transition-all duration-700"></div>
        </div>
        <p className="mt-4 text-sm text-gray-600 max-w-xl mx-auto">
          The continuous value cycle: investment, profit, buyback, and rewards — all return to strengthen AraQueen’s treasury.
        </p>
      </motion.section>

      {/* Real Economy */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
          Real-Economy Value Flow
        </h2>
        <div className="relative group">
          <img
            src="/real economy.png"
            alt="Real-Economy Flow"
            className="mx-auto w-full max-w-3xl rounded-xl shadow-md border border-yellow-200 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-yellow-200/40 blur-lg transition-all duration-700"></div>
        </div>
        <p className="mt-4 text-sm text-gray-600 max-w-xl mx-auto">
          Real-world investments in agriculture, energy, and technology fuel AraQueen’s ecosystem sustainability and stability.
        </p>
      </motion.section>

      {/* Core Utilities */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-16"
      >
        <h2 className="text-center text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          Core Utilities of the Kingdom
        </h2>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 grid md:grid-cols-2 gap-6 border border-pink-100 shadow-inner">
          {[
            {
              title: "Kingdom Currency",
              desc: "The $ARAQ token — royal medium for payments, staking, and DAO governance.",
            },
            {
              title: "Real-Economy Feedback Loop",
              desc: "Profits from ARAQ-FARM, ARAQ-ENERGY, and ARAQ-TECH are reinvested to sustain the treasury.",
            },
            {
              title: "NFT Citizenship & Privileges",
              desc: "Holders rise through social ranks — Citizen, Knight, Noble, up to Queen’s Hand — gaining exclusive rewards.",
            },
            {
              title: "Governance & Voting Power",
              desc: "The Royal Decree DAO empowers citizens to propose, vote, and shape AraQueen’s future.",
            },
            {
              title: "Royal Rewards & Loyalty",
              desc: "Earn staking profits, treasury shares, and special NFT airdrops.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="p-4 bg-white/90 border border-pink-100 rounded-xl shadow-sm hover:shadow-md hover:shadow-yellow-200/50 transition-all"
            >
              <h3 className="text-lg font-bold text-pink-600 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Structured Ecosystem */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          Structured Ecosystem
        </h2>
        <div className="relative group">
          <img
            src="/structured ecosystem.png"
            alt="Structured Ecosystem"
            className="mx-auto w-full max-w-2xl rounded-xl shadow-md border border-pink-200 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-pink-100/40 blur-lg transition-all duration-700"></div>
        </div>
        <p className="mt-4 text-sm text-gray-600 max-w-xl mx-auto">
          A bonding-curve based economy ensures long-term growth, fair rewards, and a self-sustaining royal kingdom.
        </p>
      </motion.section>

      {/* Divider for smooth transition */}
      <div className="mt-16 w-48 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full"></div>
      <p className="text-gray-500 mt-4 italic text-center">
        “Sustainability is the crown jewel of AraQueen.” 👑
      </p>

      {/* Bottom soft fade for JoinCTA transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-pink-100 to-pink-200/40 pointer-events-none"></div>
    </main>
  );
}
