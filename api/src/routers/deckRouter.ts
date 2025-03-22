import { Router } from "express";
import * as DeckController from "../controllers/deckController";

const router = Router();

router.get("/:id", DeckController.getDeck);
router.get("", DeckController.listDecks);
router.post("", DeckController.createDeck);
router.patch("/:id", DeckController.updateDeck);
router.delete("/:id", DeckController.deleteDeck);

export default router;
