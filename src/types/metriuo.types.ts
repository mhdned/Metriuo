export interface RequestDataType {
  url: string;
  host: string;
  baseUrl: string;
  hostname: string;

  ip: string | undefined;
  ips: string[];
  location: string | undefined;
  userAgent: string | undefined;
  connection: string | undefined;
  authorization: string | undefined;

  path: string;
  body: object;
  query: object;
  params: object;

  method: string;
  httpVersion: string;

  responseTime: string | null;
  responseStatus: number;
}

export interface MetriuoOptions {
  logFolder?: string;
  logFormat?: 'txt' | 'json';
}
