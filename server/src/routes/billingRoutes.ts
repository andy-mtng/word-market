import express from "express";
import { createCheckoutSession } from "../controllers/billingController";
// import requireAuth from "../utils/requireAuth";
const router = express.Router();

router.post("/", createCheckoutSession);

export default router;
