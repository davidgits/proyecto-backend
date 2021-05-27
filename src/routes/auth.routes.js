import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import {veryfySignup} from '../middlewares'

router.post("/signup", veryfySignup.checkDuplicate, authCtrl.signUp);
router.post("/signin", authCtrl.signIn);

export default router;
