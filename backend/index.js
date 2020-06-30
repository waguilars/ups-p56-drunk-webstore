const express = require('express');

require('./config/env');

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`The server is running at port http://localhost:${process.env.PORT}`);
});

