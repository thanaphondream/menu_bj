import express from "express"
import { UserRegister, Login, me, SearchUser, UpdateUser, DeleteUser, Logout } from "../server/userserver"
import { authMiddleware } from "../middleware/auth"

let rou = express.Router()
rou.post("/register", UserRegister)
rou.post("/login", Login)
rou.post("/usersearch", SearchUser)
rou.post("/logout", authMiddleware, Logout)

rou.put("/user/:id", UpdateUser)

rou.delete("/user/:id", DeleteUser)

rou.get("/me",authMiddleware, me)


export default rou
