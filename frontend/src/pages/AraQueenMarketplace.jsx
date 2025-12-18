import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Menu, User2, X } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export default function AraQueenMarketplace() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const active = location.pathname.split("/")[2] || "gallery";

  const navItems = [
    { key: "gallery", label: "NFT Gallery", to: "/marketplace/gallery" },
    { key: "collections", label: "Collections", to: "/marketplace/collections" },
    { key: "whitelist", label: "Whitelist", to: "/marketplace/whitelist" }
  ];

  return (
    <section className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 glass-heavy border-b shadow-1">
        <div className="flex justify-between items-center px-6 py-3 max-w-[1600px] mx-auto">

          <div className="flex items-center gap-4">
            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu size={26} className="text-[var(--fg)]" />
            </button>

            <h1 className="text-lg font-extrabold grad-aura-text">
              AraQueen Market
            </h1>

            <nav className="hidden lg:flex items-center gap-6 ml-8">
              {navItems.map((n) => (
                <Link
                  key={n.key}
                  to={n.to}
                  className={`pb-1 text-sm relative transition ${
                    active === n.key
                      ? "text-[var(--brand-a)] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-[var(--brand-a)]"
                      : "text-gray-500 hover:text-[var(--brand-a)] dark:text-gray-400 dark:hover:text-[var(--brand-a)]"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full bg-[var(--glass-bg)] border hover:shadow-focus">
              <User2 size={18} className="text-[var(--brand-a)]" />
            </button>

            <WalletMultiButton className="!rounded-full !px-4 !py-2 grad-aura !text-white !border-none" />
          </div>

        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex max-w-[1600px] mx-auto">

        {/* LEFT */}
        <aside className="hidden lg:block w-64 p-4 sticky top-[90px]">
          <div className="glass shadow-1 border rounded-2xl p-4 slide-right">
            <LeftPanel />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 py-6">

          {/* FIX — remove glass for NFT containers */}
          <div className="rounded-2xl p-6 min-h-[80vh] border shadow-1 bg-[var(--card-bg)]">
            <Outlet />
          </div>

        </main>

        {/* RIGHT */}
        <aside className="hidden xl:block w-72 p-4 sticky top-[90px]">
          <div className="glass shadow-1 border rounded-2xl p-4 slide-left">
            <RightPanel />
          </div>
        </aside>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex">

          <div className="w-64 bg-[var(--card-bg)] h-full shadow-2xl p-6 slide-right">
            <button className="mb-6" onClick={() => setMenuOpen(false)}>
              <X size={26} className="text-[var(--fg)]" />
            </button>

            <div className="flex flex-col gap-4">
              {navItems.map((n) => (
                <Link
                  key={n.key}
                  to={n.to}
                  className={`p-2 rounded-lg ${
                    active === n.key
                      ? "grad-aura text-white shadow-focus"
                      : "hover:bg-[var(--glass-bg)]"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>

          <div onClick={() => setMenuOpen(false)} className="flex-1"></div>
        </div>
      )}

    </section>
  );
}
