export class Card {
    id: number;
    term: string;
    definition: string;

    // Dates
    createdAt: Date;

    // Relations
    deckId: number;
    userId: number; // Not in schema

    constructor(
        id: number, 
        term: string, 
        definition: string, 
        createdAt: string, 
        deckId: number, 
        userId: number
    ) {
        this.id = id;
        this.term = term;
        this.definition = definition;
        this.deckId = deckId;
        this.createdAt = new Date(createdAt);
        this.userId = userId;
    }
}