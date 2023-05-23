const express = require('express');
const bodyParser = require('body-parser');
const employeeRouter = require('./routes/employeeRoutes');

const app = express();

// Parse request bodies as JSON
app.use(bodyParser.json());

// Set up employee routes
app.use('/employees', employeeRouter);

// connect the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
