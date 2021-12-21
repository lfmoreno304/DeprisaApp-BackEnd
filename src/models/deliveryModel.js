const { Schema, model } = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.MONGODB_URI);
const AutoIncrement = AutoIncrementFactory(connection);


const deliverySchema = new Schema({
    serviceOrder: {
        type: Schema.Types.ObjectId, refPath: "PickUp"
    },
    courier: {
        type: Schema.Types.ObjectId, ref: "Users"
    },
    deliveryDimensions: {
        type: String,
        required:[true, 'Las dimensiones son requeridas']
    },
    deliveryWeight: {
        type: Number,
        required: [true, 'El peso aproximado es requerido']
    },
    deliveryValue: {
        type: Number,
        required: [true, 'El valor del paquete es requerido']
    },
    deliveryInsurance: {
        type: Number,
        required: [true, 'El valor del seguro es requerido']
    },
    deliveryCost: {
        type: Number,
        required: [true, 'El costo del envío es requerido']
    },
    deliveryState: {
        type: Number,
        required: [true, 'El estado del envío es requerido']
    },
    deliveryDate: {
        type: Date
    }
},
{
    collection: 'Deliveries'
})

deliverySchema.plugin(AutoIncrement, {inc_field: 'trackingNumber'})

module.exports = model('Delivery',deliverySchema);