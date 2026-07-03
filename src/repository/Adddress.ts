import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm"

import { User } from "./User"

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  username?: string

  @Column()
  address?: string

  @Column({ nullable: true })
  home?: string

  @Column()
  phone?: string

  @Column()
  lat?: string

  @Column({ nullable: true })
  distance?: string

  @Column()
  lng?: string

  @Column()
  description?: string

  @ManyToOne(() => User, (user) => user.addresses)
  user?: User
}