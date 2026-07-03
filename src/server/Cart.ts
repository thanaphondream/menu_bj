import { Request, Response } from "express";
import { CartFinID, CartSaves, CartItemFindOne, CartItemUpdate, CartItmeSave, CartFinIDOnd, CartItmeDelete, CartFinIDS } from "../adapter/Cart_Item";
import { MenuItemShowDataID } from "../adapter/menuitem";
import { AuthRequest } from "../@types/expree"

export const CartSave = async (req: AuthRequest, res: Response) => {
    try{
        const {menuItemId, quantity } = req.body;

        let carts = await CartFinID(Number(req.user.id))
        
        const cartNumber = carts?.items?.reduce((sam, i) => sam + Number(i.quantity), 0)
        if (Number(cartNumber) >= 49){
            return  res.status(401).json({message: "กะตร้าเต็มแล้ว"})
        }
        if(!carts){
            carts = await CartSaves(Number(req.user.id))
        }

        const menuItem = await MenuItemShowDataID(menuItemId)
        if (!menuItem) {
            return res.status(404).json({ message: "MenuItem not found" });
        }

        const existingItem = await CartItemFindOne(Number(carts.id), Number(menuItemId))

        if (existingItem) {
            const checkQuantity: number = Number(existingItem.quantity) + quantity

            if(checkQuantity > 10){
                return  res.status(401).json({message: "กะตร้าเต็มแล้ว เพิ่มได้ 10 ถ้วย ต่อ1 รายการน่ะครับ/ค่ะ"})
            }
            existingItem.quantity += quantity || 1;

            await CartItemUpdate(existingItem)

            return res.json({
                message: "Updated quantity",
                data: existingItem,
            });
        }

        const newItem = await CartItmeSave(Number(carts.id), Number(menuItemId), Number(quantity))

        return res.json({
            message: "Added to cart",
            data: newItem,
        });
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}


export const Cart_ItmeFin = async (req: AuthRequest, res: Response) => {
    try{
        const cartItem = await CartFinIDS(Number(req.user.id))
        if(!cartItem){
            return res.status(401).json({message: "Error Carts not found"})
        }

        const cartMapi = cartItem.items?.map((m) => ({
            ...m,
            total: Number(m.quantity) * Number(m.menuItem?.price)
        }))

        const total = cartMapi?.reduce((s, m) => s + Number(m.total), 0)
        const carts = await cartItem.items?.reduce((sam, i) => sam + Number(i.quantity), 0)

        return res.status(200).json({count: carts, cart: cartItem, total: total})
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const Cart_Itmecount = async (req: AuthRequest, res: Response) => {
    try{
        const cartItem = await CartFinID(Number(req.user.id))
        if(!cartItem){
            return res.status(402).json({message: "Error Carts not found"})
        }
        const carts = await cartItem.items?.reduce((sam, i) => sam + Number(i.quantity), 0)

        return res.status(200).json(carts)
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const UpdateCartQuantity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { quantity } = req.body

        if (Number(quantity) < 1){
            await CartItmeDelete(Number(id))
            return res.status(201).json({message: "DEIETE This OK"})
        }
        const cartItem = await CartFinIDOnd(Number(id))
        if (!cartItem) {
            return res.status(404).json({ message: "CartItem not found" })
        }

        const qty = Number(quantity)

        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({ message: "Invalid quantity" })
        }

        cartItem.quantity = qty

        await CartItemUpdate(cartItem)

        return res.status(200).json({
            message: "Update quantity success",
            cartItem
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error Status 500",
            error: err
        })
    }
}