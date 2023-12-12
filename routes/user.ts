import { Router } from "express";
import {userLoginController,handleUserRegisterController} from "../controller/userController"
const router = Router();
router.post("/login",userLoginController)
router.post("/signup",handleUserRegisterController)

export default router;