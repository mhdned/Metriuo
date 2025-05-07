import * as path from 'path';
import * as fs from 'fs/promises';
import { DuckDBConnection, DuckDBInstance } from '@duckdb/node-api';

import { MetriuoOptionsType } from './types/monitoring.type';
import { requestLogger } from './middlewares/logger.middleware';

class Metriuo {
  public static metriuoInstance: Metriuo;

  private folder: string;
  private logFileFormat: 'json' | 'txt';
  private static duckDBInstance: DuckDBInstance;
  private static duckDBConnection: DuckDBConnection;

  private constructor(options: MetriuoOptionsType) {
    this.folder = options.folder;
    this.logFileFormat = options.logFileFormat ?? 'json';
  }

  public static async initialize(
    options: MetriuoOptionsType
  ): Promise<Metriuo> {
    Metriuo.metriuoInstance = new Metriuo(options);
    await this.initializeDuckDB();
    return Metriuo.metriuoInstance;
  }

  private static async initializeDuckDB() {
    const databasePath = path.join(__dirname, './database/metriuo.db');
    const instance = await DuckDBInstance.create(databasePath);
    const sqlFilePath = path.join(
      __dirname,
      './database/sql/createRequestLogTable.sql'
    );
    const createRequestTableQuery = await fs.readFile(sqlFilePath, 'utf-8');
    const connection = await instance.connect();
    await connection.run(createRequestTableQuery);
    this.duckDBConnection = connection;
    this.duckDBInstance = instance;
  }

  public monitoring() {
    return;
  }

  public logger() {
    return requestLogger({
      folder: this.folder,
      logFileFormat: this.logFileFormat,
    });
  }
}

module.exports = Metriuo;
