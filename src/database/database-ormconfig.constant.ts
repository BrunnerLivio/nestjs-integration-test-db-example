import * as models from '@lxdhub/db';
import { User } from '../user/user.entity';
import { Teacher } from '../user/teacher.entity';
import { TeacherUser } from '../user/teacher-user.entity';
 
export function getOrmConfig() {
    let OrmConfig;
    const settings = {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
    };

    if (process.env.NODE_ENV !== 'test') {
        OrmConfig = {
            type: 'postgres',
            host: settings.host,
            port: settings.port,
            username: settings.username,
            password: settings.username,
            database: settings.database,
            entities: [ User, Teacher, TeacherUser],
            synchronize: true
        };
    } else {
        OrmConfig = {
            type: 'sqlite',
            database: './db/test-db.sql',
            entities: [ User, Teacher, TeacherUser],
            synchronize: true,
            dropSchema: true
        };
    }
    return OrmConfig;
}
