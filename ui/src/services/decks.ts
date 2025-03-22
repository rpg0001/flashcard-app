import { baseUrl } from "../utils/constants";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "../utils/axios";

export interface Deck {
    id: number;
    name: string;
    description: string;
    userId: number;
}

export async function getDeck(
    id: number
): Promise<Deck> {
    const response = await axiosGet(`${baseUrl}/decks/${id}`);
    return response.data as Deck;
}

export async function listDecks(): Promise<Deck[]> {
    const response = await axiosGet(`${baseUrl}/decks`);
    return response.data as Deck[];
}

export async function createDeck(
    name: string, 
    description: string,
    userId: number
): Promise<Deck> {
    const requestBody = {
        name: name,
        description: description,
        userId: userId
    }
    const response = await axiosPost(`${baseUrl}/decks`, requestBody);
    return response.data as Deck;
}

export async function updateDeck(
    id: number,
    name: string, 
    description: string
): Promise<Deck> {
    const requestBody = {
        name: name,
        description: description
    }
    const response = await axiosPatch(`${baseUrl}/decks/${id}`, requestBody);
    return response.data as Deck;
}

export async function deleteDeck(id: number) {
    const response = await axiosDelete(`${baseUrl}/decks/${id}`);
    return response.data;
}