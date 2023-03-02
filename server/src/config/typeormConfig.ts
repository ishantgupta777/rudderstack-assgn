import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isDevelopmentEnv } from 'src/utils/commonUtils';

export const getTypeORMConfigs = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.PSQL_HOST,
    port: parseInt(process.env.PSQL_PORT),
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE,
    autoLoadEntities: true,
    synchronize: isDevelopmentEnv,
    logging: isDevelopmentEnv,
  };
};
