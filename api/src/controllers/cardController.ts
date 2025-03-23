
import { BadRequestError, ForbiddenError, NotFoundError } from '../utils/errors';
import * as CardService from '../services/cardService';
import * as DeckService from '../services/deckService';
import { logger } from '../utils/logger';
import { AccessType } from '../utils/types';

export async function getCard(req: any, res: any, next: any) {
    const deckId = Number(req.params.deckId);
    const cardId = Number(req.params.cardId);
    try {
        if (isNaN(deckId)) 
            throw new BadRequestError('/deckId', 'deckId must be a number');
        if (isNaN(cardId)) 
            throw new BadRequestError('/cardId', 'cardId must be a number');

        const deck = await DeckService.getDeck(deckId);
        if (!deck) 
            throw new NotFoundError(`Could not find deck with id ${deckId}`);

        deck.checkAccess(req.user.id, AccessType.READ);

        const card = await CardService.getCard(cardId);
        if (!card) 
            throw new NotFoundError(`Could not find card with id ${cardId}`);

        logger.info(`getCard: success. cardId: ${cardId}, deckId: ${deckId}`);
        res.status(200).json(card);
    } catch (error: any) {
        logger.error(`getCard: error with status ${error.status}. cardId: ${cardId}, deckId: ${deckId}`);
        next(error);
    }
}

export async function listCards(req: any, res: any, next: any) {
    const deckId = Number(req.params.deckId);
    try {
        if (isNaN(deckId)) 
            throw new BadRequestError('/deckId', 'deckId must be a number');

        const deck = await DeckService.getDeck(deckId);
        if (!deck) 
            throw new NotFoundError(`Could not find deck with id ${deckId}`);
        
        deck.checkAccess(req.user.id, AccessType.READ);
        
        const cards = await CardService.listCards(deck);

        logger.info("listCards: success. Cards found: " + cards.length + ", deckId: " + deckId);
        return res.status(200).json(cards);
    } catch (error: any) {
        logger.error("listCards: error with status " + error.status + ". deckId: " + deckId);
        next(error);
    }
}

export async function createCard(req: any, res: any, next: any) {
    const deckId = Number(req.params.deckId);
    try {
        if (isNaN(deckId)) 
            throw new BadRequestError('/deckId', 'deckId must be a number');

        const deck = await DeckService.getDeck(deckId);
        if (!deck) 
            throw new NotFoundError(`Could not find deck with id ${deckId}`);
        
        deck.checkAccess(req.user.id, AccessType.WRITE);

        const term = req.body?.term;
        const definition = req.body?.definition;

        if (!term || term.length < 1) 
            throw new BadRequestError('/body/term', 'missing required field');
        if (!definition || definition.length < 1) 
            throw new BadRequestError('/body/definition', 'missing required field');

        const card = await CardService.createCard(term, definition, deckId);

        logger.info("createCard: success. cardId " + card?.id + ". deckId: " + deckId);
        return res.status(201).json(card);
    } catch (error: any) {
        logger.error("createCard: error with status " + error.status + ". deckId: " + deckId);
        next(error);
    }
}

export async function updateCard(req: any, res: any, next: any) {
    const deckId = Number(req.params.deckId);
    const cardId = Number(req.params.cardId);
    try {
        if (isNaN(deckId)) 
            throw new BadRequestError('/deckId', 'deckId must be a number');
        if (isNaN(cardId)) 
            throw new BadRequestError('/cardId', 'cardId must be a number');

        const deck = await DeckService.getDeck(deckId);
        if (!deck) 
            throw new NotFoundError(`Could not find deck with id ${deckId}`);
        
        deck.checkAccess(req.user.id, AccessType.WRITE);

        const term = req.body?.term;
        const definition = req.body?.definition;
        if (!term || term.length < 1) 
            throw new BadRequestError('/body/term', 'missing required field');
        if (!definition || definition.length < 1) 
            throw new BadRequestError('/body/definition', 'missing required field');
        if (term && term.length > 255) 
            throw new BadRequestError('/body/term', 'term must be 255 characters or less');
        if (definition && definition.length > 1023) 
            throw new BadRequestError('/body/definition', 'definition must be 1023 characters or less');

        const updatedCard = await CardService.updateCard(cardId, term, definition);

        logger.info("updateCard: success. cardId " + cardId);
        return res.status(200).json(updatedCard);
    } catch (error: any) {
        logger.error("updateCard: error with status " + error.status + ". cardId: " + cardId);
        next(error);
    }
}

export async function deleteCard(req: any, res: any, next: any) {
    const deckId = Number(req.params.deckId);
    const cardId = Number(req.params.cardId);
    try {
        if (isNaN(deckId)) 
            throw new BadRequestError('/deckId', 'deckId must be a number');
        if (isNaN(cardId)) 
            throw new BadRequestError('/cardId', 'cardId must be a number');

        const deck = await DeckService.getDeck(deckId);
        if (!deck) 
            throw new NotFoundError(`Could not find deck with id ${deckId}`);
        
        deck.checkAccess(req.user.id, AccessType.WRITE);
   
        await CardService.deleteCard(cardId);

        logger.info("deleteCard: success. cardId " + cardId);
        return res.status(204).json();
    } catch (error: any) {
        logger.error("deleteCard: error with status " + error.status + ". cardId: " + cardId);
        next(error);
    }
}