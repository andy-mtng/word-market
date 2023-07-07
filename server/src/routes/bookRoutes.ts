import express from "express";
const router = express.Router();
import { getBooks, getBook } from "../controllers/bookController";

router.get("/", getBooks);

router.get("/:id", getBook);

export default router;
