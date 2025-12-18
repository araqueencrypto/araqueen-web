import express from "express";
import db from "../database/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const rows = db
      .prepare("SELECT * FROM nfts ORDER BY collection, nft_index")
      .all();

    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error("❌ Error /api/nfts:", err);
    return res.status(500).json({ success: false });
  }
});

// GET detail NFT by mint_address or ID
router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;

    // Cari berdasarkan id AUTOINCREMENT atau mint_address
    const row = db
      .prepare(`
        SELECT * FROM nfts 
        WHERE id = ? OR mint_address = ?
      `)
      .get(id, id);

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
    console.error("❌ Error /api/nfts/:id", err);
    return res.status(500).json({ success: false });
  }
});


export default router;
