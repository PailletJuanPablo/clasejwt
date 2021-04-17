const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // Proceso de decodificación del token

    // El cliente me enviará el token en el Header Authorization
    // El formato en que lo enviará será el string Bearer, seguido de un espacio y el token
    // Por eso el método decode() tomará el valor del header authorization y
    // pero antes reemplazará 'Bearer ' por un string vacío, para que nos quede solo el Token
    const user = jwt.decode(req.headers.authorization.replace('Bearer ', ''));
    // Si el token no se puede decodificar el método devuelve null (el lo mismo que false, undefined, etc)
    if (!user) {
        return res.send({ error: 'No se pudo verificar el usuario' });
    }
    // Caso contrario, puede continuar
    console.log(user)
    req.user = user;
    return next();



}