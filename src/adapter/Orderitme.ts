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

export function CartItemMenuTop(lim: number) {
    return Orderitrepo
   .createQueryBuilder("orderItem")
  .leftJoin("orderItem.order", "order")
  .leftJoin("orderItem.menuItem", "menu")
  .select([
    "menu.id AS id",
    "menu.name AS name",
    "menu.price AS price",
    "menu.image AS image",
    "menu.description AS description"
  ])
  .addSelect("SUM(orderItem.quantity)", "totalSold")
  .where("order.status = :status", {
    status: "เสร็จสิ้น",
  })
  .groupBy("menu.id")
  .addGroupBy("menu.name")
  .addGroupBy("menu.price")
  .addGroupBy("menu.image")
  .addGroupBy("menu.description")
  .orderBy("totalSold", "DESC")
  .limit(lim || 5)
  .getRawMany();
}