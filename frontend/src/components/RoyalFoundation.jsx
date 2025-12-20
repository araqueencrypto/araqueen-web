import { motion } from "framer-motion";

export default function KingdomFoundation() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[#0b0012] via-[#12001f] to-[#06000a]">
      {/* Mystic Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full 
        bg-[radial-gradient(circle_at_center,rgba(180,120,255,0.25),transparent_65%)] blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-400 to-amber-300">
              Kingdom Foundation
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-white/75 text-sm md:text-base leading-relaxed">
            AraQueen is a community-driven ecosystem that transforms shared joy,
            creativity, and participation into real-world value — supporting
            social well-being, sustainable initiatives, and positive impact for
            people and the planet.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6
            hover:border-violet-400/40 transition-colors"
          >
            <h3 className="text-xl font-bold mb-3 text-violet-300">Vision</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              To become a living ecosystem where collective happiness creates
              sustainable value for society and the Earth.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6
            hover:border-fuchsia-400/40 transition-colors"
          >
            <h3 className="text-xl font-bold mb-3 text-fuchsia-300">Mission</h3>
            <ul className="text-white/80 text-sm space-y-2 leading-relaxed list-disc list-inside">
              <li>Transform community joy into meaningful participation</li>
              <li>Support social and environmental well-being</li>
              <li>Build an open and creative ecosystem</li>
              <li>Encourage responsible innovation</li>
            </ul>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6
            hover:border-amber-300/40 transition-colors"
          >
            <h3 className="text-xl font-bold mb-3 text-amber-300">Core Values</h3>
            <ul className="text-white/80 text-sm space-y-2 leading-relaxed">
              <li>• Community First</li>
              <li>• Positive Impact</li>
              <li>• Creativity & Freedom</li>
              <li>• Sustainability</li>
              <li>• Transparency</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
