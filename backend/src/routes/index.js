import userRouter from './userRouter.js';
import artistaRouter from './artistaRouter.js';
import discoRouter from './discoRouter.js';
import cancionRouter from './CancionRoute.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/artistas', artistaRouter);
    app.use('/api/discos', discoRouter);
    app.use('/api/canciones', cancionRouter);
}

export default routerAPI;