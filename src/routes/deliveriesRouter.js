const router = require('express').Router();
const Delivery = require('../models/deliveryModel');

// Create new delivery
router.post('/delivery', async (req, res) => {
    const { serviceOrder,
            courier,
            deliveryDimensions,
            deliveryWeight,
            deliveryValue,
            deliveryInsurance,
            deliveryCost,
            deliveryState,
            deliveryDate } = req.body;

    if(!serviceOrder || !courier || !deliveryDimensions || 
    !deliveryWeight || !deliveryValue || !deliveryInsurance || 
    !deliveryCost || !deliveryState || !deliveryDate)
    return res
    .status(400)
    .json({ msg: "Por favor rellena todos los campos."})

    const newDelivery = new Delivery({
        serviceOrder,
        courier,
        deliveryDimensions,
        deliveryWeight,
        deliveryValue,
        deliveryInsurance,
        deliveryCost,
        deliveryState,
        deliveryDate
    })

    await newDelivery.save();

    res.json({ msg: "Datos enviados correctamente" })
})

// Mostrar todos los envíos
router.get('/delivery', async (req, res)=>{
    const deliveries = await Delivery.find()
    .populate('courier',["name"])
    .populate('serviceOrder')
    return res
    .status(200)
    .json({ deliveries })
})


module.exports = router;

