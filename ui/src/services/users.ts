import { baseUrl, axiosGet, axiosPatch, axiosDelete } from "../utils";

export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
}

export async function getUser(
    id: number
): Promise<User> {
    const response = await axiosGet(`${baseUrl}/users/${id}`);
    return response.data as User;
}

export async function listUsers(): Promise<User[]> {
    const response = await axiosGet(`${baseUrl}/users`);
    return response.data as User[];
}

export async function updateUser(
    id: number,
    email: string, 
    username: string
): Promise<User> {
    const requestBody = {
        email: email,
        username: username
    }
    const response = await axiosPatch(`${baseUrl}/users/${id}`, requestBody);
    return response.data as User;
}

export async function deleteUser(id: number) {
    const response = await axiosDelete(`${baseUrl}/users/${id}`);
    return response.data;
}