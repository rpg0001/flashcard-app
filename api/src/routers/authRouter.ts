import { Router } from "express";
import * as AuthController from "../controllers/authController";

const router = Router();

router.post("/signin", AuthController.signIn);
router.post("/signup", AuthController.signUp);
router.post("/signout", AuthController.signOut);
router.get("/me", AuthController.getMe);
router.post("/signupadmin", AuthController.signUpAdmin);

export default router;
