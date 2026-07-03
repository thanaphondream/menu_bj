import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne
} from "typeorm"


import { Order } from "./Order"

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  method?: string

  @Column()
  amount?: number

  @Column({
    default: "รอดำเนินการ"
  })
  status?: string

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  order?: Order
}