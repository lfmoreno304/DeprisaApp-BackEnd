const jwt = require('jsonwebtoken');

//Validar correos con la expresión regular
function validateEmail(email) {
    const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
};
  //Actualiza el token
    const createRefreshToken = (payload) => {
        return jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN, {
        expiresIn: "7d",
    });
};
  //Crea el token
    const createAccessToken = (payload) => {
        return jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: "15m",
    });
};


module.exports = {
  validateEmail: validateEmail,
  createAccessToken: createAccessToken,
  createRefreshToken: createRefreshToken
}