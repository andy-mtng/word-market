import { Request, Response, NextFunction } from "express";

function conditionalWrapper(fn: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.path === "/checkout/checkout-completion") {
            next();
        } else {
            fn(req, res, next);
        }
    };
}

export default conditionalWrapper;
