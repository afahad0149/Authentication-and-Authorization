const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 3000;
const URI = 'mongodb://127.0.0.1:27017/auth_stateful_db';

const app = express();

const corsConfig = {
  origin: 'http://localhost:4200',
  credentials: true,
  exposedHeaders: ['Authorization'],
};

app.use(cors(corsConfig));
app.use(express.json());

(async function bootstrap() {
  try {
    await mongoose.connect(URI);
    console.log('Connected to DB.');
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
  } catch (error) {
    console.log(error);
  }
})();
