import { Request, Response } from "express";
import { MenuItemsModel } from "./model";
import path from "path";
import fs from "fs"
import { MenuitemSave, MenuItemShows, MenuItemShowDataID, MenutemTopNew, MenutemImgSave } from "../adapter/menuitem";
import { ShowUserID } from "../adapter/user";
import CloudUpload from "../config/cloudinary";

export const menuitemPost = async (req: Request, res: Response) => {
    try {

        const { name, description, price, userId, categoryId } = req.body;
        const users = await ShowUserID(Number(userId));

        if (users?.role !== "admin") {
            return res.status(401).json({
                message: "Only admin can create menu."
            });
        }

        const files = req.files as {
            cover?: Express.Multer.File[];
            images?: Express.Multer.File[];
        };

        if (!files?.cover || files.cover.length === 0) {
            return res.status(400).json({
                message: "Cover image is required."
            });
        }

        const coverUpload = await CloudUpload(
            files.cover[0].buffer,
            String(Date.now())
        );

        let imageUrls: string[] = [];

        if (files.images && files.images.length > 0) {

            const uploads = files.images.map(file =>
                CloudUpload(
                    file.buffer,
                    String(Date.now())
                )
            );

            imageUrls = await Promise.all(uploads);
        }


        const menu = await MenuitemSave({
            name,
            description,
            price: Number(price),

            image: coverUpload,

            userId: Number(userId),

            categoryId: Number(categoryId),

            images: imageUrls
        });

        return res.status(200).json(menu);

    } catch (err) {

        return res.status(500).json(err);

    }
};

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

// export const MenuItemUpdate = async (req: Request, res: Response) => {
//     try{
//         const id = req.params.id
//         const menu = await MenuItemShowDataID(Number(id))
//         if (!menu) {
//             return res.status(404).json({
//                 message: "Menu not found"
//             });
//         }
//         let menuModel: MenuItemsModel = {
//             id: menu.id,
//             name: String(menu.name),
//             description: String(menu.description),
//             image: String(menu.image),
//             price: Number(menu.price),
//             categoryId: Number(menu.category?.id),
//             userId: Number(menu.user?.id)
//         }
//         if(menuModel.image){
//             const oldImagePath = path.join(process.cwd(), "uploads", menuModel.image)

//             if(fs.existsSync(oldImagePath)){
//                 fs.unlinkSync(oldImagePath)
//             }
//         }
//         menuModel.image = String(req.file?.filename)
//         const MenuItem = await MenuItemUpdates(menuModel, req.body)
//         if (!MenuItem){
//             return res.status(401).json({message: "update MenuItem not found"})
//         }

//         return res.status(200).json({message: "Update This OK"})
//     }catch(err){
//         return res.status(500).json({message: "Error Status 500"})
//     }
// }

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
            userId: Number(menu.user?.id),
            images: menu.images?.map(img => String(img.imageUrl))
        }

        return res.status(200).json({menuItem: menuModel})
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const MenuItmenTopNew = async(req: Request, res: Response) => {
    try{
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const skip = (page - 1) * limit

        const [menu, total] = await MenutemTopNew(skip, limit)

          res.json({
            data: menu,
            total,
            page,
            hasMore: skip + menu.length < total
        })
    }catch(err){
         return res.status(500).json({message: "Error Status 500"})
    }
}


export const menuitemImagePost = async (req: Request, res: Response) => {
    try {

        const { menuId, userId, url } = req.body;
        
        const users = await ShowUserID(Number(userId));

        if (users?.role !== "admin") {
            return res.status(401).json({
                message: "Only admin can create menu."
            });
        }

        // const files = req.files as {
        //     images?: Express.Multer.File[];
        // };


        // let imageUrls: string[] = [];

        // if (files.images && files.images.length > 0) {

        //     const uploads = files.images.map(file =>
        //         CloudUpload(
        //             file.buffer,
        //             String(Date.now())
        //         )
        //     );

        //     imageUrls = await Promise.all(uploads);
        // }

        // imageUrls.map(async (url) => {
        //     await MenutemImgSave(url, Number(menuId))
        // })

        await MenutemImgSave(url, Number(menuId))
        

        return res.status(200).json("Save MenuImage This OK ");

    } catch (err) {

        return res.status(500).json(err);

    }
};