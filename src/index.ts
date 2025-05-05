import { MetriuoOptionsType } from './types/monitoring.type';
import { requestLogger } from './middlewares/logger.middleware';

class Metriuo {
  public static metriuoInstance: Metriuo;

  private folder: string;
  private logFileFormat: 'json' | 'txt';

  private constructor(options: MetriuoOptionsType) {
    this.folder = options.folder;
    this.logFileFormat = options.logFileFormat ?? 'json';
  }

  public static setup(options: MetriuoOptionsType): Metriuo {
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

module.exports = Metriuo;
