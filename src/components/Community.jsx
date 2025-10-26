import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Crown } from "lucide-react";

export default function Community() {
  const features = [
    { icon: <Crown size={36} />, title: "Royal NFTs", desc: "Collect rare royal creatures of AraQueen’s court." },
    { icon: <Heart size={36} />, title: "Kindred Spirits", desc: "A friendly community that grows together." },
    { icon: <Users size={36} />, title: "The Kingdom", desc: "Join the kingdom’s meme revolution." },
  ];

  return (
    <section className="py-24 bg-black text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-yellow-400 mb-12"
      >
        The Royal Community
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-purple-900/30 border border-purple-700 rounded-2xl p-8 hover:shadow-xl hover:shadow-yellow-400/30 transition-all"
          >
            <div className="flex justify-center mb-4 text-yellow-400">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-300 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
