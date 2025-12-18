// main.jsx

import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Wallet Adapter Core
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// Wallets (STABLE ONLY)
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
  
  // Devnet RPC
  const endpoint = "https://api.devnet.solana.com";

  // Stable auto-detected multi-wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
            <Routes>
              {/* Home */}
              <Route path="/" element={<App />} />

              {/* Marketplace Parent */}
              <Route path="/marketplace/*" element={<AraQueenMarketplace />}>
                <Route index element={<Navigate to="gallery" replace />} />
                <Route path="gallery" element={<NFTGallery />} />
                <Route path="nft/:id" element={<NFTDetailPage />} />
                <Route path="collections" element={<Collections />} />
                <Route path="whitelist" element={<Whitelist />} />
              </Route>

              {/* Specific Collection */}
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

// Render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
