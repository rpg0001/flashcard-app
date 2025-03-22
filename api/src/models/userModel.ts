export class User {
    id: number;
    email: string;
    username: string;
    passwordHash: string;
    userType: UserType;

    constructor(id: number, email: string, username: string, passwordHash: string, userType: UserType) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
        this.userType = userType;
    }

    getBasic() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            userType: this.userType
        }
    }
}

export enum UserType {
    BASIC = "BASIC",
    ADMIN = "ADMIN"
}