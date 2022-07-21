// глобальные импорты
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

// локальные импорты
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const authRouter = require('./routes/auth');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(requestLogger); // логгер запросов
app.use('/', authRouter);
app.use(auth); // защита роутов авторизацией
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.zzbidms.mongodb.net/?retryWrites=true&w=majority',
);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
