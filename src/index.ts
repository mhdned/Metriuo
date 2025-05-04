import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

import { MetriuoOptions, RequestDataType } from './metriuo.types';
import { MetriuoOptionsType } from './types/monitoring.type';

export class Metriuo {
  public static metriuoInstance: Metriuo;

  private folder: string;
  private logFileFormat: string;

  private constructor(options: MetriuoOptionsType) {
    this.folder = options.folder;
    this.logFileFormat = options.logFileFormat ?? 'json';
  }

  public static setup(options: MetriuoOptionsType): Metriuo {
    Metriuo.metriuoInstance = new Metriuo(options);
    return Metriuo.metriuoInstance;
  }

  public static monitoring() {
    return;
  }

  public static logger() {
    return;
  }
}

export default function requestLogger(options: MetriuoOptions = {}) {
  const { logFolder = '/logs', logFormat = 'json' } = options;

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
        `${logFolder}/${todayString}.${logFormat}`
      );

      if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder, { recursive: true });
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
