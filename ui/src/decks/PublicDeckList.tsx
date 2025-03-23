import './decks.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Deck, listPublicDecks } from "../services/decks";
import { getCardCountString } from './helpers';

export function PublicDeckList() {
    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        const fetchDecks = async () => setDecks(await listPublicDecks());
        fetchDecks();
    }, [])
    
    return (
        <div>
            <h1>All public decks</h1>
            <div className='deck-list'>
                {decks.map(deck => 
                    <div className='deck'>
                        <h3>{deck.name}</h3>
                        <small>{getCardCountString(deck.cardCount)} | Created {deck.createdAt.split("T")[0]}</small>
                        <p>{deck.description}</p>
                        <Link to={`/decks/${deck.id}/public`} >view deck</Link>
                    </div>
                )}
            </div>
        </div>
    )
}