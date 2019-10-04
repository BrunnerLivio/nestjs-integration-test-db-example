import { Connection, EntityRepository, Repository } from "typeorm"
import { User } from "./user.entity"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAll(): Promise<[User[], number]> {
    return await this.createQueryBuilder("user").getManyAndCount()
  }
}
