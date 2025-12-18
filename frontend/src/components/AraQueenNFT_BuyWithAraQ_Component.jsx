/**
 * AraQueenNFT — React component for Solana wallet + Buy button
 * Connects to Phantom wallet and interacts with your smart contract:
 * Program ID: CQnBRhYh91T5MXu8JFuFVauwJdJfiVNZBYxpfaweEUZ3
 */

import React, { useMemo, useCallback, useState } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const PROGRAM_ID = new PublicKey(
  "CQnBRhYh91T5MXu8JFuFVauwJdJfiVNZBYxpfaweEUZ3"
);
const LAMPORTS_PER_SOL = 1_000_000_000;
const FULL_PRICE_SOL = 0.01; // Harga contoh, bisa disesuaikan
const priceLamports = Math.round(FULL_PRICE_SOL * LAMPORTS_PER_SOL);

function makeBuyInstruction(buyerPubkey) {
  const keys = [
    { pubkey: buyerPubkey, isSigner: true, isWritable: true },
  ];

  // Contoh data: [instruction_index (u8), price (u64 little-endian)]
  const instructionIndex = 0;
  const data = Buffer.alloc(9);
  data.writeUInt8(instructionIndex, 0);
  let p = BigInt(priceLamports);
  for (let i = 0; i < 8; i++) {
    data[1 + i] = Number((p >> BigInt(8 * i)) & 0xffn);
  }

  return new TransactionInstruction({
    keys,
    programId: PROGRAM_ID,
    data,
  });
}

export default function BuyWithAraQButton() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const [busy, setBusy] = useState(false);

  const discountedLamports = Math.round(priceLamports * 0.9);

  const onBuy = useCallback(async () => {
    if (!publicKey) return alert("Please connect your Phantom wallet first.");

    setBusy(true);
    try {
      const tx = new Transaction();

      // Tambahkan instruksi pembelian ke program
      const buyIx = makeBuyInstruction(publicKey);
      tx.add(buyIx);

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature, "confirmed");

      alert("✅ Purchase sent! Signature: " + signature);
    } catch (err) {
      console.error(err);
      alert("Transaction failed: " + (err?.message ?? err));
    } finally {
      setBusy(false);
    }
  }, [publicKey, sendTransaction, connection]);

  return (
    <div className="p-3 rounded-xl bg-white/70 border border-pink-200 w-full max-w-xs text-center shadow-sm">
      <WalletMultiButton className="mb-3 w-full" />
      <button
        onClick={onBuy}
        disabled={!connected || busy}
        className={`w-full py-2 rounded-lg font-semibold ${
          !connected ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg"
        }`}
        style={{ background: "#7c3aed", color: "white" }}
      >
        {busy ? "Processing…" : "Buy with $AraQ (10% OFF)"}
      </button>
      {!connected && (
        <p className="mt-2 text-xs text-gray-500">
          Connect your Phantom wallet to continue.
        </p>
      )}
    </div>
  );
}
