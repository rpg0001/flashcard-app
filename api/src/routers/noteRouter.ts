import { Router } from "express";
import * as NoteController from "../controllers/noteController";

const router = Router();

router.get("/:id", NoteController.getNote);
router.get("", NoteController.listNotes);
router.post("", NoteController.createNote);
router.patch("/:id", NoteController.updateNote);
router.delete("/:id", NoteController.deleteNote);

export default router;
