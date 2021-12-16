const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;

const dbConnect = async () => {
    await mongoose.connect(URI, {
    useNewUrlParser: true,

    useUnifiedTopology: true
    })
    .then(()=> console.log('Connected to database'))
    .catch(err => console.log(err));

}

exports.dbConnect = dbConnect;
