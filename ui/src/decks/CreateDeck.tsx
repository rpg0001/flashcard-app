import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../services/decks";
import './decks.css';

export function CreateDeck() {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const navigate = useNavigate();

    async function doCreateDeck() {
        if (name && description) {
            const deck = await createDeck(name, description, 3); // TODO provide user id
            if (deck) navigate(`/decks/${deck.id}`);
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        doCreateDeck();
    }

    return (
        <div>
            <h1>Add new deck</h1>
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
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}