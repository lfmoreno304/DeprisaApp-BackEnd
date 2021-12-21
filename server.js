require('dotenv').config();

const express = require('express');
const cookieParser = require("cookie-parser"); 
const { dbConnect } = require('./src/database/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;
const userRoutes = require('./src/routes/usersRouter');
const pickUpRoutes = require('./src/routes/pickUpsRouter');
const deliveryRoutes = require('./src/routes/deliveriesRouter')


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', pickUpRoutes);
app.use('/api', deliveryRoutes);


dbConnect();

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
