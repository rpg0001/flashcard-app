import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Deck, getDeck, updateDeck } from "../services/decks";

export default function EditDeck() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [deck, setDeck] = useState<Deck>();
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        fetchDeck();
    }, [id]);
    
    useEffect(() => {
        setName(deck?.name);
        setDescription(deck?.description);
    }, [deck])

    async function doUpdateDeck() {
        if (name && description) {
            await updateDeck(parseInt(id ?? ""), name, description);
            navigate(`/decks/${id}`);
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        doUpdateDeck();
    }
    
    return (
        <div>
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
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}