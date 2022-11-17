import { Router } from "express";
const router = Router()

import datos from "../controllers/datos.controller.js";

router.get('/', datos);

export default router;