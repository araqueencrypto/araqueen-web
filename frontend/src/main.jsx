// main.jsx
import { Buffer } from "buffer";
window.Buffer = Buffer;

import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Solana Wallet Core
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// Wallet Adapters (CLEAN & SAFE)
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";

// Pages
import App from "./App.jsx";
import AraQueenMarketplace from "./pages/AraQueenMarketplace.jsx";
import NFTGallery from "./pages/NFTGallery.jsx";
import Collections from "./pages/List_collections.jsx";
import Whitelist from "./pages/Whitelist.jsx";
import CollectionPage from "./pages/collections_pages/CollectionPage.jsx";
import NFTDetailPage from "./pages/collections_pages/NFTDetailPage.jsx";

// Styles
import "./index.css";
import "@solana/wallet-adapter-react-ui/styles.css";

function RootApp() {
  // ✅ Devnet RPC
  const endpoint = "https://api.devnet.solana.com";

  /**
   * 🔥 IMPORTANT FIX:
   * - Wallet adapters can overlap (Phantom, Ledger, MetaMask injection)
   * - React Wallet Modal uses wallet.name as key
   * - We MUST deduplicate by wallet.name
   */
  const wallets = useMemo(() => {
    const list = [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
    ];

    // ✅ DEDUPLICATE WALLET NAMES (FIX MetaMask key collision)
    return list.filter(
      (wallet, index, self) =>
        index === self.findIndex((w) => w.name === wallet.name)
    );
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
            <Routes>
              {/* Home */}
              <Route path="/" element={<App />} />

              {/* Marketplace Layout */}
              <Route path="/marketplace/*" element={<AraQueenMarketplace />}>
                <Route index element={<Navigate to="gallery" replace />} />
                <Route path="gallery" element={<NFTGallery />} />
                <Route path="nft/:id" element={<NFTDetailPage />} />
                <Route path="collections" element={<Collections />} />
                <Route path="whitelist" element={<Whitelist />} />
              </Route>

              {/* Collection Detail */}
              <Route
                path="/marketplace/collection/:collectionName"
                element={<CollectionPage />}
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

// Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
