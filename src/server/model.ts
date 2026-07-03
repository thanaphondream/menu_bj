import strict from "node:assert/strict";

type status = "user" | "admin"

export interface UserModel {
    id?: number;
    username: string;
    email: string;
    password: string;
    status: status
}

export interface LonginModel{
    email: string;
    password: string;
}

export interface MenuItemsModel{
    id?: number;
    name: string;
    description: string;
    price: number
    image: string;
    userId: number;
    categoryId: number;
}

export interface categoryModel {
    name: string;
    menu: MenuItemsModel[]
}

export interface AddressModel {
    id?: number;
    address: string;
    username: string;
    home: string;
    distance: string;
    phone: string;
    lat: string;
    lng: string;
    description: string;
    user?: UserModel;
}

type StatusOrder = "รอดำเนินการ" | "ตอบรับแล้ว" | "กำลังปรุงอาหาร" | "กำลังจัดส่ง" | "เสร็จสิ้น"

export interface OrderModel{
    id?: number;
    total_price: number;
    delivery_fee: number;
    reference: string;
    status: StatusOrder;
    userId: number;
    driverId: number;
    addressId: number;
}

export interface OrderItemModel{
    id?: number;
    price: number;
    quantity: number;
    orderId: number;
    menuItemId: number;
}

type StatusPayment = "รอดำเนินการ" | "ชำระเงินเส็จสิ้น"

type methods = "เก็บเงินปลายทาง"

export interface PaymentModel{
    id?: number;
    method: methods;
    amount: number;
    status: StatusPayment;
    orderId: number;
}