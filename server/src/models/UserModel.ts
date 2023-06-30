const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

// interface UserMethods {
//     login(): void;
//     signup(): void;
// }

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

userSchema.statics.login = function (email: string, password: string): void {};

// userSchema.statics.signup = function (
//     email: string,
//     password: string
// ): Promise<User | null> {
//     const saltRounds = 10;
//     let user: User;
//     bcrypt.hash(password, saltRounds, (err: Error, hash: string) => {
//         if (err) {
//             return null;
//         }

//         // Store hash in your password DB.
//         user = this.create({
//             email: email,
//             password: hash,
//             profileImage: {
//                 data: "",
//                 contentType: ""
//             }
//         });
//         return user;
//     });
// };

const UserModel = model("User", userSchema);
export default UserModel;
