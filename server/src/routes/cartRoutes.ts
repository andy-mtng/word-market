import express from "express";
const router = express.Router();
import { saveCart } from "../controllers/cartController";
import requireAuth from "../utils/requireAuth";

router.patch("/", saveCart);

export default router;
