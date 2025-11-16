import dotenv from 'dotenv';
import path from 'path';

const ENV_PATH = path.join(__dirname, '/../../.env');

dotenv.config({ path: ENV_PATH });

export const ENV = {
  PORT: process.env.PORT || 3000,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '1106',
  POSTGRES_USER: process.env.POSTGRES_USER || 'marizol',
  POSTGRES_DB: process.env.POSTGRES_DB || 'aguiatur',
  PGDATA: process.env.PGDATA || '/var/lib/postgresql/data/pgdata',
  PGHOST: process.env.PGHOST || 'localhost',
  PGPORT: process.env.PGPORT || '5432',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PWD_SECRET: process.env.PWD_SECRET || '1106',
  SALTS: process.env.SALTS || '10',
  JWT_SECRET: process.env.JWT_SECRET || '1106',
  SOCKETIO_PORT: process.env.SOCKETIO_PORT || '3000',
};
