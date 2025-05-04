const express = require('express');
const app = express();
const requestLogger = require('metriuo').default;

app.use(
  requestLogger({
    logFolder: './logs',
  })
);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
