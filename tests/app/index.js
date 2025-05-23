const express = require('express');
const app = express();

const { Metriuo } = require('metriuo');

const metriuo = Metriuo.initialize();

app.use(metriuo.logger());

app.use('/metriuo', metriuo.monitoring);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
