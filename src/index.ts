import { Request, Response, NextFunction } from 'express';

import { requestLogger } from './middlewares/logger.middleware';
import { monitoringView } from './middlewares/monitoring.middleware';

export class Metriuo {
  public static metriuoInstance: Metriuo;

  private constructor() {}

  public static initialize(): Metriuo {
    Metriuo.metriuoInstance = new Metriuo();
    return Metriuo.metriuoInstance;
  }

  public monitoring(req: Request, res: Response, next: NextFunction) {
    return monitoringView(req, res, next);
  }

  public logger() {
    return requestLogger();
  }
}
