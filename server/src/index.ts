import express from "express";
import cors from "cors";
import albumRoutes from "./routes/albums";
import "dotenv/config";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/albums", albumRoutes);
app.get("health", (_, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
