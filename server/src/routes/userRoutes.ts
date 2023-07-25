import express, { Request, Express } from "express";
import { uploadProfilePicture, getProfilePicture } from "../controllers/userController";
import requireAuth from "../utils/requireAuth";
import multer, { FileFilterCallback } from "multer";
const router = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/image", upload.single("image"), requireAuth, uploadProfilePicture);

router.get("/image", requireAuth, getProfilePicture);

export default router;
