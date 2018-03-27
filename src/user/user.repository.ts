import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findAll(): Promise<[User[], number]> {
        return await this
            .createQueryBuilder('user')
            .getManyAndCount();
    }
}

export const UserRepositoryProvider = {
    provide: 'UserRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
    inject: [Connection]
};
