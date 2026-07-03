import { AppDataSource } from "../repository/app_data_DB";
import { OrderItem } from "../repository/OrderItem";
import { OrderItemModel } from "../server/model";

const Orderitrepo = AppDataSource.getRepository(OrderItem)

export function OrderItemPort(orderItme: OrderItemModel){
    const orderitmecreate = Orderitrepo.create({
        quantity: orderItme.quantity,
        price: orderItme.price,
        order: {id: Number(orderItme.orderId)},
        menuItem: {id: Number(orderItme.menuItemId)}
    })

    return Orderitrepo.save(orderitmecreate)
}