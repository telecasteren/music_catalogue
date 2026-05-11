import express from "express";
import cors from "cors";
import "dotenv/config";
import albumRoutes from "./routes/albums";
import wishlistRoutes from "./routes/wishlist";

const app = express();
// const PORT = 4000;
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());
app.use("/albums", albumRoutes);
app.use("/wishlist", wishlistRoutes);
app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
