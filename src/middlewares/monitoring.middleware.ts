import ejs from 'ejs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

import { DuckDatabaseService } from './../services/duckdb.service';

const viewPath = path.join(__dirname, '../views/monitoring.ejs');

export async function monitoringView(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Read json file information from a singleton class
  const db = await DuckDatabaseService.createInstance();
  const requestLogInformations = await db.read(0, 10);

  // Render the template engine

  // Finish job
  ejs.renderFile(viewPath, { logs: requestLogInformations }, (error, html) => {
    if (error) {
      console.error('EJS render error:', error);
      return res.status(500).send('Internal Server Error');
    }
    return res.send(html);
  });
}
