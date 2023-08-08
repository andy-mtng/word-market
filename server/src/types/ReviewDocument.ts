import { Document } from "mongoose";
import Review from "./Reviews";

interface ReviewDocument extends Document, Review {}

export default ReviewDocument;
