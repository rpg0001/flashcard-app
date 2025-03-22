import { Router } from "express";
import * as DeckController from "../controllers/deckController";
import * as CardController from "../controllers/cardController";

const router = Router();

// Deck routes
router.get("/:id", DeckController.getDeck);
router.get("", DeckController.listDecks);
router.post("", DeckController.createDeck);
router.patch("/:id", DeckController.updateDeck);
router.delete("/:id", DeckController.deleteDeck);

// Card routes
router.get("/:deckId/cards/:cardId", CardController.getCard);
router.get("/:deckId/cards", CardController.listCards);
router.post("/:deckId/cards", CardController.createCard);
router.patch("/:deckId/cards/:cardId", CardController.updateCard);
router.delete("/:deckId/cards/:cardId", CardController.deleteCard);

export default router;
