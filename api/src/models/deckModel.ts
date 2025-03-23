import { ForbiddenError } from "../utils/errors";
import { AccessType } from "../utils/types";

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

    checkAccess(userId: number, accessType: AccessType) {
        if (accessType === AccessType.READ 
            && userId !== this.userId 
            && this.visibility !== DeckVisibility.PUBLIC
        ) {
            throw new ForbiddenError(`User with id ${userId} is not permitted to view private deck with id ${this.id}`);
        }

        if (accessType === AccessType.WRITE 
            && userId !== this.userId
        ) {
            throw new ForbiddenError(`User with id ${userId} is not permitted to edit deck with id ${this.id}`);
        }
    }
}

export enum DeckVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}