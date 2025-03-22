import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCard, Deck, getDeck } from "../services";

export function CreateCard() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [deck, setDeck] = useState<Deck>();
    const [term, setTerm] = useState<string>();
    const [definition, setDefinition] = useState<string>();

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        fetchDeck();
    }, [id]);

    async function doCreateCard() {
        if (term && definition && id) {
            const idInt = parseInt(id);
            const card = await createCard(term, definition, idInt);
            if (card) navigate(`/decks/${id}`);
        }
    }
    
    function handleSubmit(event: any) {
        event.preventDefault();
        doCreateCard();
    }
    
    return (
        <div>
            <Link to={`/decks/${id}`} >{"<"} Back to deck details</Link>
            <h1>Create card</h1>
            <p>Adding card to deck: <strong>{deck?.name}</strong></p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='term'>Term</label>
                    <input 
                        type='text' 
                        id='term' 
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='definition'>Definition</label>
                    <input 
                        type='text' 
                        id='definition' 
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}