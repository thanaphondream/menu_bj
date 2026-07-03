import express from "express"
import { upload } from "../middleware/upload";
import { menuitemPost, MenuItemUpdate, MenuitemShow, MenuItemProduct } from "../server/MenuItem";
import {  authMiddlewareCookie } from "../middleware/auth"
import { driverPost } from "../server/driver";

let menuitemrou = express.Router()

menuitemrou.use("/uploads", authMiddlewareCookie, express.static("uploads"));

menuitemrou.post("/menuItem", authMiddlewareCookie, upload.array("image", 2), menuitemPost)

menuitemrou.put(
    "/menuItme/:id", 
    authMiddlewareCookie, 
    // upload.single("image"), 
    upload.array('image', 2),
    MenuItemUpdate)

menuitemrou.get("/menuItem", MenuitemShow)
menuitemrou.get("/menuItem/:id", MenuItemProduct)

menuitemrou.post("/driver", driverPost)

export default menuitemrou;