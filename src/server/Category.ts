import { Request, Response } from "express";
import { CategoryPosts, CategoryFintANDMenu, CategoryFindANdMenu, CategoryId, CategoryUpdates } from "../adapter/Category";
import { MenuItemNew } from "../adapter/menuitem";

export const CategoryPost = async (req: Request, res: Response) => {
    try{
        const {name} = req.body
        const category = await CategoryPosts(name)
        if (!category){
            return res.status(401).json({message: "category not found"})
        }

        return res.status(200).json({message: "Save This OK"})
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const CategoryShowANDMenu = async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const category = await CategoryFintANDMenu(Number(id))
        if (!category){
            return res.status(401).json({message: "category not found"})
        }
        return res.status(200).json(category)
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const CategoryFindANDMenu = async (req: Request, res: Response) => {
    try {
        const result = await CategoryFindANdMenu()
        const menu = await MenuItemNew()
        return res.status(200).json({
            category: result,
            menus: menu
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error Status 500",
            err: err
        })
    }
}

export const CategoryUpdate = async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const category = await CategoryId(Number(id))
        const categoryUpdate = await CategoryUpdates(category, req.body)
        if (!categoryUpdate){
            return res.status(401).json({message: "erorr not found"})
        }
        return res.status(200).json({message: "Update This OK"})
    }catch(err){
        return res.status(500).json({
            message: "Error Status 500"
        })
    }
}