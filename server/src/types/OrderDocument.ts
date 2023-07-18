import { Document } from "mongoose";
import Order from "./Order";

interface OrderDocument extends Document, Order {}

export default OrderDocument;
