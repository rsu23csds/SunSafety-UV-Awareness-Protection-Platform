import UVRecord from "../models/uvrecords.js";

// Save UV data
export const saveUV = async (req, res) => {
  try {
    const record = await UVRecord.create(req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get history
export const getUVHistory = async (req, res) => {
  try {
    const history = await UVRecord.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
