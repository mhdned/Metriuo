# Metriuo

Metriuo is my experimental attempt to solve a simple yet persistent problem: **logging useful request data without drowning in complexity**. Think of it as your personal HTTP historian—writing logs for every request in either `json` or `txt` formats, quietly sitting in the background.

## Overview

This package captures request information in Express apps and saves it in structured log files. Perfect for building custom dashboards, R\&D, or just keeping an eye on what's hitting your server. Inspired by tools like [apitally.io/express](https://apitally.io/express), but simpler, more transparent, and customizable.

> Still in BETA. I'm exploring the best way to implement and publish this as an NPM package.

## Vision

In the future, Metriuo will do more than just log data:

- Expose a **dedicated endpoint** like Swagger or Redoc that shows stats and insights
- Help developers **analyze traffic patterns** and potential misuse
- Offer **visualizations** of request frequency, latency, endpoints, and more

For now, it’s a minimal logging tool, but it has big dreams.

## Installation

```bash
npm install metriuo
```

## Usage

```ts
import express from 'express';
import metriuo from 'metriuo';

const app = express();

app.use(express.json());
app.use(
  metriuo({
    logFolder: './logs', // optional
    logFormat: 'json', // or 'txt'
  })
);
```

## Sample Output (JSON)

```json
{
  "url": "/api/data",
  "host": "localhost:3000",
  "method": "GET",
  "ip": "::1",
  "responseTime": "3.214 ms",
  "responseStatus": 200
  // ... other details
}
```

## Technologies

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,nodejs,express" />
  </a>
</p>

## Contents

- ✅ Request info logging
- ✅ Configurable file format (`json` or `txt`)
- 🚧 R\&D in progress for UI endpoint
- 🚧 More detailed stats and error logging planned
- 🚧 Storing data inside a local database instance of txt or json files.

## License

MIT License
Feel free to use, tweak, break, or improve.

## Author

Developed by [Mehtiuo](https://github.com/mhdned)
