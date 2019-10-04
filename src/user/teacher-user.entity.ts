import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  TableForeignKey
} from "typeorm"

@Entity()
export class TeacherUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user: number

  @Column()
  teacher: number
}
