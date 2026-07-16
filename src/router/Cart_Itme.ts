import express from 'express'
import { authMiddleware } from '../middleware/auth';
import { CartSave, Cart_ItmeFin, Cart_Itmecount, UpdateCartQuantity } from '../server/Cart';

let cartrou = express.Router()
cartrou.post('/carts', authMiddleware, CartSave)

cartrou.get('/cart', authMiddleware, Cart_ItmeFin)
cartrou.get('/count', authMiddleware, Cart_Itmecount)

cartrou.put("/count/:id", authMiddleware, UpdateCartQuantity)

export default cartrou;