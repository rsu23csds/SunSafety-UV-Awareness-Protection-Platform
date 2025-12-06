import mongoose from "mongoose";

const UVRecordSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  uvIndex: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UVRecord", UVRecordSchema);
