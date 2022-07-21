// глобальные импорты
const express = require('express');
const mongoose = require('mongoose');

// локальные импорты
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/movies', movieRouter);

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.zzbidms.mongodb.net/?retryWrites=true&w=majority',
);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
