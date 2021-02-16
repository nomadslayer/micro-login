const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerDoc = require('./swaggerDoc');
const authRoutes = require('./routes/authenticate.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
swaggerDoc(app);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
