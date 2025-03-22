export class UserSession {
    id: number;
    token: string;
    userId: number;
    expiresAt: Date;
    createdAt: Date;

    constructor(id: number, token: string, userId: number, expiresAt: string, createdAt: string) {
        this.id = id;
        this.token = token;
        this.userId = userId;
        this.expiresAt = new Date(expiresAt);
        this.createdAt = new Date(createdAt);
    }
}