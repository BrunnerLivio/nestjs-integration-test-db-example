import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm"

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string
}
