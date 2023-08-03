import express from "express";
const router = express.Router();
import { getBooks, getBook, getPaginatedBooks } from "../controllers/bookController";

router.get("/", getBooks);

router.get("/page", getPaginatedBooks);

router.get("/:id", getBook);

export default router;
