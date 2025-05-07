INSERT INTO request_logs (
      url, host, baseUrl, hostname, ip, ips, location,
      userAgent, connection, authorization, path,
      body, query, params,
      method, httpVersion, responseTime, responseStatus
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)