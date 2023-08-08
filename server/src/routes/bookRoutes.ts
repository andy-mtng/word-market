import express from "express";
const router = express.Router();
import {
    getBooks,
    getBook,
    getPaginatedBooks,
    getPopularBooks
} from "../controllers/bookController";

router.get("/popular", getPopularBooks);

router.get("/page", getPaginatedBooks);

router.get("/:id", getBook);

router.get("/", getBooks);

export default router;
