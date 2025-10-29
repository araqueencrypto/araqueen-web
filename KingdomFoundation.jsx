import React from "react";
import { motion } from "framer-motion";

export default function KingdomFoundation() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const classes = [
    {
      title: "The Nobles",
      desc: "Guardians of wealth and builders of the realm — investors and innovators shaping the Queen’s economy.",
      img: "/the noble.png",
    },
    {
      title: "The Citizens",
      desc: "The loyal holders and daily dreamers — the heart of the kingdom’s laughter and life.",
      img: "/the citizens.png",
    },
    {
      title: "The Knights",
      desc: "Bridging blockchain and reality — real-world partners ensuring sustainable prosperity.",
      img: "/the knights.png",
    },
    {
      title: "The Council",
      desc: "The wise voices of governance — guiding the Queen’s decree with honor and logic.",
      img: "/the council.png",
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#10002b] via-[#2a0046] to-[#000] text-white overflow-hidden">
      {/* Royal glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-fuchsia-600/30 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-yellow-400/20 blur-[180px] rounded-full"></div>
      </div>

      {/* Section: Kingdom Lore */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-20 px-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
          The Birth of the AraQueen Kingdom
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          AraQueen transforms meme culture into a real-world economic kingdom — 
          funding agriculture, energy, and technology to return value to its citizens.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Vision",
              desc: "A meme token that funds reality and builds sustainable projects.",
            },
            {
              title: "Mission",
              desc: "Create profit loops returning to the ecosystem via buybacks, burns, and treasury.",
            },
            {
              title: "Values",
              desc: "Transparency, community, sustainability, and fun.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 border border-yellow-400/20 rounded-2xl p-6 shadow-lg backdrop-blur-sm hover:shadow-yellow-400/20 transition-all"
            >
              <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Section: Royal Classes */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative py-28 px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-6">
          The Royal Classes of AraQueen 👑
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-16 text-sm md:text-base">
          Each class holds a sacred duty within the AraQueen Kingdom. Together, they uphold 
          the balance between meme spirit, innovation, and the real-world economy.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {classes.map((item, i) => (
            <motion.div
              key={i}
              className="relative bg-gradient-to-br from-[#2a0055]/80 to-[#1b003a]/80 backdrop-blur-xl rounded-2xl p-6 border border-yellow-200/20 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-32 h-32 mx-auto object-contain mb-4 drop-shadow-[0_0_20px_rgba(255,200,240,0.4)]"
                />
              </div>
              <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* subtle fog animation at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-purple-900/60 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.section>

      
    </main>
  );
}
