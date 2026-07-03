import express from 'express';
import cors from 'cors';
import "reflect-metadata"
import { AppDataSource } from './src/repository/app_data_DB'
import rou  from './src/router/user'
import menuitemrou from './src/router/menuitem'
import categoryrou from './src/router/Category'
import cartrou from './src/router/Cart_Itme'
import cookieParser from "cookie-parser"
import addressrou from "./src/router/address"
import orderrou from "./src/router/order"

import * as dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(express.json())

    app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
    }))
    app.use(cookieParser())
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


app.use('/api', rou)
app.use('/menuitem', menuitemrou)
app.use('/category', categoryrou)
app.use('/cartitme', cartrou)
app.use('/address', addressrou)
app.use('/order', orderrou)

const port = process.env.POSTS;

app.listen(port, () => {
    console.log("Server Run Post ")
})