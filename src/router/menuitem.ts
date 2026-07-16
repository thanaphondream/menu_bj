import express from "express"
import { upload } from "../middleware/upload";
import { menuitemPost, MenuitemShow, MenuItemProduct, MenuItmenTopNew, menuitemImagePost } from "../server/MenuItem";
import {  authMiddleware } from "../middleware/auth"
import { driverPost } from "../server/driver";

let menuitemrou = express.Router()

menuitemrou.use("/uploads", authMiddleware, express.static("uploads"));

menuitemrou.post(
    "/menuItem",
    authMiddleware,
    upload.fields([
        {
            name: "cover",
            maxCount: 1
        },
        {
            name: "images",
            maxCount: 10
        }
    ]),
    menuitemPost
)

menuitemrou.post("/menuimage", authMiddleware, menuitemImagePost)

// menuitemrou.post("/menuimage", authMiddleware, upload.fields([{name: "images",maxCount: 10}]), menuitemImagePost)

// menuitemrou.put(
//     "/menuItme/:id", 
//     authMiddleware, 
//     upload.single("image"), 
//     upload.array('image', 2),
//     MenuItemUpdate)

menuitemrou.get("/menuItem", MenuitemShow)
menuitemrou.get("/menuItem/:id", MenuItemProduct)
menuitemrou.get("/menu", MenuItmenTopNew)

menuitemrou.post("/driver", driverPost)

export default menuitemrou;