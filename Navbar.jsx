import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "Kingdom", href: "#foundation" },
    { name: "Journey", href: "#journey" },
    { name: "Ecosystem", href: "#ecosystem" },
    { name: "Join", href: "#join" },
  ];

  // 🔹 Fungsi untuk menampilkan pesan saat Launch App diklik
  const handleLaunchClick = () => {
    alert(
      "🛠️ The AraQueen Kingdom ecosystem app is currently under development to facilitate token purchases, staking, progress updates, and more.\n\nJoin our community and we’ll notify you once the app is ready!"
    );
  };

  return (
    <nav className="fixed top-[38px] left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-7xl mx-auto">
        {/* LOGO */}
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src="/araqueen-mascotlogo001.png"
            alt="AraQueen Logo"
            className="w-8 h-8 md:w-10 md:h-10 drop-shadow-sm"
          />
          <span className="font-bold text-base md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-400">
            AraQueen
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-sm font-medium text-gray-800 hover:text-pink-500 transition-all scroll-smooth"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={handleLaunchClick}
            className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-4 py-1.5 text-white text-sm font-semibold shadow-md hover:shadow-yellow-400/40 transition-all"
          >
            Launch App
          </button>
        </div>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-pink-500 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-pink-100 shadow-lg animate-fadeInDown">
          <div className="flex flex-col items-center py-3 space-y-3">
            {menuItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-all"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                handleLaunchClick();
              }}
              className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-5 py-2 text-white text-sm font-semibold shadow-md hover:shadow-yellow-400/40 transition-all"
            >
              Launch App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
