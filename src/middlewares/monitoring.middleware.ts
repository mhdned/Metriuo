import { Request, Response, NextFunction } from 'express';

async function monitoringView() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Read json file information from a singleton class

    // Render the template engine

    // Finish job

    next();
  };
}
