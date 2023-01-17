import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();
const baseDir = process.env.NODE_ENV == 'prod' ? 'dist' : 'src';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  entities: [`${baseDir}/models/*.{ts,js}`],
  logging: false,
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data source has been initialized.");
  })
  .catch((err) => {
    console.error(`Error during data Source initialization. Error: ${err}`);
  });
