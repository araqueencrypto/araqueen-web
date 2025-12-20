export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0b0012] via-[#12001f] to-[#06000a] text-white pt-20 pb-8 overflow-hidden">
      
      {/* Mystic Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full 
        bg-[radial-gradient(circle_at_center,rgba(180,120,255,0.25),transparent_65%)] blur-3xl" />

      {/* === JOIN CTA (Integrated) === */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 mb-20 text-center">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-400 to-amber-300">
            Become Part of the AraQueen Community
          </span>
        </h3>
        <p className="max-w-2xl mx-auto text-white/75 text-sm md:text-base leading-relaxed mb-8">
          AraQueen grows through shared joy, creativity, and participation. 
          Join the community and help transform positive energy into real-world 
          impact for people and the planet.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://discord.gg/jBPwnm4w"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-semibold text-black
            bg-gradient-to-r from-violet-300 via-fuchsia-400 to-amber-300
            shadow-[0_0_25px_rgba(200,120,255,0.5)]
            hover:scale-105 transition-transform"
          >
            Join Discord
          </a>

          <a
            href="https://x.com/Araqueencrypto"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full font-semibold text-white border border-white/40
            hover:bg-white hover:text-black transition-all"
          >
            Follow on X
          </a>
        </div>
      </div>

      {/* === FOOTER CONTENT === */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Brand */}
        <div>
          <h4 className="text-xl font-bold mb-3 text-violet-300">AraQueen</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            A community-driven ecosystem where shared happiness and creativity
            grow into meaningful value and positive impact.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="text-lg font-semibold mb-3 text-fuchsia-300">Navigation</h5>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Whitepaper
              </a>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h5 className="text-lg font-semibold mb-3 text-fuchsia-300">Community</h5>
          <ul className="space-y-2 text-sm text-white/75">
            <li><a href="https://discord.gg/jBPwnm4w" target="_blank" rel="noopener noreferrer" className="hover:text-white">Discord</a></li>
            <li><a href="https://x.com/Araqueencrypto" target="_blank" rel="noopener noreferrer" className="hover:text-white">X (Twitter)</a></li>
            <li><a href="https://www.instagram.com/araqueencrypto" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
            <li><a href="https://t.me/Araqueencrypto" target="_blank" rel="noopener noreferrer" className="hover:text-white">Telegram</a></li>
            <li><a href="https://pump.fun/profile/araqueencrypto?tab=coins" target="_blank" rel="noopener noreferrer" className="hover:text-white">Pump.fun</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-lg font-semibold mb-3 text-fuchsia-300">Contact</h5>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <a href="mailto:araqueencrypto@gmail.com" className="hover:text-white">
                araqueencrypto@gmail.com
              </a>
            </li>
            <li><a href="#partnership" className="hover:text-white">Partnership</a></li>
            <li><a href="#team" className="hover:text-white">Our Team</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 mt-16 pt-6 border-t border-white/10 text-center text-sm text-white/50">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-violet-300">AraQueen</span> — 
        Building value from shared happiness. v003.25
      </div>
    </footer>
  );
}
