require('dotenv').config();

// глобальные импорты
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

// локальные импорты
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralizeErrorHandler = require('./middlewares/centralize-error-handler');
const limiter = require('./utils/rate-limiter');

// переменные окружения
const PORT = process.env.PORT || 3000;
const DB_CONN = process.env.DB_CONN
  || 'mongodb://localhost:27017/moviesdb'; // резервания облачная БД mongodb+srv://admin:admin@cluster0.zzbidms.mongodb.net/?retryWrites=true&w=majority
const app = express();

app.use(requestLogger); // логгер запросов
app.use(bodyParser.json());
app.use(limiter);
app.use(cors({ origin: ['https://moviexp.nomoredomains.xyz/', 'http://localhost:3000'] }));
app.use(routes);
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(centralizeErrorHandler); // централизованный обработчик ошибок

mongoose.connect(DB_CONN);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
