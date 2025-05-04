import { MetriuoOptions } from './metriuo.types';
import { Request, Response, NextFunction } from 'express';
export default function requestLogger(options?: MetriuoOptions): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=index.d.ts.map