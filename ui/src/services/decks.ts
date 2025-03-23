import { baseUrl, axiosDelete, axiosGet, axiosPatch, axiosPost } from "../utils";

export interface Deck {
    id: number;
    name: string;
    description: string;
    visibility: DeckVisibility;
    cardCount: number;
    createdAt: string;
    userId: number;
}

export enum DeckVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}

export async function getDeck(
    id: number
): Promise<Deck> {
    const response = await axiosGet(`${baseUrl}/decks/${id}`);
    return response.data as Deck;
}

export async function listUserDecks(): Promise<Deck[]> {
    const response = await axiosGet(`${baseUrl}/decks`);
    return response.data as Deck[];
}

export async function listPublicDecks(): Promise<Deck[]> {
    const response = await axiosGet(`${baseUrl}/decks/all`);
    return response.data as Deck[];
}

export async function createDeck(
    name: string, 
    description: string,
    visibility: DeckVisibility
): Promise<Deck> {
    const requestBody = {
        name: name,
        description: description,
        visibility: visibility
    }
    const response = await axiosPost(`${baseUrl}/decks`, requestBody);
    return response.data as Deck;
}

export async function updateDeck(
    id: number,
    name: string, 
    description: string,
    visibility: DeckVisibility
): Promise<Deck> {
    const requestBody = {
        name: name,
        description: description,
        visibility: visibility
    }
    const response = await axiosPatch(`${baseUrl}/decks/${id}`, requestBody);
    return response.data as Deck;
}

export async function deleteDeck(id: number) {
    const response = await axiosDelete(`${baseUrl}/decks/${id}`);
    return response.data;
}