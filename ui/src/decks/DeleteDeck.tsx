import { Link, useNavigate, useParams } from "react-router-dom";
import { Deck, deleteDeck, getDeck } from "../services";
import { useEffect, useState } from "react";

export function DeleteDeck() {
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
            <Link to={`/decks/${id}`} >{"<"} Back to deck details</Link>
            {
                deck ? 
                    <div className="list-v">
                        <h1>Delete deck</h1>
                        <p>Are you sure you want to delete deck: <strong>{deck?.name}</strong>?</p>
                        <div className="list-h">
                            <Link to={`/decks/${id}`} >No, cancel</Link>
                            <button onClick={doDeleteDeck}>Yes, delete deck</button>
                        </div>
                    </div>
                : 
                    <div>
                        <p>Failed to retrieve deck, try refreshing the page</p>
                    </div>
            }   
        </div>
    )
}