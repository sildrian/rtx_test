import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
import cors from 'cors';

// routes 
import routes from './routes/index.js';

const port = config.service.port || 3000;

// 1. Set up the express app
var app = express();
app.use(cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 2. Require our routes into the application.
app.use(routes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// 3. Server listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

export default app;