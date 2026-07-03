import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne
} from "typeorm"

import { User } from "./User"
import { MenuItem } from "./MenuItem"

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id?: number

  @OneToOne(() => User)
  @JoinColumn()
  user?: User

  @OneToMany(() => CartItem, (item) => item.cart)
  items?: CartItem[]
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  quantity?: number

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart?: Cart

  @ManyToOne(() => MenuItem)
  menuItem?: MenuItem
}