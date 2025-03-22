import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.get("/:id", UserController.getUser);
router.get("", UserController.listUsers);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
