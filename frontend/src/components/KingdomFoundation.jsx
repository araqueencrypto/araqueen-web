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
    <main className="relative min-h-screen bg-gradient-to-b from-white via-pink-50 to-yellow-50 text-gray-800 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-[260px] h-[260px] bg-pink-300/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 w-[220px] h-[220px] bg-yellow-200/20 blur-[100px] rounded-full"></div>
      </div>

      {/* Section: Kingdom Lore */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-16 px-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          The Birth of the AraQueen Kingdom
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          AraQueen transforms meme culture into a real-world economic kingdom — 
          funding agriculture, energy, and technology to return value to its citizens.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[ 
            { title: "Vision", desc: "A meme token that funds reality and builds sustainable projects." },
            { title: "Mission", desc: "Create profit loops returning to the ecosystem via buybacks, burns, and treasury." },
            { title: "Values", desc: "Transparency, community, sustainability, and fun." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 border border-pink-100 rounded-2xl p-6 shadow-sm backdrop-blur-sm hover:shadow-md hover:shadow-pink-200/40 transition-all"
            >
              <h3 className="text-xl font-semibold text-pink-600 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
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
        className="relative py-16 px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
          The Royal Classes of AraQueen 👑
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
          Each class holds a sacred duty within the AraQueen Kingdom. Together, they uphold 
          the balance between meme spirit, innovation, and the real-world economy.
        </p>

        {/* 🔹 Gambar dan Deskripsi Sejajar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {classes.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:shadow-pink-200/40 transition-all flex flex-col items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative group w-full flex justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-24 h-24 object-contain rounded-full transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,200,200,0.2)]"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-pink-100/30 blur-md rounded-full transition-all duration-700"></div>
              </div>
              <h3 className="text-lg font-semibold text-pink-600 mt-4 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16 w-48 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 italic">
          “Where every role strengthens the Queen’s realm.”
        </p>
      </motion.section>

      {/* Bottom soft transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-pink-100 to-pink-200/40 pointer-events-none"></div>
    </main>
  );
}
