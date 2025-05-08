export interface RequestDataType {
  url: string;
  host: string;
  baseUrl: string;
  hostname: string;

  ip?: string;
  ips: string[];
  location?: string;
  userAgent?: string;
  connection?: string;
  authorization?: string;

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
