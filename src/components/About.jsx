import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-purple-950 text-center px-6">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-yellow-400 mb-6"
      >
        About The AraQueen
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed"
      >
        AraQueen is not just a meme — it’s a movement. Born from the laughter of
        the digital realm, she commands an army of loyal cats, dogs, and royal
        jesters who bring joy and unity to the crypto world.
      </motion.p>
    </section>
  );
}
