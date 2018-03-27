import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getOrmConfig } from './database-ormconfig.constant';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig())
  ],
  components: [
    DatabaseService,
  ],
  exports: [
    DatabaseService
  ]
})
export class DatabaseModule { }
