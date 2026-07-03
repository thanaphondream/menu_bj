import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from "typeorm"

import { User } from "./User"
import { OrderItem } from "./OrderItem"
import { Category } from "./Category"

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  description?: string

  @Column()
  price?: number

  @Column()
  image?: string

  @ManyToOne(() => User, (user) => user.menus)
  user?: User

  @ManyToOne(() => Category, (category) => category.menus)
  category?: Category

  @OneToMany(() => OrderItem, (item) => item.menuItem)
  orderItems?: OrderItem[]

   @OneToMany(() => MenuImage, (image) => image.menu, {
    cascade: true,
  })
  images?: MenuImage[];
}

@Entity()
export class MenuImage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  imageUrl?: string;

  @ManyToOne(() => MenuItem, (menu) => menu.images, {
    onDelete: "CASCADE",
  })
  menu?: MenuItem;
}