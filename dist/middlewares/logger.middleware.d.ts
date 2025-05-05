import { Request, Response, NextFunction } from 'express';
import { LoggerOptionsType } from './../types/logger.type';
export declare function requestLogger(options: LoggerOptionsType): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=logger.middleware.d.ts.map