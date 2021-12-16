const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validateEmail, createRefreshToken, createAccessToken } = require('../utils/authUtils');

const userCtrl ={
    register: async (req, res) => {
        try {
            const { name, id, email, password, address, city, role} = req.body;
    
            if (!name || !id || !email || !password )
                return res
                .status(400)
                .json({ msg: "Por favor rellena todos los campos." });
    
            if (!validateEmail(email))
            return res.status(400).json({ msg: "Correo invalido" });
    
            const user = await Users.findOne({ email });
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
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ msg: "Este correo no existe." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
            return res.status(400).json({ msg: "Contraseña es incorrecta" });

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/user/refresh_token",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.json({ msg: "Has iniciado sesión" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token)
            return res.status(400).json({ msg: "Inicia sesión ahora!" });

            jwt.verify(rf_token, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
            if (err) return res.status(400).json({ msg: "Inicia sesión ahora!" });

            const access_token = createAccessToken({ id: user.id });
            res.json({ access_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
            return res.json({ msg: "Desconectado" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};


module.exports = userCtrl;