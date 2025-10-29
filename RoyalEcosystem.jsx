import React from "react";
import { motion } from "framer-motion";

export default function RoyalEcosystem() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#10002b] via-[#240046] to-[#000] text-white px-6 py-10 overflow-x-hidden relative">
      {/* Royal glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-fuchsia-600/30 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 w-[250px] h-[250px] bg-yellow-400/20 blur-[180px] rounded-full"></div>
      </div>

      {/* Header */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3">
          The Royal Ecosystem
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
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
        className="text-center mb-20"
      >
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Economic Loop</h2>
        <div className="relative group">
          <img
            src="/economic-loop.png"
            alt="Economic Loop"
            className="mx-auto w-full max-w-lg rounded-xl shadow-lg border border-yellow-500/30 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-yellow-500/10 blur-lg transition-all duration-700"></div>
        </div>
        <p className="mt-4 text-sm text-gray-300 max-w-xl mx-auto">
          The continuous value cycle: investment, profit, buyback, and rewards — all return to strengthen AraQueen’s treasury.
        </p>
      </motion.section>

      {/* Real Economy */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center mb-20"
      >
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
          Real-Economy Value Flow
        </h2>
        <div className="relative group">
          <img
            src="/real economy.png"
            alt="Real-Economy Flow"
            className="mx-auto w-full max-w-3xl rounded-xl shadow-lg border border-purple-400/30 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-purple-500/20 blur-lg transition-all duration-700"></div>
        </div>
        <p className="mt-4 text-sm text-gray-300 max-w-xl mx-auto">
          Real-world investments in agriculture, energy, and technology fuel AraQueen’s ecosystem sustainability and stability.
        </p>
      </motion.section>

      {/* Core Utilities */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mb-20"
      >
        <h2 className="text-center text-2xl font-semibold mb-6 text-yellow-300">
          Core Utilities of the Kingdom
        </h2>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 grid md:grid-cols-2 gap-6 border border-yellow-400/30">
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
              className="p-4 bg-gradient-to-br from-[#3b0063] to-[#1b003a] rounded-xl shadow-md hover:shadow-yellow-400/20 transition-all"
            >
              <h3 className="text-lg font-bold text-yellow-300 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300">{item.desc}</p>
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
        className="text-center mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300">
          Structured Ecosystem
        </h2>
        <div className="relative group">
          <img
            src="/structured ecosystem.png"
            alt="Structured Ecosystem"
            className="mx-auto w-full max-w-2xl rounded-xl shadow-lg border border-yellow-500/30 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-yellow-400/20 blur-lg transition-all duration-700"></div>
        </div>
        <p className="mt-4 text-sm text-gray-300 max-w-xl mx-auto">
          A bonding-curve based economy ensures long-term growth, fair rewards, and a self-sustaining royal kingdom.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-xs mt-10">
        © {new Date().getFullYear()} AraQueen Ecosystem — Bridging Digital &
        Real-World Prosperity.
      </footer>
    </main>
  );
}
