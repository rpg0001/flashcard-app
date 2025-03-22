import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDeck, getDeck, Deck } from "../services/decks";
import './decks.css';

export default function DeckDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [deck, setDeck] = useState<Deck>();

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        fetchDeck();
    }, [id]);

    async function doDeleteDeck() {
        await deleteDeck(parseInt(id ?? ""));
        navigate(`/decks`);
    }
    
    return (
        <div>
            <Link to='/decks' >Back to deck list</Link>
            {deck ?
                <>
                    <div className="view-deck">
                        <h1>{deck?.name}</h1>
                        <small>
                            42 cards | 
                            Created 01/01/25 | 
                            <Link to={`edit`} >Edit</Link> | 
                            <a href="/" onClick={doDeleteDeck}>Delete</a>
                        </small>
                        <p>{deck?.description}</p>
                        <Link to="#">Add to deck</Link>
                    </div>
                </>
            :
                <div>
                    <p>Failed to retrieve deck</p>
                </div>
            }
        </div>
    )
}