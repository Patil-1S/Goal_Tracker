import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({
  path: `${process.cwd()}/envs/.env.${process.env.NODE_ENV || 'dev'}`,
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: +`${process.env.POSTGRES_PORT || '5432'}`,
  username: `${process.env.POSTGRES_USERNAME}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DATABASE}`,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: process.env.DB_SYNC === 'false',
  logging: false,
};

export const dataSource = new DataSource(dataSourceOptions);
