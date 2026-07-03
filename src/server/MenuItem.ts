import { Request, Response } from "express";
import { MenuItemsModel } from "./model";
import path from "path";
import fs from "fs"
import { MenuitemSave, MenuItemShows, MenuItemShowDataID, MenuItemUpdates } from "../adapter/menuitem";
import { ShowUserID } from "../adapter/user";
import CloudUpload from "../config/cloudinary";

export const menuitemPost = async (req: Request, res: Response) => {
    try{
        const {name, description, price, userId, categoryId} = req.body
        const users = await ShowUserID(Number(userId))
        if (users?.role !== 'admin'){
            return res.status(401).json({message: "error user not name: admin"})
        }

        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            res.status(400).json({ msg: 'No files uploaded' });
        }
        const image = req.file?.filename;

        const imagePromises = (req.files as Express.Multer.File[]).map(file => 
            CloudUpload(file.buffer, String(Date.now()))
        );
        const imageUrls = await Promise.all(imagePromises);
    
        const imageUrl = imageUrls[0]
        const menu: MenuItemsModel = {
        name,
        description,
        price: Number(price),
        image: String(imageUrl),
        userId: Number(userId),
        categoryId: Number(categoryId)
        };
        const menuitem = await MenuitemSave(menu)
        if (!menuitem) {
            return res.status(401).json({message: "Erorr Save MenuItem Not found"})
        }
        return res.status(200).json("Save MenuItem This OK")
    }catch(err){
        return res.status(500).json({message: "Error Status 500", err: err})
    }
}

export const MenuitemShow = async (req: Request, res: Response) => {
    try{
        const menuItem = await MenuItemShows()
        if (!menuItem) {
            return res.status(401).json({message: "Erorr Show MenuItem Not found"})
        }
        let menuitem: MenuItemsModel
        for(let menu of menuItem){
            menuitem = {
                id: menu.id,
                name: String(menu.name),
                description: String(menu.description),
                price: Number(menu.price),
                image: "http://localhost:8000/menuitem/uploads/"+ String(menu.image),
                userId: Number(menu.user?.id),
                categoryId: Number(menu.category?.id)
            }
        }

        return res.status(200).json(menuItem)
    }catch(err){ 
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const MenuItemUpdate = async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const menu = await MenuItemShowDataID(Number(id))
        if (!menu) {
            return res.status(404).json({
                message: "Menu not found"
            });
        }
        let menuModel: MenuItemsModel = {
            id: menu.id,
            name: String(menu.name),
            description: String(menu.description),
            image: String(menu.image),
            price: Number(menu.price),
            categoryId: Number(menu.category?.id),
            userId: Number(menu.user?.id)
        }
        if(menuModel.image){
            const oldImagePath = path.join(process.cwd(), "uploads", menuModel.image)

            if(fs.existsSync(oldImagePath)){
                fs.unlinkSync(oldImagePath)
            }
        }
        menuModel.image = String(req.file?.filename)
        const MenuItem = await MenuItemUpdates(menuModel, req.body)
        if (!MenuItem){
            return res.status(401).json({message: "update MenuItem not found"})
        }

        return res.status(200).json({message: "Update This OK"})
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const MenuItemProduct = async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const menu = await MenuItemShowDataID(Number(id))
        if (!menu) {
            return res.status(404).json({
                message: "Menu not found"
            });
        }
        const menuModel: MenuItemsModel = {
            id: menu.id,
            name: String(menu.name),
            description: String(menu.description),
            // image: "http://localhost:8000/menuitem/uploads/" + String(menu.image),
            image: String(menu.image),
            price: Number(menu.price),
            categoryId: Number(menu.category?.id),
            userId: Number(menu.user?.id)
        }

        return res.status(200).json({menuItem: menuModel})
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}