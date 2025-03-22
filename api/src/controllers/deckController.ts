
import { BadRequestError, ForbiddenError, NotFoundError } from '../utils/errors';
import * as DeckService from '../services/deckService';
import { logger } from '../utils/logger';

export async function getDeck(req: any, res: any, next: any) {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        const deck = await DeckService.getDeck(req.params.id);
        if (!deck) throw new NotFoundError(`Could not find deck with id ${id}`);
        if (deck.userId !== req.user.id) throw new ForbiddenError(`User id ${req.user.id} does not match deck user id ${deck.userId}`);
        
        logger.info("getDeck: success. deckId: " + deck.id);
        res.status(200).json(deck);
    } catch (error: any) {
        logger.info("getDeck: error with status " + error.status + ". deckId: " + id);
        next(error);
    }
}

export async function listDecks(req: any, res: any, next: any) {
    const userIdString = req.user?.id;
    try {
        const userId = userIdString;
        if (userIdString && isNaN(userId)) throw new BadRequestError('/user', 'userId must be a number');

        const decks = await DeckService.listDecks(userIdString ? userId : null);

        logger.info("listDecks: success. Decks found: " + decks.length);
        return res.status(200).json(decks);
    } catch (error: any) {
        logger.info("listDecks: error with status " + error.status + ". userId: " + userIdString);
        next(error);
    }
}

export async function createDeck(req: any, res: any, next: any) {
    const userIdString = req.user?.id;
    try {
        const name = req.body?.name;
        const description = req.body?.description;

        if (!name) throw new BadRequestError('/body/name', 'missing required field');
        if (!description) throw new BadRequestError('/body/description', 'missing required field');

        const userId = Number(userIdString);
        const deck = await DeckService.createDeck(name, description, userId);

        logger.info("createDeck: success. deckId " + deck?.id + ". userId: " + userIdString);
        return res.status(201).json(deck);
    } catch (error: any) {
        logger.info("createDeck: error with status " + error.status + ". userId: " + userIdString);
        next(error);
    }
}

export async function updateDeck(req: any, res: any, next: any) {
    const id = Number(req.params?.id);
    try {
        const name = req.body?.name;
        const description = req.body?.description;

        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');
        if (!name && !description) throw new BadRequestError('/body', 'missing required field: name, description');
        if (name && name.length > 255) throw new BadRequestError('/body/name', 'name must be 255 characters or less');
        if (description && description.length > 1023) throw new BadRequestError('/body/description', 'description must be 1023 characters or less');

        const deck = await DeckService.getDeck(id);
        if (!deck) throw new NotFoundError(`Could not find deck with id ${id}`);
        if (deck.userId !== req.user?.id) throw new ForbiddenError(`User id ${req.user.id} does not match deck user id ${deck.userId}`);
        
        const updatedDeck = await DeckService.updateDeck(id, name, description);

        logger.info("updateDeck: success. deckId " + id);
        return res.status(200).json(updatedDeck);
    } catch (error: any) {
        logger.info("updateDeck: error with status " + error.status + ". deckId: " + id);
        next(error);
    }
}

export async function deleteDeck(req: any, res: any, next: any) {
    const id = Number(req.params?.id);
    try {
        if (isNaN(id)) throw new BadRequestError('/id', 'id must be a number');

        const deck = await DeckService.getDeck(id);
        if (!deck) throw new NotFoundError(`Could not find deck with id ${id}`);
        if (deck.userId !== req.user?.id) throw new ForbiddenError(`User id ${req.user.id} does not match deck user id ${deck.userId}`);
        
        await DeckService.deleteDeck(req.params.id);

        logger.info("deleteDeck: success. deckId " + id);
        return res.status(204).json();
    } catch (error: any) {
        logger.info("deleteDeck: error with status " + error.status + ". deckId: " + id);
        next(error);
    }
}