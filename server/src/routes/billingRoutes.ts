import express from "express";
import { createCheckoutSession } from "../controllers/billingController";
import requireAuth from "../utils/requireAuth";
const router = express.Router();

router.post("/", requireAuth, createCheckoutSession);

export default router;
