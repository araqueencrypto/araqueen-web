import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// folder collections
const COLLECTIONS_DIR = path.join(__dirname, "../collections");

router.get("/list", (req, res) => {
  try {
    if (!fs.existsSync(COLLECTIONS_DIR)) {
      return res.json({ success: true, collections: [] });
    }

    const folders = fs
      .readdirSync(COLLECTIONS_DIR)
      .filter((name) => {
        const full = path.join(COLLECTIONS_DIR, name);
        return fs.statSync(full).isDirectory();
      })
      .sort((a, b) => a.localeCompare(b)); // urut alfabet biar rapi

    return res.json({
      success: true,
      collections: folders,
    });
  } catch (err) {
    console.error("❌ /collections/list ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load collections",
    });
  }
});

export default router;
