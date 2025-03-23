import { baseUrl, axiosGet } from "../utils";

export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

export interface PublicUser {
    id: number;
    username: string;
    createdAt: string;
}

export async function getUser(
    id: number
): Promise<PublicUser> {
    const response = await axiosGet(`${baseUrl}/users/${id}`);
    return response.data as PublicUser;
}

export async function listUsers(): Promise<PublicUser[]> {
    const response = await axiosGet(`${baseUrl}/users`);
    return response.data as PublicUser[];
}