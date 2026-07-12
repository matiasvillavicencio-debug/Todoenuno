import { Router } from "express";
import * as discoController from "../controllers/discoController.js";

const discoRouter = Router();

discoRouter.get('/', discoController.getDiscos);
discoRouter.get('/:id', discoController.getDiscoById);
discoRouter.post('/', discoController.saveDisco);
discoRouter.put('/:id', discoController.updateDisco);
discoRouter.delete('/:id', discoController.deleteDisco);

export default discoRouter;