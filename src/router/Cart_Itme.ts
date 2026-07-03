import express from 'express'
import { authMiddlewareCookie } from '../middleware/auth';
import { CartSave, Cart_ItmeFin, Cart_Itmecount, UpdateCartQuantity } from '../server/Cart';

let cartrou = express.Router()
cartrou.post('/carts', authMiddlewareCookie, CartSave)

cartrou.get('/cart', authMiddlewareCookie, Cart_ItmeFin)
cartrou.get('/count', authMiddlewareCookie, Cart_Itmecount)

cartrou.put("/count/:id", authMiddlewareCookie, UpdateCartQuantity)

export default cartrou;