const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: { 
        type: Number,
        unique: true,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: { 
        type: String
    }
},
{
    collection: 'Users'
});

module.exports = model('Users', userSchema);