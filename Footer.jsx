export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-pink-50 pt-12 pb-6 border-t border-pink-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* 🏰 Brand */}
        <div>
          <h4 className="text-xl font-bold text-pink-600 mb-3">AraQueen</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            A Kingdom where <span className="font-semibold text-yellow-600">Meme</span> meets{" "}
            <span className="font-semibold text-pink-500">Meaning</span>. <br />
            Built for dreamers, believers, and builders of the new digital realm.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h5 className="text-lg font-semibold text-pink-600 mb-3">Navigation</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#hero" className="hover:text-pink-500 transition">Home</a>
            </li>
            <li>
              <a href="#journey" className="hover:text-pink-500 transition">Market</a>
            </li>
            <li>
              <a href="#about" className="hover:text-pink-500 transition">About</a>
            </li>
            <li>
              <a href="#roadmap" className="hover:text-pink-500 transition">Roadmap</a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1-ctfdkHzcajUvy9IPueCkOYop7N7nqSh/view" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition">Whitepaper</a>
            </li>
          </ul>
        </div>

        {/* 🌐 Socials */}
        <div>
          <h5 className="text-lg font-semibold text-pink-600 mb-3">Community</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://discord.gg/jBPwnm4w" // 👉 isi link Discord kamu di sini
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Araqueencrypto" // 👉 isi link X kamu di sini
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                X (Twitter)
              </a>
            </li>
            <li>
                <a
                href="https://www.instagram.com/araqueencrypto?utm_source=qr&igsh=ZHppZ2U5Zjl3cXh4" // 👉 isi link X kamu di sini
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                Instagram
              </a>
            </li>

            <li>
                <a
                href="https://t.me/Araqueencrypto" // 👉 isi link X kamu di sini
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                Telegram
              </a>
            </li>

            <li>
              <a
                href="https://pump.fun/coin/7rJdmuRH3rBYj6cCCfzn2idkPtcRKiTofsZgMbV1pump"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                Pump.fun
              </a>
            </li>
            <li>
              <a
                href="https://boop.fun/tokens/LX9Sqe3wMdSUU8h5555m3kc9tupwzs4prF2HGAfboop"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                Boop.fun
              </a>
            </li>
          </ul>
        </div>

        {/* 💌 Contact */}
        <div>
          <h5 className="text-lg font-semibold text-pink-600 mb-3">Contact</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:info@araqueen.com" className="hover:text-pink-500 transition">
                mailto : araqueencrypto@gmail.com
              </a>
            </li>
            <li>
              <a href="#partnership" className="hover:text-pink-500 transition">
                Partnership
              </a>
            </li>
            <li>
              <a href="#team" className="hover:text-pink-500 transition">
                Our Team
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 pt-6 border-t border-pink-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-pink-600">AraQueen</span> • A Kingdom Where Meme & Meaning Become One.
      </div>
    </footer>
  );
}
