
import { BadRequestError, ForbiddenError, NotFoundError } from '../utils/errors';
import * as DeckService from '../services/deckService';
import { logger } from '../utils/logger';
import { AccessType } from '../utils/types';
import { DeckVisibility } from '../models/deckModel';

export async function getDeck(req: any, res: any, next: any) {
    const id = Number(req.params.id);
    try {
        if (isNaN(id)) 
            throw new BadRequestError('/id', 'id must be a number');

        const deck = await DeckService.getDeck(req.params.id);
        if (!deck) 
            throw new NotFoundError(`Could not find deck with id ${id}`);

        deck.checkAccess(req.user?.id, AccessType.READ);
        
        logger.info("getDeck: success. deckId: " + deck.id);
        res.status(200).json(deck);
    } catch (error: any) {
        logger.error("getDeck: error with status " + error.status + ". deckId: " + id);
        next(error);
    }
}

export async function listUserDecks(req: any, res: any, next: any) {
    const userIdString = req.user?.id;
    try {
        const userId = userIdString;
        if (userIdString && isNaN(userId)) 
            throw new BadRequestError('/user', 'userId must be a number');

        const decks = await DeckService.listDecks(userIdString ? userId : null);

        logger.info("listDecks: success. Decks found: " + decks.length);
        return res.status(200).json(decks);
    } catch (error: any) {
        logger.error("listDecks: error with status " + error.status + ". userId: " + userIdString);
        next(error);
    }
}

export async function listPublicDecks(req: any, res: any, next: any) {
    try {
        const decks = await DeckService.listPublicDecks();

        logger.info("listPublicDecks: success. Decks found: " + decks.length);
        return res.status(200).json(decks);
    } catch (error: any) {
        logger.error("listPublicDecks: error with status " + error.status);
        next(error);
    }
}

export async function createDeck(req: any, res: any, next: any) {
    const userIdString = req.user?.id;
    try {
        const name = req.body?.name;
        const description = req.body?.description;
        const visibility = req.body?.visibility;

        if (!name) 
            throw new BadRequestError('/body/name', 'missing required field');
        if (!description) 
            throw new BadRequestError('/body/description', 'missing required field');
        if (!visibility) 
            throw new BadRequestError('/body/visibility', 'missing required field');

        if (visibility !== "PUBLIC" &&  visibility !== "PRIVATE") 
            throw new BadRequestError('/body/visibility', 'visibility must be PUBLIC or PRIVATE');

        const userId = Number(userIdString);
        const deck = await DeckService.createDeck(name, description, visibility, userId);

        logger.info("createDeck: success. deckId " + deck?.id + ". userId: " + userIdString);
        return res.status(201).json(deck);
    } catch (error: any) {
        logger.error("createDeck: error with status " + error.status + ". userId: " + userIdString);
        next(error);
    }
}

export async function updateDeck(req: any, res: any, next: any) {
    const id = Number(req.params?.id);
    try {
        const name: string | null = req.body?.name;
        const description: string | null = req.body?.description;
        const visibility: string | null = req.body?.visibility;

        if (isNaN(id)) 
            throw new BadRequestError('/id', 'id must be a number');
        if (!name && !description && !visibility) 
            throw new BadRequestError('/body', 'missing required field: one or more of name, description, visibility');
        if (name && name.length > 255) 
            throw new BadRequestError('/body/name', 'name must be 255 characters or less');
        if (description && description.length > 1023) 
            throw new BadRequestError('/body/description', 'description must be 1023 characters or less');
        if (visibility && !["PUBLIC", "PRIVATE"].includes(visibility))
            throw new BadRequestError('/body/visibility', 'visibility must be either PUBLIC or PRIVATE');

        const deck = await DeckService.getDeck(id);
        if (!deck) 
            throw new NotFoundError(`Could not find deck with id ${id}`);
        
        deck.checkAccess(req.user?.id, AccessType.WRITE);
        
        const updatedDeck = await DeckService.updateDeck(id, name, description, visibility as DeckVisibility);

        logger.info("updateDeck: success. deckId " + id);
        return res.status(200).json(updatedDeck);
    } catch (error: any) {
        logger.error("updateDeck: error with status " + error.status + ". deckId: " + id);
        next(error);
    }
}

export async function deleteDeck(req: any, res: any, next: any) {
    const id = Number(req.params?.id);
    try {
        if (isNaN(id)) 
            throw new BadRequestError('/id', 'id must be a number');

        const deck = await DeckService.getDeck(id);
        if (!deck) 
            throw new NotFoundError(`Could not find deck with id ${id}`);
        
        deck.checkAccess(req.user?.id, AccessType.WRITE);
        
        await DeckService.deleteDeck(req.params.id);

        logger.info("deleteDeck: success. deckId " + id);
        return res.status(204).json();
    } catch (error: any) {
        logger.error("deleteDeck: error with status " + error.status + ". deckId: " + id);
        next(error);
    }
}