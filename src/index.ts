import { Request, Response, NextFunction } from "express";

interface RequestLoggerOptions {
  message?: string;
  timestamp?: boolean;
}

export default function requestLogger(options?: RequestLoggerOptions) {
  const defaultOptions: RequestLoggerOptions = {
    message: "Hello World",
    timestamp: true,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (req: Request, res: Response, next: NextFunction) => {
    let logMessage = "";

    if (mergedOptions.timestamp) {
      logMessage += `${new Date().toISOString()} - `;
    }

    logMessage += mergedOptions.message;

    console.log(logMessage);
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);

    next();
  };
}
