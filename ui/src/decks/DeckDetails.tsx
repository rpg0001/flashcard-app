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
            <h1>View deck</h1>
            {deck ?
                <>
                    <div className='deck'>
                        <h2>{deck?.name}</h2>
                        <p>{deck?.description}</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Link to={`edit`} >edit</Link>
                        |
                        <a href="/" onClick={doDeleteDeck}>delete</a>
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