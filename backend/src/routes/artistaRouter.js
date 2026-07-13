import { Router } from "express";
import * as artistaController from "../controllers/artistaController.js";
import validarToken from "../middlewares/auth.js";

const artistaRouter = Router();

artistaRouter.get('/', artistaController.getArtistas);
artistaRouter.get('/:id', artistaController.getArtistaById);

artistaRouter.post('/', validarToken, artistaController.saveArtista);
artistaRouter.put('/:id', validarToken, artistaController.updateArtista);
artistaRouter.delete('/:id', validarToken, artistaController.deleteArtista);

export default artistaRouter;