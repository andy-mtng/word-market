import express from "express";
import { createCheckoutSession, handleCheckoutCompletion } from "../controllers/billingController";
import requireAuth from "../utils/requireAuth";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/", requireAuth, createCheckoutSession);

router.post(
    "/checkout-completion",
    bodyParser.raw({ type: "application/json" }),
    handleCheckoutCompletion
);

export default router;
