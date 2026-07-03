import { Request, Response } from "express";
import { OrderModel, OrderItemModel, PaymentModel} from "./model";
import { OrderPost, OrderGet, OrderFindAll } from "../adapter/Order";
import { CartFinIDS, CartAndCartitme_Delete } from "../adapter/Cart_Item";
import { AuthRequest } from "../@types/expree"
import { OrderItemPort } from "../adapter/Orderitme";
import { PaymentPost } from "../adapter/Payment";

export const OrderSave = async(req: AuthRequest, res: Response) => {
    try{
        const addressId = req.body.addressId
        const cartItem = await CartFinIDS(Number(req.user.id))

        const cartMapi = cartItem?.items?.map((m) => ({
            ...m,
            total: Number(m.quantity) * Number(m.menuItem?.price)
        }))

        const total = cartMapi?.reduce((s,m) => s + Number(m.total), 0)
        const reference = "OD_" + Date.now() + "_PF_" + Math.floor(Math.random() * 1000);
         const orderM: OrderModel = {
            total_price: Number(total), 
            delivery_fee: 0, 
            userId: Number(req.user.id), 
            driverId: 1, 
            addressId: Number(addressId), 
            status: "รอดำเนินการ",
            reference: reference
        }

        const ordersaves = await OrderPost(orderM)
        if(!ordersaves){
            return res.status(401).json({message: "Error order not fount"})
        }

        cartItem?.items?.map(async (m) => {
            const orderitemmodel: OrderItemModel = {
                quantity: Number(m.quantity),
                price: Number(m.menuItem?.price),
                menuItemId: Number(m.menuItem?.id),
                orderId: Number(ordersaves.id)
            }

            await OrderItemPort(orderitemmodel)
        })

        const paymentM: PaymentModel = {
            method: "เก็บเงินปลายทาง",
            amount: Number(total),
            status: "รอดำเนินการ",
            orderId: Number(ordersaves.id)
        }

        await PaymentPost(paymentM)

        await CartAndCartitme_Delete(Number(cartItem?.id))

         return res.status(201).json({
            message: "Create Order Success",
            orderId: ordersaves.id
        });


    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const OrderShowData = async (req: Request, res: Response) => {
    try{
        const orderId = req.params.orderId
        const order = await OrderGet(Number(orderId))
        if(!order){
            return res.status(401).json({message: "Error Order Not Fount"})
        }
        return res.status(200).json(order)
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}

export const OrderShowAll = async (req: AuthRequest, res: Response) => {
    try{
        const userId: number = Number(req.user.id)
        const order = await OrderFindAll(userId)
        if(!order){
            return res.status(401).json({message: "Error Order not found"})
        }
        return res.status(200).json(order)
    }catch(err){
        return res.status(500).json({message: "Error Status 500"})
    }
}