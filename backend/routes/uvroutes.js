import express from "express";
import { saveUV, getUVHistory } from "../controllers/uvcontroller.js";

const router = express.Router();

router.post("/save", saveUV);
router.get("/history", getUVHistory);

export default router;
