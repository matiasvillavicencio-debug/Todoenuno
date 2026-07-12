import { Router } from "express";
import { crearCancion, obtenerCanciones, actualizarCancion, eliminarCancion } from "../controllers/CancionController.js";
import validarToken from "../middlewares/auth.js";

const cancionRouter = Router();

cancionRouter.get('/', obtenerCanciones);
cancionRouter.post('/', validarToken, crearCancion);
cancionRouter.put('/:id', validarToken, actualizarCancion);
cancionRouter.delete('/:id', validarToken, eliminarCancion);

export default cancionRouter;