import { AppDataSource } from "../repository/app_data_DB";
import { Order } from "../repository/Order";
import { OrderModel } from "../server/model";

const OrderRepository = AppDataSource.getRepository(Order)

export function OrderPost(order: OrderModel) {
    const orderCreate = OrderRepository.create({
        total_price: order.total_price,
        delivery_fee: order.delivery_fee,
        status: order.status,
        reference: order.reference,
        user: {id: Number(order.userId)},
        driver: {id: Number(order.driverId)},
        address: {id: Number(order.addressId)}
    })

    return OrderRepository.save(orderCreate)
}

export function OrderGet(id: number){
    return OrderRepository.findOne({
        where: {id: id},
        relations: {
            items: {menuItem: true},
            payment: true,
            address: true,
            user: true,
            driver: true
        }
    })
}

export function OrderFindAll(userId: number){
    return OrderRepository.find({
        where: {
            user: {id: userId}
        },
        order: {
            // created_at: "DESC"
            id: "DESC"
        },
        relations: {
            items: {menuItem: true}
        }
    })
}