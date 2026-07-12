// Importa todas las rutas exporta el router 
import userRouter from './userRouter.js';
import artistaRouter from './artistaRouter.js';
import discoRouter from './discoRouter.js';

import validarToken from '../middlewares/auth.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/artistas', validarToken, artistaRouter);
    app.use('/api/discos', discoRouter);
}

export default routerAPI;