import express from 'express'
import { AddresPost, AddressGetId } from '../server/addres';
import { authMiddlewareCookie } from '../middleware/auth';

let addressrou = express.Router()

addressrou.post("/address", authMiddlewareCookie, AddresPost)
addressrou.get("/address", authMiddlewareCookie, AddressGetId)

export default addressrou;