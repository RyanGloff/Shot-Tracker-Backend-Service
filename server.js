const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Connected to db"));

app.use(require('body-parser').json());
app.use('/api/course', require('./routes/course'));
app.use('/api/round', require('./routes/round'));

app.listen(4000, () => console.log('Server started on port: 4000'));