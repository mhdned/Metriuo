import * as path from 'path';
import * as fs from 'fs/promises';
import { DuckDBConnection, DuckDBInstance } from '@duckdb/node-api';

export class DuckDatabaseService {
  public static db: DuckDatabaseService;

  public instance!: DuckDBInstance;
  public connection!: DuckDBConnection;

  private databasePath: string = path.join(
    __dirname,
    './../database/metriuo.db'
  );

  private constructor() {}

  public async initializeConnection() {
    this.instance = await DuckDBInstance.create(this.databasePath);
    this.connection = await this.instance.connect();

    await this.initializeQueries();
  }

  public async initializeQueries() {
    const sqlFilePath = path.join(
      __dirname,
      './../database/sql/createRequestLogTable.sql'
    );
    const createRequestTableQuery = await fs.readFile(sqlFilePath, 'utf-8');
    await this.connection.run(createRequestTableQuery);
  }

  public static async createInstance(): Promise<DuckDatabaseService> {
    if (!DuckDatabaseService.db)
      DuckDatabaseService.db = new DuckDatabaseService();
    await this.db.initializeConnection();

    return DuckDatabaseService.db;
  }

  public async create() {}
  public async createMany() {}

  public async read(offset: number, limit: number) {
    const readQuery = `SELECT * FROM request_logs LIMIT ${limit} OFFSET ${offset};`;
    const result = await this.connection.run(readQuery);
    return await result.getRowsJS();
  }

  public async update() {}
  public async updateMany() {}

  public async delete() {}
  public async deleteMany() {}
}
