require('dotenv').config();

const express = require('express');
const cookieParser = require("cookie-parser"); 
const { dbConnect } = require('./src/database/db');

const app = express();
const port = process.env.PORT || 9000;
const userRoutes = require('./src/routes/usersRouter');

app.use(express.json());
app.use(cookieParser());

app.use('/api', userRoutes);

dbConnect();

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
