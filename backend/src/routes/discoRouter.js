import { Router } from "express";
import * as discoController from "../controllers/discoController.js";
import validarToken from "../middlewares/auth.js";

const discoRouter = Router();

discoRouter.get('/', discoController.getDiscos);
discoRouter.get('/:id', discoController.getDiscoById);
discoRouter.post('/', validarToken, discoController.saveDisco);
discoRouter.put('/:id', validarToken, discoController.updateDisco);
discoRouter.delete('/:id', validarToken, discoController.deleteDisco);

export default discoRouter;