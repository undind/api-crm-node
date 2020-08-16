import { Request, Response, NextFunction } from "express";
import verifyJWTToken  from "../helpers/verifyToken";

export default (req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/api/signin' || req.path === '/api/signup') {
        return next();
    }

    const token = <string>req.headers.token;

    verifyJWTToken(token)
        .then((user: any) => {
            next();
        })
        .catch(err => {
            res.status(403).json({ status: 'error', message: "Invalid auth token provided." });
        });
};