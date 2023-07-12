import { MikroORM } from '@mikro-orm/core';
import type { MySqlDriver } from '@mikro-orm/mysql'; // or any other driver package

export const orm = await MikroORM.init<MySqlDriver>({
  // entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/db/entities'], // path to our TS entities (src), relative to `baseDir`
  dbName: 'my-db-name',
  type: 'mysql',
});// access EntityManager via `em` property