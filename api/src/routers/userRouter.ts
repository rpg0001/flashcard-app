import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.get("/:id", UserController.getUser);
router.get("", UserController.listUsers);

export default router;
