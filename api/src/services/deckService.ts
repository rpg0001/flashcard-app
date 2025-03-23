import { connection } from "../app";
import { Deck } from "../models/deckModel";
import { NotFoundError } from "../utils/errors";
import { getUser } from "./userService";

export async function getDeck(
    id: number
): Promise<Deck | null> {
    const result = await connection.query(`
        SELECT *, 
            (
                SELECT COUNT(*) 
                FROM cards 
                WHERE cards.deck_id = decks.id
            ) AS card_count
        FROM decks
        WHERE id = ?`
    , [id]);
    const rows = result[0] as any[];
    const deck = rows[0];
    return deck ? new Deck(
        deck.id, 
        deck.name, 
        deck.description, 
        deck.card_count,
        deck.visibility,
        deck.created_at,
        deck.user_id, 
    ) : null;
}

export async function listDecks(userId: number | null): Promise<Deck[]>  {
    let decks;
    if (userId === null) {
        const [dbDecks] = await connection.query(`
            SELECT *, 
                (
                    SELECT COUNT(*) 
                    FROM cards 
                    WHERE cards.deck_id = decks.id
                ) AS card_count
            FROM decks
        `);
        decks = dbDecks;
    } else {
        const [dbDecks] = await connection.query(`
            SELECT *, 
                (
                    SELECT COUNT(*) 
                    FROM cards 
                    WHERE cards.deck_id = decks.id
                ) AS card_count
            FROM decks
            WHERE user_id = ?
        `, [ userId ]);
        decks = dbDecks;
    }
    return (decks as any[]).map(deck => new Deck(
        deck.id, 
        deck.name, 
        deck.description, 
        deck.card_count,
        deck.visibility,
        deck.created_at,
        deck.user_id, 
    ));
}

export async function listPublicDecks(): Promise<Deck[]>  {
    const [decks] = await connection.query(`
        SELECT *, 
            (
                SELECT COUNT(*) 
                FROM cards 
                WHERE cards.deck_id = decks.id
            ) AS card_count
        FROM decks
        WHERE visibility = 'PUBLIC'
    `);
    return (decks as any[]).map(deck => new Deck(
        deck.id, 
        deck.name, 
        deck.description, 
        deck.card_count,
        deck.visibility,
        deck.created_at,
        deck.user_id, 
    ));
}

export async function createDeck(
    name: string, 
    description: string,
    visibility: "PRIVATE" | "PUBLIC",
    userId: number
): Promise<Deck | null>  {
    const user = await getUser(userId);

    if (!user) throw new NotFoundError(`Could not find user with id ${userId}`);

    const [newDeck] = await connection.query(`
        INSERT INTO decks (name, description, visibility, user_id)
        VALUES (?, ?, ?, ?)
    `, [ name, description, visibility, userId ]) as any;

    return await getDeck(newDeck.insertId) ?? null;
}

export async function updateDeck(
    id: number, 
    name: string, 
    description: string
): Promise<Deck | null>  {
    const deck = await getDeck(id);

    if (!deck) throw new NotFoundError(`Could not find deck with id ${id}`);

    const newTitle = name ?? deck.name;
    const newContent = description ?? deck.description;
    
    const result = await connection.query(`
        UPDATE decks
        SET name = ?, description = ?
        WHERE id = ?
    `, [newTitle, newContent, id]) as any;

    return await getDeck(id) ?? null;
}

export async function deleteDeck(
    id: number
) {
    await connection.query(`
        DELETE FROM decks
        WHERE id = ?
    `, [id]);
}