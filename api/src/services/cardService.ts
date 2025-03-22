import { connection } from "../app";
import { Card } from "../models/cardModel";
import { Deck } from "../models/deckModel";
import { InternalServerError, NotFoundError } from "../utils/errors";
import { getDeck } from "./deckService";

export async function getCard(
    id: number
): Promise<Card | null> {
    const result = await connection.query(`
        SELECT * FROM cards WHERE id = ?`
    , [id]);
    const rows = result[0] as any[];
    const card = rows[0];

    const deck = await getDeck(card.deck_id);
    if (!deck) throw new InternalServerError(`Unexpectedly failed to find deck with id ${card.deck_id} for card with id ${id}`);
    
    return card ? new Card(card.id, card.term, card.definition, card.deck_id, card.created_at, deck.userId) : null;
}

export async function listCards(deck: Deck): Promise<Card[]>  {
    let cards;
    const [dbCards] = await connection.query(`
        SELECT * FROM cards
        WHERE deck_id = ?
    `, [ deck.id ]);
    cards = dbCards;
    
    return (cards as any[]).map(card => new Card(card.id, card.term, card.definition, card.deck_id, card.created_at, deck.userId))
}

export async function createCard(
    term: string, 
    definition: string,
    deckId: number
): Promise<Card | null>  {
    const deck = await getDeck(deckId);
    if (!deck) throw new NotFoundError(`Could not find deck with id ${deckId}`);

    const [newCard] = await connection.query(`
        INSERT INTO cards (term, definition, deck_id)
        VALUES (?, ?, ?)
    `, [ term, definition, deckId ]) as any;

    return await getCard(newCard.insertId) ?? null;
}

export async function updateCard(
    id: number, 
    term: string, 
    definition: string
): Promise<Card | null>  {
    const card = await getCard(id);
    if (!card) throw new NotFoundError(`Could not find card with id ${id}`);

    const newTitle = term ?? card.term;
    const newContent = definition ?? card.definition;
    
    const result = await connection.query(`
        UPDATE cards
        SET term = ?, definition = ?
        WHERE id = ?
    `, [newTitle, newContent, id]) as any;

    return await getCard(id) ?? null;
}

export async function deleteCard(
    id: number
) {
    await connection.query(`
        DELETE FROM cards
        WHERE id = ?
    `, [id]);
}