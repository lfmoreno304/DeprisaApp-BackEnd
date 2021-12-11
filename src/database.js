const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('Connected to database'))
.catch(err => console.log(err));

app.listen(port, ()=>{
    console.log(' DB Server listening on port', port);
});
