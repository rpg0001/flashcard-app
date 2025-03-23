import { Router } from "express";
import * as DeckController from "../controllers/deckController";
import * as CardController from "../controllers/cardController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

// Deck routes
router.get("/all", DeckController.listPublicDecks);
router.get("", requireAuth, DeckController.listUserDecks);
router.get("/:id", DeckController.getDeck);
router.post("", requireAuth, DeckController.createDeck);
router.patch("/:id", requireAuth, DeckController.updateDeck);
router.delete("/:id", requireAuth, DeckController.deleteDeck);

// Card routes
router.get("/:deckId/cards/:cardId", CardController.getCard);
router.get("/:deckId/cards", CardController.listCards);
router.post("/:deckId/cards", requireAuth, CardController.createCard);
router.patch("/:deckId/cards/:cardId", requireAuth, CardController.updateCard);
router.delete("/:deckId/cards/:cardId", requireAuth, CardController.deleteCard);

export default router;
