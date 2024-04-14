import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from './../env';
import { entities } from './Entities';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: entities,
  synchronize: false,
  migrationsRun: true,
  migrations: [`dist/database/migrations/*{.ts,.js}`],
};

export const connectionSource = new DataSource(config);
