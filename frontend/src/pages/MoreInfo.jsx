import { motion } from "framer-motion";

export default function MoreInfo() {
  const infos = [
    { title: "📘 Documentation", desc: "Learn how AraQueen NFT Marketplace works.", link: "https://docs.araqueen.dev" },
    { title: "🧩 Version", desc: "Current build: v1.0.0 (Dev Mode)", link: "#" },
    { title: "💬 Community", desc: "Join AraQueen community for updates and events.", link: "https://discord.gg" },
    { title: "🛡️ License", desc: "All rights reserved © AraQueen Labs 2025", link: "#" },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-pink-600">⚙️ More Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {infos.map((info, i) => (
          <motion.a
            key={i}
            href={info.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all block"
          >
            <h3 className="font-semibold text-pink-600">{info.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{info.desc}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
