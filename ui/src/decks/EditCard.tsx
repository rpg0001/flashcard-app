import { Link, useNavigate, useParams } from "react-router-dom";
import { Deck, getDeck } from "../services/decks";
import { useState, useEffect } from "react";
import { Card, getCard, updateCard } from "../services/cards";

export default function EditCard() {
    const navigate = useNavigate();
    const { id, cardId } = useParams();

    const [deck, setDeck] = useState<Deck>();
    const [card, setCard] = useState<Card>();
    const [term, setName] = useState<string>();
    const [definition, setDescription] = useState<string>();

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        const fetchCard = async () => setCard(await getCard(Number(id), Number(cardId)));
        fetchDeck();
        fetchCard();
    }, [id, cardId]);

    useEffect(() => {
        setName(card?.term);
        setDescription(card?.definition);
    }, [card])
    
    async function doUpdateCard() {
        if (term && definition) {
            await updateCard(
                parseInt(cardId ?? ""), 
                parseInt(id ?? ""), 
                term, 
                definition
            );
            navigate(`/decks/${id}`);
        }
    }
    
    function handleSubmit(event: any) {
        event.preventDefault();
        doUpdateCard();
    }

    return (
        <div>
            <Link to={`/decks/${id}`} >{"<"} Back to deck ({deck?.name})</Link>
            <h1>Editing card</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='term'>Name</label>
                    <input 
                        type='text' 
                        id='term' 
                        value={term}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='definition'>Description</label>
                    <input 
                        type='text' 
                        id='definition' 
                        value={definition}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}