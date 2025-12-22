import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ROUTES
import { FetchCollection } from "./FetchCollection.js";
import nftRoutes from "./routes/nfts.js";
import collectionRoutes from "./routes/collections.js";

// =======================
// INIT
// =======================
dotenv.config();

const app = express(); // WAJIB PALING AWAL

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================
// CORS (PRODUCTION SAFE)
// =======================
const allowedOrigins = [
  // Local dev (SEMUA kemungkinan)
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:8080",
  "http://127.0.0.1:8080",

  // Vercel default
  "https://araqueen.vercel.app",

  // Custom domains
  "https://araqueencrypto.com",
  "https://www.araqueencrypto.com"
];


app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server, curl, health checks
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("❌ CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

// =======================
// INIT DATA
// =======================
await FetchCollection();

// =======================
// STATIC FILES
// =======================
app.use("/collections", express.static(path.join(__dirname, "collections")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/collections", collectionRoutes);

// =======================
// API ROUTES
// =======================
app.use("/api/nfts", nftRoutes);

// Health check (optional but recommended)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AraQueen Backend",
    time: new Date().toISOString()
  });
});

// =======================
// ROOT ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("🟢 AraQueen Backend is running...");
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
