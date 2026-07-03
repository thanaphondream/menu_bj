import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm"

import { Order } from "./Order"
import { MenuItem } from "./MenuItem"

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  quantity?: number

  @Column()
  price?: number

  @ManyToOne(() => Order, (order) => order.items)
  order?: Order

  @ManyToOne(() => MenuItem, (menu) => menu.orderItems)
  menuItem?: MenuItem
}