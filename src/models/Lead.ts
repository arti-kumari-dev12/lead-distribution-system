import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: String,

  phone: String,

  city: String,

  service: String,

  description: String,
});

LeadSchema.index(
  {
    phone: 1,
    service: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.Lead ||
  mongoose.model("Lead", LeadSchema);