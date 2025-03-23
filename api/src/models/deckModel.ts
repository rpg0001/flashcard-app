export class Deck {
    id: number;
    name: string;
    description: string;
    cardCount: number;
    visibility: DeckVisibility;

    // Dates
    createdAt: Date;

    // Relations
    userId: number;

    constructor(
        id: number, 
        name: string, 
        description: string, 
        cardCount: number,
        visibility: DeckVisibility,
        createdAt: string, 
        userId: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cardCount = cardCount;
        this.visibility = visibility;
        this.createdAt = new Date(createdAt);
        this.userId = userId;
    }
}

export enum DeckVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}