import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { DynamicModel } from "./models/schema.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/form-events", (req, res) => {
  console.log("📥 GOOGLE FORM DATA");
  console.log(JSON.stringify(req.body, null, 2));
  const dynamic = new DynamicModel({ data: req.body });
  dynamic.save()
    .then(() => {
      console.log("💾 Data saved to MongoDB");
      res.json({ success: true });
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Failed to save data" });
    });
});

app.listen(4000, () =>
  console.log(`🚀 API running on http://localhost:4000`)
);
