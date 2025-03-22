export class Deck {
    id: number;
    name: string;
    description: string;
    userId: number;
    createdAt: Date;
    cardCount: number;

    constructor(id: number, name: string, description: string, userId: number, createdAt: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.userId = userId;
        this.createdAt = new Date(createdAt);
        this.cardCount = 0;
    }
}