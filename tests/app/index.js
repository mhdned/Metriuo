const express = require('express');
const app = express();

const Metriuo = require('metriuo');

const monitoringAPI = Metriuo.setup({
  folder: './logs',
  logFileFormat: 'json',
});

app.use(monitoringAPI.logger());

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
