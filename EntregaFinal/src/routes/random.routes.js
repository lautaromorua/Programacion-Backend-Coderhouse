import { Router } from "express";
const router = Router()

import { randoms } from "../controllers/random.controller.js";

router.get('/', randoms);

export default router;