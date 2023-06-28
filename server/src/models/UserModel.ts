const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        data: String,
        contentType: String
    }
});

// static signup method
userSchema.statics.signup = async function (email: string, password: string) {
    // validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

    const userExists = await this.findOne({ email });

    if (userExists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        email,
        password: hash,
        profileImage: { data: "", contentType: "" }
    });

    return user;
};

// static login method
userSchema.statics.login = async function (email: string, password: string) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    if (!user.emailIsVerified) {
        throw Error("You must verify your email before logging in");
    }

    return user;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
