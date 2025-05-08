import { MetriuoOptionsType } from './types/monitoring.type';
import { requestLogger } from './middlewares/logger.middleware';

export class Metriuo {
  public static metriuoInstance: Metriuo;

  public folder: string;
  public logFileFormat: 'json' | 'txt';

  private constructor(options: MetriuoOptionsType) {
    this.folder = options.folder ?? './log';
    this.logFileFormat = options.logFileFormat ?? 'json';
  }

  public static initialize(options: MetriuoOptionsType): Metriuo {
    Metriuo.metriuoInstance = new Metriuo(options);
    return Metriuo.metriuoInstance;
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
