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

const allowedOrigins = [
  "http://localhost:5173",
  "https://vercel.com/araqueencryptos-projects/araqueencryptoofficialwebsite/5hprfa3vpsvyAbtPhugmpwS2ZWuw" // domain FE kamu
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));



process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // don't exit — log and continue (for dev). Consider process.exit(1) in production.
});


//ROUTES 002----core txh

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
await FetchCollection();

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));


// 🔹 Serve static files
app.use("/collections", express.static(path.join(__dirname, "collections")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/collections", collectionRoutes);

// 🔹 API Routes
app.use("/api/nfts", nftRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend connected",
    time: new Date().toISOString()
  });
});

// 🔹 Root Route
app.get("/", (req, res) => {
  res.send("🟢 AraQueen Backend is running...");
});

app.get("/nfts", async (req, res) => {
      const data = await fetchAllCollectionsNFTs();
      res.json(data);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);

});