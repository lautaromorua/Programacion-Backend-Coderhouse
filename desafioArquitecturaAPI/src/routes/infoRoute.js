import { Router } from "express";
const router = Router()

import datos from "../controllers/controllerDatos.js";

router.get('/', datos);

export default router;