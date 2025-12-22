import express from "express";
import db from "../database/db.js";

const router = express.Router();

/**
 * GET ALL NFTS
 * /api/nfts
 */
router.get("/", (req, res) => {
  try {
    const rows = db
      .prepare(`
        SELECT * 
        FROM nfts 
        ORDER BY collection, nft_index
      `)
      .all();

    return res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("❌ Error GET /api/nfts:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch NFTs",
    });
  }
});

/**
 * GET NFT DETAIL
 * /api/nfts/:idOrMint
 * - support numeric ID
 * - support mint_address (Solana)
 */
router.get("/:idOrMint", (req, res) => {
  try {
    const { idOrMint } = req.params;

    // Normalisasi: trim & pastikan string
    const value = String(idOrMint).trim();

    let row = null;

    // 1️⃣ Jika numeric, coba cari by ID
    if (!isNaN(value)) {
      row = db
        .prepare("SELECT * FROM nfts WHERE id = ?")
        .get(Number(value));
    }

    // 2️⃣ Jika belum ketemu, coba cari by mint_address
    if (!row) {
      row = db
        .prepare("SELECT * FROM nfts WHERE mint_address = ?")
        .get(value);
    }

    // 3️⃣ Jika tetap tidak ada
    if (!row) {
      return res.status(404).json({
        success: false,
        message: "NFT not found",
      });
    }

    return res.json({
      success: true,
      data: row,
    });
  } catch (err) {
    console.error("❌ Error GET /api/nfts/:idOrMint:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch NFT detail",
    });
  }
});

export default router;
