import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne
} from "typeorm"

import { MenuItem } from "./MenuItem"
import { Order } from "./Order"
import { Address } from "./Adddress"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  username!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column({
    default: "true"
  })
  status?: string

  @Column({
    default: "user"
  })
  role?: string

  @CreateDateColumn()
  created_at?: Date

  @UpdateDateColumn()
  updated_at?: Date

  @OneToMany(() => MenuItem, (menu) => menu.user)
  menus?: MenuItem[]

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[]

  @OneToMany(() => Address, (address) => address.user)
  addresses?: Address[]
}