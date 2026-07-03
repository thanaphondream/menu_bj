import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from "typeorm"

import { User } from "./User"
import { Driver } from "./Driver"
import { Address } from "./Adddress"
import { Payment } from "./Payment"
import { OrderItem } from "./OrderItem"

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  total_price?: number

  @Column()
  delivery_fee?: number

  @Column({ nullable: true })
  reference?: string

  @Column({
    default: "รอดำเนินการ"
  })
  status?: string

  @ManyToOne(() => User, (user) => user.orders)
  user?: User

  @ManyToOne(() => Driver, (driver) => driver.orders)
  driver?: Driver

  @ManyToOne(() => Address)
  address?: Address

  @OneToMany(() => OrderItem, (item) => item.order)
  items?: OrderItem[]

  @OneToOne(() => Payment, (payment) => payment.order)
  payment?: Payment

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date
}
