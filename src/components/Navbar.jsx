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

  const handleLaunchClick = () => {
    alert(
      "🛠️ AraQueen App is under development. Join our community to be notified when it's live!"
    );
  };

  return (
    <nav className="fixed top-[38px] left-0 right-0 z-50 bg-transparent border-none shadow-none backdrop-blur-0 transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-8 py-2 sm:py-3 md:py-4 max-w-7xl mx-auto">
        {/* LOGO */}
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src="/araqueen-mascotlogo001.png"
            alt="AraQueen Logo"
            className="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />
          <span className="font-bold text-base md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300 drop-shadow-[0_0_3px_rgba(0,0,0,0.5)]">
            AraQueen
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-sm font-medium text-white hover:text-yellow-300 transition-all scroll-smooth drop-shadow-[0_0_3px_rgba(0,0,0,0.6)]"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={handleLaunchClick}
            className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-2 py-1 text-white text-sm font-semibold shadow-md hover:shadow-yellow-400/40 transition-all"
          >
            Launch App
          </button>
        </div>

        {/* MOBILE MENU ICON */}
        <button
          className="bg-clip-text bg-gradient-to-r black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm animate-fadeInDown">
          <div className="flex flex-col items-center py-3 space-y-3">
            {menuItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-white hover:text-yellow-300 transition-all"
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