import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { respositories } from './repositories';
import { config } from './typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: respositories,
  exports: respositories,
})
export class DatabaseModule {}
