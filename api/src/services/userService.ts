import { connection } from "../app";
import { User, UserType } from "../models/userModel";
import { NotFoundError } from "../utils/errors";
import bcrypt from 'bcryptjs';
import * as UserSessionService from "./userSessionService";

export async function getUser(
    id: number
): Promise<User | null> {
    const result = await connection.query(`
        SELECT * FROM users WHERE id = ?`
    , [id]);
    const rows = result[0] as any[];
    const user = rows[0];
    return user ? new User(
        user.id, 
        user.email, 
        user.username, 
        user.password_hash, 
        user.user_type,
        user.created_at
    ) : null;
}

export async function listUsers(): Promise<User[]>  {
    const [users] = await connection.query(`
        SELECT * FROM users
    `);
    return (users as any[]).map(user => new User(
        user.id, 
        user.email, 
        user.username, 
        user.password_hash, 
        user.user_type,
        user.created_at
    ));
}

export async function searchUsers(username?: string, email?: string): Promise<User[]>  {
    if (username && email) {
        const [users] = await connection.query(`
            SELECT * FROM users WHERE email = ? OR username = ?
        `, [username, email]);
        return (users as any[]).map(user => new User(
            user.id, 
            user.email, 
            user.username, 
            user.password_hash, 
            user.user_type,
            user.created_at
        ));
    } else if (username) {
        const [users] = await connection.query(`
            SELECT * FROM users WHERE username = ?
        `, [username]);
        return (users as any[]).map(user => new User(
            user.id, 
            user.email, 
            user.username, 
            user.password_hash, 
            user.user_type,
            user.created_at
        ));
    } else if (email) {
        const [users] = await connection.query(`
            SELECT * FROM users WHERE email = ?
        `, [email]);
        return (users as any[]).map(user => new User(
            user.id, 
            user.email, 
            user.username, 
            user.password_hash, 
            user.user_type,
            user.created_at
        ));
    } else {
        return [];
    }
}

export async function createUser(
    email: string, 
    username: string,
    password: string,
    userType: UserType
): Promise<User>  {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [newUser] = await connection.query(`
        INSERT INTO users (email, username, password_hash, user_type)
        VALUES (?, ?, ?, ?)
    `, [ email, username, passwordHash, userType ]) as any;

    const fullNewUser = await getUser(newUser.insertId);
    if (!fullNewUser) throw new Error("Failed to retrieve newly created user with id " + newUser.insertId);
    return fullNewUser;
}

export async function updateUser(
    id: number, 
    email: string, 
    username: string
): Promise<User>  {
    const user = await getUser(id);

    if (!user) throw new NotFoundError(`Could not find user with id ${id}`);

    const newEmail = email ?? user.email;
    const newUsername = username ?? user.username;
    
    const result = await connection.query(`
        UPDATE users
        SET email = ?, username = ?
        WHERE id = ?
    `, [newEmail, newUsername, id]) as any;

    const updatedUser = await getUser(id);
    if (!updatedUser) throw new Error("Failed to retrieve newly updated user with id " + id);
    return updatedUser;
}

export async function deleteUser(
    id: number
) {
    const user = await getUser(id);
    if (!user) throw new NotFoundError(`No user found with id ${id}`);

    // Delete any user sessions first
    await UserSessionService.deleteUserSessions(id);

    // Then delete user
    await connection.query(`
        DELETE FROM users
        WHERE id = ?
    `, [id]);
}