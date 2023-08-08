import express from "express";
const router = express.Router();
import { createReview } from "../controllers/reviewController";
import requireAuth from "../utils/requireAuth";

router.post("/:bookId", requireAuth, createReview);

export default router;
