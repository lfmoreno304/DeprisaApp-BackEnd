const { Schema, model } = require('mongoose');

const deliverySchema = new Schema({
    delivery: {
        trackingNumber: {
            type: Number,
            unique: [true, 'Ya existe la orden de servicio'],
            required: [true, 'La orden de servicio es obligatoria']
        },
        courier: {
            type: String,
            required: [true, 'El nombre del mensajero es obligatorio']
        },
        deliveryDimensions: {
            type: Array,
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
        }
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
    collection = 'Deliveries'
})

module.exports = model('delivery',deliverySchema);