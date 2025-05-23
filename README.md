# Metriuo

![METRIUO](./public/images/MetriuoBannerDark.png#gh-dark-mode-only) ![metriuo](./public/images/MetriuoBannerLight.png#gh-light-mode-only)

Metriuo is my experimental attempt to solve a simple yet persistent problem: **logging useful request data without drowning in complexity**. Think of it as your personal HTTP historian—writing logs for every request quietly in the background, but now in a powerful local database instead of plain files.

## Overview

This package captures request information in Express apps and saves it inside a local [DuckDB](https://duckdb.org/) database. Perfect for building custom dashboards, R&D, or just keeping an eye on what's hitting your server. Inspired by tools like [apitally.io/express](https://apitally.io/express), but simpler, more transparent, and customizable.

## Current Features

- Logs detailed request data directly into DuckDB database (no more JSON or TXT files)
- Offers an optional **monitoring endpoint** to query and display logged data with useful stats and insights
- Minimal setup, extensible for future improvements

## Vision

In the future, Metriuo will do more than just log data:

- Expose a **dedicated UI endpoint** like Swagger or Redoc showing stats and insights
- Help developers **analyze traffic patterns** and potential misuse
- Offer **visualizations** of request frequency, latency, endpoints, and more

## Installation

```bash
npm install metriuo
```

## Usage

```js
const express = require('express');
const { Metriuo } = require('metriuo');

const app = express();

const metriuo = Metriuo.initialize();

app.use(metriuo.logger());

app.use('/metriuo', metriuo.monitoring);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

- `metriuo.logger()` — middleware to log incoming requests
- `/metriuo` — endpoint serving monitoring data and stats

## Logged Request Data Parameters

| Parameter        | Type                  | Description                                                          |
| ---------------- | --------------------- | -------------------------------------------------------------------- |
| `url`            | `string`              | Full request URL including path and query                            |
| `host`           | `string`              | Host header of the request (e.g., `localhost:3000`)                  |
| `baseUrl`        | `string`              | The URL path on which the router instance was mounted                |
| `hostname`       | `string`              | Hostname from the request                                            |
| `ip`             | `string \| undefined` | IP address of the client making the request                          |
| `ips`            | `string[]`            | Array of IP addresses if the request passed through proxies          |
| `location`       | `string \| undefined` | Geolocation info if available (requires additional setup)            |
| `userAgent`      | `string \| undefined` | User-Agent header string (browser, bot, etc.)                        |
| `connection`     | `string \| undefined` | Connection header information (e.g., keep-alive)                     |
| `authorization`  | `string \| undefined` | Authorization header content (e.g., Bearer tokens)                   |
| `path`           | `string`              | URL path part only (without query)                                   |
| `body`           | `object`              | Parsed request body (for POST/PUT requests)                          |
| `query`          | `object`              | Parsed query parameters from URL                                     |
| `params`         | `object`              | URL route parameters                                                 |
| `method`         | `string`              | HTTP method (GET, POST, PUT, DELETE, etc.)                           |
| `httpVersion`    | `string`              | HTTP version used (e.g., "1.1", "2.0")                               |
| `responseTime`   | `string \| null`      | Time taken to respond, in milliseconds with unit (e.g., `"5.23 ms"`) |
| `responseStatus` | `number`              | HTTP response status code (e.g., 200, 404, 500)                      |

## Technologies

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,nodejs,express" />
  </a>
</p>

## Contents

- ✅ Request info logging into DuckDB
- ✅ Configurable monitoring endpoint
- 🚧 UI dashboard & detailed analytics (planned)
- 🚧 Enhanced error logging and alerting (planned)

## License

MIT License
Feel free to use, tweak, break, or improve.

## Author

Developed by [Mehtiuo](https://github.com/mhdned)
