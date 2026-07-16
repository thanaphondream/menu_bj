import express from 'express'
import { AddresPost, AddressGetId, AddressGetAll_User } from '../server/addres';
import { authMiddlewareCookie } from '../middleware/auth';

let addressrou = express.Router()

addressrou.post("/address", authMiddlewareCookie, AddresPost)
addressrou.get("/address", authMiddlewareCookie, AddressGetId)
addressrou.get("/addressusershow", authMiddlewareCookie, AddressGetAll_User)

export default addressrou;