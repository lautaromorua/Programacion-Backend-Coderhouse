import { Router } from "express";
const router = Router()

import { randoms } from "../controllers/controllerRandom.js";

router.get('/', randoms);

export default router;