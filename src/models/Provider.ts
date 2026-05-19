import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  services: [String],

  monthlyQuota: {
    type: Number,
    default: 10,
  },

  usedQuota: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Provider ||
  mongoose.model("Provider", ProviderSchema);