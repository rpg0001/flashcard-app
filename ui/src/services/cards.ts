import { baseUrl, axiosDelete, axiosGet, axiosPatch, axiosPost } from "../utils";

export interface Card {
    id: number;
    term: string;
    definition: string;
    createdAt: string;
    deckId: number;
    userId: number;
}

export async function getCard(
    deckId: number,
    cardId: number
): Promise<Card> {
    const response = await axiosGet(`${baseUrl}/decks/${deckId}/cards/${cardId}`);
    return response.data as Card;
}

export async function listCards(
    deckId: number
): Promise<Card[]> {
    const response = await axiosGet(`${baseUrl}/decks/${deckId}/cards`);
    return response.data as Card[];
}

export async function createCard(
    term: string, 
    definition: string,
    deckId: number
): Promise<Card> {
    const requestBody = {
        term: term,
        definition: definition,
        deckId: deckId
    }
    const response = await axiosPost(`${baseUrl}/decks/${deckId}/cards`, requestBody);
    return response.data as Card;
}

export async function updateCard(
    cardId: number,
    deckId: number,
    term: string, 
    definition: string
): Promise<Card> {
    const requestBody = {
        term: term,
        definition: definition
    }
    const response = await axiosPatch(`${baseUrl}/decks/${deckId}/cards/${cardId}`, requestBody);
    return response.data as Card;
}

export async function deleteCard(
    cardId: number,
    deckId: number
) {
    const response = await axiosDelete(`${baseUrl}/decks/${deckId}/cards/${cardId}`);
    return response.data;
}