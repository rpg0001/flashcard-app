export class Card {
    id: number;
    term: string;
    definition: string;
    deckId: number;
    createdAt: Date;

    // Not in schema
    userId: number;

    constructor(id: number, term: string, definition: string, deckId: number, createdAt: string, userId: number) {
        this.id = id;
        this.term = term;
        this.definition = definition;
        this.deckId = deckId;
        this.createdAt = new Date(createdAt);
        this.userId = userId;
    }
}