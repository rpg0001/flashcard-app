import { baseUrl } from "../utils/constants";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "../utils/axios";

export interface Note {
    id: number;
    title: string;
    content: string;
    userId: number;
}

export async function getNote(
    id: number
): Promise<Note> {
    const response = await axiosGet(`${baseUrl}/notes/${id}`);
    return response.data as Note;
}

export async function listNotes(): Promise<Note[]> {
    const response = await axiosGet(`${baseUrl}/notes`);
    return response.data as Note[];
}

export async function createNote(
    title: string, 
    content: string,
    userId: number
): Promise<Note> {
    const requestBody = {
        title: title,
        content: content,
        userId: userId
    }
    const response = await axiosPost(`${baseUrl}/notes`, requestBody);
    return response.data as Note;
}

export async function updateNote(
    id: number,
    title: string, 
    content: string
): Promise<Note> {
    const requestBody = {
        title: title,
        content: content
    }
    const response = await axiosPatch(`${baseUrl}/notes/${id}`, requestBody);
    return response.data as Note;
}

export async function deleteNote(id: number) {
    const response = await axiosDelete(`${baseUrl}/notes/${id}`);
    return response.data;
}