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
    { key: "whitelist", label: "Whitelist", to: "/marketplace/whitelist" },
  ];

  return (
    <section className="min-h-screen bg-[var(--bg)] text-[var(--fg)] overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 glass-heavy border-b shadow-1">
        <div
          className="
            flex justify-between items-center
            h-14 sm:h-16
            px-3 sm:px-6
            max-w-[1600px] mx-auto
          "
        >
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-base sm:text-lg font-extrabold grad-aura-text leading-none">
              AraQueen Market
            </h1>

            <nav className="hidden lg:flex items-center gap-6 ml-8">
              {navItems.map((n) => (
                <Link
                  key={n.key}
                  to={n.to}
                  className={`pb-1 text-sm transition relative ${
                    active === n.key
                      ? "text-[var(--brand-a)] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-[var(--brand-a)]"
                      : "text-gray-400 hover:text-[var(--brand-a)]"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* WALLET BUTTON */}
            <WalletMultiButton
              className="
                !h-9 sm:!h-10
                !px-3 sm:!px-4
                !text-sm
                !rounded-full
                grad-aura
                !text-white
                !border-none
                flex items-center justify-center
                whitespace-nowrap
              "
            />
          </div>
        </div>
      </header>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex max-w-[1600px] mx-auto">

        {/* LEFT PANEL */}
        <aside className="hidden lg:block w-64 p-4 sticky top-[80px]">
          <div className="glass border rounded-2xl p-4">
            <LeftPanel />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-2 sm:px-4 py-4 sm:py-6">
          <div className="rounded-2xl p-3 sm:p-6 min-h-[80vh] border shadow-1 bg-[var(--card-bg)]">
            <Outlet />
          </div>
        </main>

        {/* RIGHT PANEL */}
        <aside className="hidden xl:block w-72 p-4 sticky top-[80px]">
          <div className="glass border rounded-2xl p-4">
            <RightPanel />
          </div>
        </aside>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex">
          <div className="w-64 bg-[var(--card-bg)] h-full p-6">
            <button
              className="mb-6"
              onClick={() => setMenuOpen(false)}
            >
              <X size={26} />
            </button>

            <div className="flex flex-col gap-3">
              {navItems.map((n) => (
                <Link
                  key={n.key}
                  to={n.to}
                  onClick={() => setMenuOpen(false)}
                  className={`p-2 rounded-lg ${
                    active === n.key
                      ? "grad-aura text-white"
                      : "hover:bg-[var(--glass-bg)]"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            onClick={() => setMenuOpen(false)}
            className="flex-1"
          />
        </div>
      )}
    </section>
  );
}
