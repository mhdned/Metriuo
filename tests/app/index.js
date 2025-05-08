const express = require('express');
const app = express();

const { Metriuo } = require('metriuo');

const metriuo = Metriuo.initialize({
  folder: './logs',
  logFileFormat: 'json',
});

app.use(metriuo.logger());

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
