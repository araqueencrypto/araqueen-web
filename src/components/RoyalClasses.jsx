import { motion } from "framer-motion";

export default function RoyalClasses() {
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
    <section
      id="royalclasses"
      className="relative py-32 bg-gradient-to-b from-[#fff8fb] to-[#fff6ff] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">
          The Royal Classes of AraQueen 👑
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16">
          Each class holds a sacred duty within the AraQueen Kingdom. Together,
          they uphold the balance between the meme spirit and the real-world
          economy.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {classes.map((item, i) => (
            <motion.div
              key={i}
              className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-pink-100 shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-32 h-32 mx-auto object-contain mb-4 drop-shadow-[0_0_20px_rgba(255,200,240,0.4)]"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* efek kabut di bawah */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
