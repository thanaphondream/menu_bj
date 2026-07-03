import express from 'express'
import { OrderSave, OrderShowData, OrderShowAll } from '../server/order_and_payment'
import { authMiddlewareCookie } from '../middleware/auth';

let orderrou = express.Router()

orderrou.post("/orders", authMiddlewareCookie, OrderSave)

orderrou.get("/tracking/:orderId", authMiddlewareCookie, OrderShowData)
orderrou.get("/tracking", authMiddlewareCookie, OrderShowAll)

export default orderrou;