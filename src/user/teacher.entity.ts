import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm"

@Entity()
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
