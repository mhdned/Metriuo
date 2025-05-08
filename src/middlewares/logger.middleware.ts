import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

import { LoggerOptionsType } from './../types/logger.type';
import { RequestDataType } from './../types/metriuo.types';
import { DuckDatabaseService } from './../services/duckdb.service';

export function requestLogger(options: LoggerOptionsType) {
  const today: Date = new Date();
  const todayString: string = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  return async (req: Request, res: Response, next: NextFunction) => {
    const db = await DuckDatabaseService.createInstance();

    const start = process.hrtime();

    res.on('finish', async () => {
      const diff = process.hrtime(start);
      const responseTime = `${(diff[0] * 1e3 + diff[1] / 1e6).toFixed(3)} ms`;

      const logData: RequestDataType = {
        url: req.url,
        host: req.get('host') || '',
        baseUrl: req.baseUrl,
        hostname: req.hostname,

        ip: req.ip,
        ips: req.ips,
        location: req.headers['location'],
        userAgent: req.headers['user-agent'],
        connection: req.headers['connection'],
        authorization: req.headers['authorization'],

        path: req.path,
        body: req.body,
        query: req.query,
        params: req.params,

        method: req.method,
        httpVersion: req.httpVersion,

        responseTime,
        responseStatus: res.statusCode,
      };

      const logPath = path.join(
        './',
        `${options.folder}/${todayString}.${options.logFileFormat}`
      );

      if (options.folder && !fs.existsSync(options.folder)) {
        fs.mkdirSync(options.folder, { recursive: true });
      }

      const logLine = JSON.stringify(logData) + '\n';

      fs.appendFile(logPath, logLine, (error) => {
        if (error) {
          console.error('Failed to write log:', error);
        }
      });

      await db.connection.run(
        `INSERT INTO request_logs (
            url, host, baseUrl, hostname, ip, ips, location,
            userAgent, connection, auth, path,
            body, query, params,
            method, httpVersion, responseTime, responseStatus
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          logData.url || '',
          logData.host || '',
          logData.baseUrl || '',
          logData.hostname || '',
          logData.ip || '',
          logData.ips.join(','),
          logData.location || '',
          logData.userAgent || '',
          logData.connection || '',
          logData.authorization || '',
          logData.path || '',
          JSON.stringify(logData.body || {}),
          JSON.stringify(logData.query || {}),
          JSON.stringify(logData.params || {}),
          logData.method || '',
          logData.httpVersion || '',
          responseTime || '',
          logData.responseStatus,
        ]
      );

      let dataResult = await db.connection.run(`SELECT * FROM request_logs`);

      let rows = await dataResult.getRowsJS();

      console.log(rows);
    });

    next();
  };
}
