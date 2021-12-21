const { Schema, model } = require('mongoose');

const pickUpSchema = new Schema({
        sender: {
            type: Schema.Types.ObjectId, ref: "Users"
        },
        pickupDate: {
            type: Date,
            required: [true, 'La fecha de recogida es obligatoria']
        },
        pickupTime: {
            type: String,
            required: [true, 'La franja horaria es obligatoria']
        },
        pickUpDimensions: {
            type: String,
            required:[true, 'Las dimensiones son requeridas']
        },
        isDelicated: {
            type: Boolean
        },
        aproxxWeight: {
            type: Number,
            required: [true, 'El peso aproximado es requerido']
        },
        senderAddress: {
            type: String,
            required: [true, 'Dirección del remitente requerida']
        },
        senderCity: {
            type: String,
            required: [true, 'Ciudad del remitente requerida']
        },
        senderDepartment: {
            type: String,
            required: [true, 'Departamento del remitente requerido']
        },
        senderName: {
            type: String,
            required: [true, 'Nombre del remitente requerido']
        },
        senderId: {
            type: Number,
            required: [true, 'Identificación del remitente requerida']
        },
        addresseeAddress: {
            type: String,
            required: [true, 'Dirección del destinatario requerida']
        },
        addresseeCity: {
            type: String,
            required: [true, 'Ciudad del destinatario requerida']
        },
        addresseeDepartment: {
            type: String,
            required: [true, 'Departamento del destinatario requerido']
        },
        addresseeName: {
            type: String,
            required: [true, 'Nombre del destinatario requerido']
        },
        addresseeId: {
            type: Number,
            required: [true, 'Identificación del destinatario requerida']
        }
},
{
    collection: 'Pickups'
})

module.exports = model('Pickup',pickUpSchema);