import 'dotenv/config';
import { DataSource } from 'typeorm';

const isTs = !!process.env.TS_NODE;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [isTs ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'],
  migrations: [isTs ? 'src/migrations/*.ts' : 'dist/migrations/*.js'],
});
