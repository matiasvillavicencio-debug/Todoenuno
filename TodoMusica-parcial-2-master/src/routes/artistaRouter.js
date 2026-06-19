import { Router } from "express";
import * as artistaController from "../controllers/artistaController.js";

const artistaRouter = Router();

artistaRouter.get('/', artistaController.getArtistas);
artistaRouter.post('/', artistaController.saveArtista);

export default artistaRouter;