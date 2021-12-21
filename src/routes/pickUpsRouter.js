const router = require('express').Router();
const Pickup = require('../models/pickUpModel');

// Create pick up
router.post('/pickup', async (req, res) => {
    const { sender,
            pickupDate,
            pickupTime,
            pickUpDimensions,
            isDelicated,
            aproxxWeight,
            senderAddress,
            senderCity,
            senderDepartment,
            senderName,
            senderId,
            addresseeAddress,
            addresseeCity,
            addresseeDepartment,
            addresseeName,
            addresseeId } = req.body;

    if (!sender || !pickupDate || !pickupTime || !pickUpDimensions
        || !isDelicated || !aproxxWeight || !senderAddress || !senderCity
        || !senderDepartment || !senderName || !senderId || !addresseeAddress 
        || !addresseeCity || !addresseeDepartment || !addresseeName || !addresseeId)
        return res
        .status(400)
        .json({ msg: "Por favor rellena todos los campos." })

    const newPickup = new Pickup({
        sender,
        pickupDate,
        pickupTime,
        pickUpDimensions,
        isDelicated,
        aproxxWeight,
        senderAddress,
        senderCity,
        senderDepartment,
        senderName,
        senderId,
        addresseeAddress,
        addresseeCity,
        addresseeDepartment,
        addresseeName,
        addresseeId
    })

    await newPickup.save();

    res.json({ msg: "Datos enviados correctamente" });
})

// Mostrar todas las recogidas programadas
router.get('/pickup', async (req, res)=> {
    const pickups = await Pickup.find()
    .populate('sender',["name","id"])
    return res.status(200).json({ pickups })
})

// Mostrar recogidas programadas por usuario
router.get('/pickup/:id', async (req, res)=>{
    const userPickups = await Pickup.find()
    .populate('sender',["name","id"])
    .where({sender: req.params.id})
    return res.status(200).json({ userPickups })
})

module.exports = router;