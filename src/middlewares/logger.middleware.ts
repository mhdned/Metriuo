import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

import { LoggerOptionsType } from './../types/logger.type';
import { RequestDataType } from './../types/metriuo.types';

export function requestLogger(options: LoggerOptionsType) {
  const today: Date = new Date();
  const todayString: string = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  return (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();

    res.on('finish', () => {
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

      if (!fs.existsSync(options.folder)) {
        fs.mkdirSync(options.folder, { recursive: true });
      }

      const logLine = JSON.stringify(logData) + '\n';

      fs.appendFile(logPath, logLine, (error) => {
        if (error) {
          console.error('Failed to write log:', error);
        }
      });
    });

    next();
  };
}
