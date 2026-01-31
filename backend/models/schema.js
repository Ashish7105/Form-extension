import mongoose from "mongoose";
const dynamicSchema = new mongoose.Schema(
  {
    data: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export const DynamicModel = mongoose.model("DynamicModel", dynamicSchema);