import express from "express";
import { getOrders } from "../controllers/orderController";
import requireAuth from "../utils/requireAuth";
const router = express.Router();

router.get("/", requireAuth, getOrders);

export default router;
