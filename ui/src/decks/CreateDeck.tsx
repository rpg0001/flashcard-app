import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck, DeckVisibility } from "../services";
import './decks.css';

export function CreateDeck() {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [visibility, setVisibility] = useState<DeckVisibility>(DeckVisibility.PRIVATE);
    const navigate = useNavigate();

    async function doCreateDeck() {
        if (name && description && visibility) {
            const deck = await createDeck(name, description, visibility);
            if (deck) navigate(`/decks/${deck.id}`);
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        doCreateDeck();
    }

    function selectVisibility(value: string | undefined) {
        if (value && (value === "PRIVATE" || value === "PUBLIC")) {
            setVisibility(value as DeckVisibility);
        }
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
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}