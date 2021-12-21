const router = require('express').Router();
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateEmail, createRefreshToken, createAccessToken } = require('../utils/authUtils');

// Create User
router.post('/user/register', async (req, res) => {
    const { name, id, email, password, address, city, role} = req.body;
    console.log(req.body);
    if (!name || !id || !email || !password )
        return res
        .status(400)
        .json({ msg: "Por favor rellena todos los campos." });
    
    if (!validateEmail(email))
        return res.status(400).json({ msg: "Correo invalido" });
    
    const user =  await Users.findOne({ email });
    if (user) return res.status(400).json({ msg: "Este correo ya existe" });

    if (password.length < 8)
        return res
        .status(400)
        .json({ msg: "La contraseña debe tener al menos 8 caracteres" });
                
    
    const passwordHash = await bcrypt.hash(password, 12);
    
    const newUser = new Users({
        name,
        id,
        email,
        password: passwordHash,
        address,
        city,
        role
    }); 

    await newUser.save();

    res.json({ msg: "Te has registrado correctamente!" });
});

// Mostrar Clientes
router.get('/user/customer', async (req, res) => {
    const users = await Users.find().where({ role:'Cliente'})
    res.status(200).json({ users })
})

// Mostrar Mensajeros
router.get('/user/employee', async (req, res) => {
    const users = await Users.find().where({ role:'Mensajero'})
    res.status(200).json({ users })
})

// Encontrar Cliente
router.get('/user/customer/:id', async (req, res) => {
    const user = await Users.findById(req.params.id);
    res.status(200).json({ user })
})

// Encontrar Empleado
router.get('/user/employee/:id', async (req, res) => {
    const user = await Users.findById(req.params.id);
    res.status(200).json({ user })
})

// Eliminar Cliente
router.delete('/user/customer/:id', async (req, res) => {
    const user = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg:"Usuario eliminado exitosamente"})
})
// Actualizar Cliente
router.put('/user/customer/:id', async (req, res) => {
    const { email, password, address, city } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    await Users.findByIdAndUpdate(req.params.id,{
        email, password: passwordHash, address, city
    })
    res.status(200).json({ msg: 'Datos actualizados exitosamente'})
})

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Este correo no existe." });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch)
    return res.status(400).json({ msg: "Contraseña es incorrecta" });

    const refresh_token = createRefreshToken({ id: user._id });
    res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/user/refresh_token",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ msg: "Has iniciado sesión" });
})

// Logout
router.get('/logout', async (req, res) => {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
        return res.json({ msg: "Desconectado" });
})

// Refresh access token
router.post('/refresh_token', async (req, res) => {
    jwt.verify(rf_token, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
    if (err) return res.status(400).json({ msg: "Inicia sesión ahora!" });

    const access_token = createAccessToken({ id: user.id });
    res.json({ access_token });
    });
})

module.exports = router;