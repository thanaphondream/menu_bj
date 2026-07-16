import express from 'express'
import { AddresPost, AddressGetId, AddressGetAll_User } from '../server/addres';
import { authMiddleware } from '../middleware/auth';

let addressrou = express.Router()

addressrou.post("/address", authMiddleware, AddresPost)
addressrou.get("/address", authMiddleware, AddressGetId)
addressrou.get("/addressusershow", authMiddleware, AddressGetAll_User)


// addressrou.post("/address", authMiddleware, AddresPost)
// addressrou.get("/address", authMiddleware, AddressGetId)


export default addressrou;