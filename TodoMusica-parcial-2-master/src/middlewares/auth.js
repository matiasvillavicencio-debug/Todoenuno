import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const validarToken = ( req, res, next) =>{
    const token = req.headers.authorization;
    if( !token){
        res.status(401).json({ msg: 'No se paso el JWT'});
    }
    // Verificamos el token
    const jwt = token.split(' ')[1];
    console.log(jwt);
    jsonwebtoken.verify( jwt, SECRET_KEY, (error, decoded) => {
        if( error){
            res.status(403).json({msg: 'Token Invalido'});
        }
        console.log( { decoded})
        req.body.userId = decoded._id;
    })
    next();
}
export default validarToken;