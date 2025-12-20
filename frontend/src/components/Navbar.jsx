import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "Foundation", href: "#foundation" },
    { name: "Marketplace-DevNet", href: "/Marketplace", external: true },
  ];

  return (
    <nav className="fixed top-[38px] left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div
          className="grid grid-cols-3 items-center h-14 md:h-16
          bg-black/30 backdrop-blur-md rounded-full
          border border-white/10 shadow-[0_0_30px_rgba(180,120,255,0.15)]"
        >
          {/* LEFT — LOGO */}
          <div className="flex items-center gap-2 pl-4">
            <img
              src="/favicon.png"
              alt="AraQueen Logo"
              className="w-8 h-8 drop-shadow-[0_0_8px_rgba(200,120,255,0.8)]"
            />
            <span className="font-bold text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-400">
              AraQueen
            </span>
          </div>

          {/* CENTER — MENU (DESKTOP) */}
          <div className="hidden md:flex justify-center gap-8">
            {menuItems.map((item, i) =>
              item.external ? (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white/80 hover:text-violet-300 transition"
                >
                  {item.name}
                </a>
              ) : (
                <a
                  key={i}
                  href={item.href}
                  className="text-sm font-medium text-white/80 hover:text-violet-300 transition"
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* RIGHT — CTA / MOBILE MENU */}
          <div className="flex justify-end items-center pr-4">
            {/* Desktop CTA */}
            <a
              href="#footer"
              className="hidden md:inline-flex px-4 py-2 rounded-full text-sm font-semibold
              bg-gradient-to-r from-violet-300 via-fuchsia-400 to-amber-300 text-black
              shadow-[0_0_18px_rgba(200,120,255,0.5)]
              hover:scale-105 transition-transform"
            >
              Join
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden mt-3 mx-4 rounded-2xl bg-black/80 backdrop-blur-lg border border-white/10">
          <div className="flex flex-col items-center py-4 space-y-4">
            {menuItems.map((item, i) =>
              item.external ? (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-white/80 hover:text-violet-300"
                >
                  {item.name}
                </a>
              ) : (
                <a
                  key={i}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-white/80 hover:text-violet-300"
                >
                  {item.name}
                </a>
              )
            )}
            <a
              href="#footer"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-full text-sm font-semibold
              bg-gradient-to-r from-violet-300 to-fuchsia-400 text-black"
            >
              Join Community
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
