import express from 'express'
import { OrderSave, OrderShowData, OrderShowAll, OrderTopMenu } from '../server/order_and_payment'
import { authMiddleware } from '../middleware/auth';

let orderrou = express.Router()

orderrou.post("/orders", authMiddleware, OrderSave)

orderrou.get("/tracking/:orderId", authMiddleware, OrderShowData)
orderrou.get("/tracking", authMiddleware, OrderShowAll)
orderrou.get("/ordertopmenu", OrderTopMenu)

export default orderrou;