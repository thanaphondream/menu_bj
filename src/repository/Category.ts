import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm"

import { MenuItem } from "./MenuItem"


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @OneToMany(() => MenuItem, (menu) => menu.category)
  menus?: MenuItem[]
}