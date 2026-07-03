import express from "express";
import { CategoryPost, CategoryShowANDMenu, CategoryFindANDMenu,  CategoryUpdate } from "../server/Category";

let categoryrou = express.Router()

categoryrou.post("/category", CategoryPost)

categoryrou.get('/category/:id', CategoryShowANDMenu)
categoryrou.get('/category', CategoryFindANDMenu)

categoryrou.put('/category/:id', CategoryUpdate)

export default categoryrou;