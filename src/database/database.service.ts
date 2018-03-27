import { Component, Inject } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

@Component()
export class DatabaseService {
    /**
     * Initializes the database service
     * @param connection The connection, which gets injected
     */
    constructor(@Inject('Connection') public connection: Connection) { }

    /**
     * Returns the repository of the given entity
     * @param entity The database entity to get the repository from
     */
    async getRepository<T>(entity): Promise<Repository<T>> {
        return this.connection.getRepository(entity);
    }
}
