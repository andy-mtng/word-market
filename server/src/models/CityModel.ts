import mongoose from "mongoose";
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String
});

export default mongoose.model("City", citySchema);
