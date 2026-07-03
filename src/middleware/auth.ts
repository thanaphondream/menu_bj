import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ShowUserID } from "../adapter/user";
import * as dotenv from 'dotenv';
dotenv.config();

type Employee =  {
    id : number,
}

// export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     try{
//         const headers = req.headers.authorization;

//         if (!headers){
//             return res.status(401).json({
//                 message: "No token"
//             });
//         }

//         if (!headers.startsWith("Bearer ")) {
//             return res.status(401).json({
//                 message: "Invalid token format"
//             });
//         }

//         const token = headers.split(" ")[1];

//         const decoded  = jwt.verify(
//              token,
//             "Cass2025?"
//         )as Employee
//         const users = await ShowUserID(decoded.id);
//         if (!users) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         (req as any).user = users;
//         next();
//     }catch(err){
//         res.status(500).json({Error: "Eroro Middlewqre 500", err: err})
//     }
// }

export const  authMiddlewareCookie = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token
          if (!token) {
            return res.status(402).json({ message: "No token" })
        }

        const codes = process.env.CODEUSER;
        const decoded  = jwt.verify(
            token,
            String(codes)
        )as Employee

        const user = await ShowUserID(decoded.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        };
        (req as any).user = user;
        next();
    }catch(err){
        res.status(500).json({Error: "Eroro Middlewqre 500", err: err})
    }
}