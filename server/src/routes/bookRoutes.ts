import express from "express";
const router = express.Router();
import { getBooks } from "../controllers/bookController";

router.get("/", getBooks);

export default router;
