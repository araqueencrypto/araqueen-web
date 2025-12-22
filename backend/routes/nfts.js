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
        SELECT * FROM nfts
        ORDER BY collection, nft_index
      `)
      .all();

    return res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    console.error("❌ GET /api/nfts error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch NFTs"
    });
  }
});

/**
 * GET NFT DETAIL
 * /api/nfts/:idOrMint
 * Support:
 * - numeric id
 * - mint_address (decoded & normalized)
 */
router.get("/:idOrMint", (req, res) => {
  try {
    let { idOrMint } = req.params;

    // 🔥 CRITICAL FIX: decode & normalize
    const value = decodeURIComponent(String(idOrMint)).trim();

    let nft = null;

    // 1️⃣ Try numeric ID
    if (!isNaN(value)) {
      nft = db
        .prepare("SELECT * FROM nfts WHERE id = ?")
        .get(Number(value));
    }

    // 2️⃣ Try mint_address (exact match)
    if (!nft) {
      nft = db
        .prepare("SELECT * FROM nfts WHERE mint_address = ?")
        .get(value);
    }

    // 3️⃣ Fallback: LIKE match (safety net)
    if (!nft) {
      nft = db
        .prepare("SELECT * FROM nfts WHERE mint_address LIKE ?")
        .get(`%${value}%`);
    }

    if (!nft) {
      return res.status(404).json({
        success: false,
        message: "NFT not found",
        debug: value
      });
    }

    return res.json({
      success: true,
      data: nft
    });

  } catch (err) {
    console.error("❌ GET /api/nfts/:idOrMint error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch NFT detail"
    });
  }
});

export default router;
