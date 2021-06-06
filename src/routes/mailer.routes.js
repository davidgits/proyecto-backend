import { Router } from "express";
const router = Router();

import * as mailerCtrl from "../controllers/mailer.controller";

router.post("/send-email", mailerCtrl.sendEmail);

export default router;
