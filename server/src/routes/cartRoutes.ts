import express from "express";
const router = express.Router();
import { getCart, saveCart } from "../controllers/cartController";
import requireAuth from "../utils/requireAuth";

router.patch("/", requireAuth, saveCart);

router.get("/", requireAuth, getCart);

export default router;
