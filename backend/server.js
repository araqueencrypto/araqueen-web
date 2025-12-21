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

const app = express(); // ✅ HARUS PALING AWAL

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================
// CORS
// =======================
const allowedOrigins = [
  "http://localhost:5173",
  "https://vercel.com/araqueencryptos-projects/araqueencryptoofficialwebsite/8NMF47k1uh8kmPn92ur4JsppE3Dd" // FE Vercel kamu
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

process.on("unhandledRejection", (reason, promise) => {
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

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend connected",
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
