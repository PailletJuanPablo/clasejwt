const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Proceso de generación del token

// Tanto en register como login, generamos el token con jwt.decode() 
// y se lo devolvemos al cliente, para que el cliente lo almacene y nos lo envíe en las siguientes peticiones
const stringSecreto = '1234secretoasdads*dqjkll.dqsqs';
// Este string se utilizará para generar el token cuando llamemos al método sign()
const register = async (req, res) => {
    const user = await User.create(req.body);
    // Llamamos al método toJSON() para que se pueda encodear (cuestion de sequelize)
    const token = jwt.sign(user, stringSecreto);
    return res.send({user, token});
}

const login = async(req, res) => {
    const user = await User.findOne({where: {email: req.body.email}});
    if(!user) {
        return res.send({error: 'No existe usuario'})
    }
    if(user.password == req.body.password) {
        const token = jwt.sign(user.toJSON(), stringSecreto);
        return res.send({user, token})
    }
    return res.send({error: 'Credenciales incorrectas'})
}

const saludar = (req, res) => {
    return res.send({user: req.user})
}

module.exports = {register, login, saludar}

