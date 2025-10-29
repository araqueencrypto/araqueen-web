export default function JoinCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-center">
      <div className="max-w-5xl mx-auto px-6">
        <h3 className="text-3xl font-bold mb-3">Join the Royal Court 👑</h3>
        <p className="mb-8 text-lg text-white/90">
          Become a noble citizen of AraQueen — join our community and shape the future of the kingdom.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://discord.gg/jBPwnm4w" // 👉 isi link Discord kamu di sini
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/20 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300"
          >
            Join Discord
          </a>
          <a
            href="https://x.com/Araqueencrypto" // 👉 isi link X (Twitter) kamu di sini
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-white/50 rounded-full font-semibold hover:bg-white hover:text-yellow-600 transition-all duration-300"
          >
            Follow on X
          </a>
        </div>
      </div>
    </section>
  );
}
