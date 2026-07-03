import { Request, Response } from "express";
import { ShowUserEmail, SaveUser, ShowUserUsername, ShowUserID, UpdateUsers, DeleteUsers } from "../adapter/user";
import { UserModel, LonginModel } from "./model";
import { AuthRequest } from "../@types/expree"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv';
dotenv.config();

export const UserRegister = async (req: Request, res: Response) => {
    try{
        const {username, email, password, status}: UserModel = req.body
        if (username === ''|| email === ''|| password === ''){
            return res.status(400).json({ message: "ไม่มีข้อความ" });
        }
        const existing = await ShowUserEmail(email);
        if (existing) {
            return res.status(400).json({ message: "อีเมลนี้ถูกใช้แล้ว" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user: UserModel = {
            username: username,
            email: email,
            password: password,
            status: status
        }

        user.password = hashed
        const userSave = await SaveUser(user)
        if(!userSave){
            res.status(401).json({message: "Save User Error 401"})
        }
        return res.json("Post Save")
    }catch(err){
        return res.status(500).json({ message: "Register Error 500", Eroro: err})
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LonginModel = req.body

        const existing = await ShowUserEmail(email)
        if (!existing) {
            return res.status(400).json({ message: "ไม่มีอีเมลนี้" })
        }

        const isMatch = await bcrypt.compare(password, existing.password)
        if (!isMatch) {
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" })
        }
        const codes = process.env.CODEUSER;
        const token = jwt.sign(
            { id: existing.id },
            String(codes),
            { expiresIn: "1h" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 1000,
            sameSite: "lax",
            secure: false,
        });

        return res.status(200).json({
            message: "login success",
            token: token,
            user: existing
        })

    } catch (err) {
        return res.status(500).json({
            message: "Login Error 500",
            error: err
        })
    }
}

export const me = (req: AuthRequest, res: Response) => {
    try{
        const users: UserModel = {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            password: "_",
            status: req.user.status
        }
        
        return res.status(200).json({user: users})
    }catch(err){
        return res.status(500).json({message: "Show User Error 500"})
    }
}

export const SearchUser = async (req: Request, res: Response) => {

    try {

        const { username, email, password } = req.body;

        let users: any;

        if (!username && !email) {
            return res.status(400).json({
                message: "กรุณากรอก username หรือ email"
            });
        }
        if (email) {
            users = await ShowUserEmail(email);
        }
        else if (username) {

            users = await ShowUserUsername(username);

        }
        if (!users) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            users.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "รหัสผ่านไม่ถูกต้อง"
            });
        }

        return res.status(200).json({
            user: users
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        if (!id){
            return res.status(400).json({
                message: "Error 400 ID Not Found"
            });
        }
        const user = await ShowUserID(Number(id))
        const usermodel: UserModel = {
            id: Number(user?.id),
            username: String(user?.username),
            email: String(user?.email),
            status: "user",
            password: String(user?.password)
        }

        const upDateUser = await UpdateUsers(usermodel, req.body)
        return res.status(200).json({message: "Update User This Ok"})
    }catch(err){
         return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const DeleteUser = async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        if (!id){
            return res.status(400).json({
                message: "Error 400 ID Not Found"
            });
        }

        const user = await DeleteUsers(Number(id))
        if (!user){
            return res.status(400).json({
                message: "Delete Not Found"
            });
        }
        return res.status(200).json({message: "Delete This Ok"})
    }catch(err){
        return res.status(500).json({
            message: "Server Error"
        });
    }
}

export const Logout = async (req: AuthRequest, res: Response) =>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: false,
        });

        return res.json({
            message: "Logout success",
        });
    }catch(err){
        return res.status(500).json({
            message: "Server Error"
        });
    }
}