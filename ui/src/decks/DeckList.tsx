import './decks.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, Deck } from "../services/decks";

export default function DeckList() {
    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        const fetchDecks = async () => setDecks(await listDecks());
        fetchDecks();
    }, [])
    
    return (
        <div>
            <h1>My decks</h1>
            <Link to='create'>Add new deck</Link>
            <div className='deck-list'>
                {decks.map(deck => 
                    <div className='deck'>
                        <h3>{deck.name}</h3>
                        <small>42 cards | Created 01/01/25</small>
                        <p>{deck.description}</p>
                        <Link to={`${deck.id}`} >view deck</Link>
                    </div>
                )}
            </div>
        </div>
    )
}