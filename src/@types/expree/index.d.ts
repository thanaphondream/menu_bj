import { Request } from "express";
import { UserModel } from "../../server/model";

export interface AuthRequest extends Request {
    users?: UserModel
}

interface AuthRequest extends Request {
  user?: any;
}