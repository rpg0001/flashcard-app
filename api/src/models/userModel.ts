export class User {
    id: number;
    email: string;
    username: string;
    passwordHash: string;
    userType: UserType;
    createdAt: Date;

    constructor(id: number, email: string, username: string, passwordHash: string, userType: UserType, createdAt: string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
        this.userType = userType;
        this.createdAt = new Date(createdAt);
    }

    getBasic() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            userType: this.userType,
            createdAt: this.createdAt
        }
    }
}

export enum UserType {
    BASIC = "BASIC",
    ADMIN = "ADMIN"
}