import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/UserModel";
import UserDocument from "../types/UserDocument";

interface RequestWithUser extends Request {
    user?: UserDocument;
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    // User is not authorized to perform a certain action
    if (!token) {
        return res.status(401).json({ error: "You are not authorized" });
    }

    const decoded = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
    const userId = decoded._id;
    UserModel.findOne({ _id: userId })
        .then((foundUser: UserDocument | null) => {
            if (foundUser !== null || foundUser !== undefined) {
                (req as RequestWithUser).user = foundUser!;
                next();
            } else {
                throw new Error("User not found");
            }
        })
        .catch((error: Error) => {
            next(error);
        });
};

export default requireAuth;
