const jwt = require('jsonwebtoken');
const createError = require('http-errors')

// modulo que exporta un Middleware
module.exports = async (req,res,next) => {
    try {

        // recoger el jwtToken de la cabecera, o del body, o en el query string
        const jwtToken = req.get('Authorization') || req.body.jwt || req.query.jwt;
        
        // comprobar que me han pasado un jwtToken
        if (!jwtToken) {
            const error = createError(401,'No jwt token provided');
            next(error);
            return
        }
        
        // comprobamos que el tocken es válido
        const payload = await jwt.verify(jwtToken, process.env.JWT_SECRET);


        next();

    } catch(err) {
        if (err.message === 'invalid signature') {
            next(createError(401,'Invalid token'));
        }
        next(err)
    }
        

}