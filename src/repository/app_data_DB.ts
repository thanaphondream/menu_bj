import { DataSource } from "typeorm"
import { User} from "./User"
import { Address } from "./Adddress"
import { MenuItem, MenuImage } from "./MenuItem"
import { Cart, CartItem } from "./Cart" 
import { Driver } from "./Driver"
import { Order } from "./Order"
import { OrderItem } from "./OrderItem"
import { Payment } from "./Payment"
import { Category } from "./Category"

import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",

    entities: [
        User,
        Address,
        MenuItem,
        Cart,
        CartItem,
        Driver,
        Order,
        OrderItem,
        Payment,
        Category,
        MenuImage,
    ],

    subscribers: [],
    migrations: [],
});