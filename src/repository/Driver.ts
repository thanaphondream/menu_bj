import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm"

import { Order } from "./Order"

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  phone?: string

  @Column()
  vehicle?: string

  @Column({
    default: "offline"
  })
  status?: string

  @OneToMany(() => Order, (order) => order.driver)
  orders?: Order[]
}