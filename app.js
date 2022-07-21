const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.zzbidms.mongodb.net/?retryWrites=true&w=majority',
);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
