import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Deck, DeckVisibility, getDeck, updateDeck } from "../services/decks";

export function EditDeck() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [deck, setDeck] = useState<Deck>();
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [visibility, setVisibility] = useState<DeckVisibility>();

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        fetchDeck();
    }, [id]);
    
    useEffect(() => {
        setName(deck?.name);
        setDescription(deck?.description);
        setVisibility(deck?.visibility);
    }, [deck])

    async function doUpdateDeck() {
        if (name && description && visibility) {
            await updateDeck(parseInt(id ?? ""), name, description, visibility);
            navigate(`/decks/${id}`);
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        doUpdateDeck();
    }

    function selectVisibility(value: string | undefined) {
        if (value && (value === "PRIVATE" || value === "PUBLIC")) {
            setVisibility(value as DeckVisibility);
        }
    }
    
    return (
        <div>
            <Link to={`/decks/${id}`} >{"<"} Back to deck details</Link>
            <h1>Edit deck #{id}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text' 
                        id='name' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input 
                        type='text' 
                        id='description' 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <fieldset>
                        <legend>Visibility</legend>
                        <input 
                            type='radio' 
                            id='visibility-private' 
                            name='visibility-private' 
                            value={DeckVisibility.PRIVATE}
                            checked={visibility === DeckVisibility.PRIVATE}
                            onChange={(e) => selectVisibility(e.target.value)}
                        />
                        <label htmlFor="visibility-private">Private</label>
                        <input 
                            type='radio' 
                            id='visibility-public' 
                            name='visibility-public' 
                            value={DeckVisibility.PUBLIC}
                            checked={visibility === DeckVisibility.PUBLIC}
                            onChange={(e) => selectVisibility(e.target.value)}
                        />
                        <label htmlFor="visibility-public">Public</label>
                    </fieldset>
                </div>
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}