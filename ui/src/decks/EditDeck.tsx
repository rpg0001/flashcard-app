import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Deck, DeckVisibility, getDeck, updateDeck } from "../services/decks";
import { getCardCountString } from "./helpers";

export function EditDeck() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [deck, setDeck] = useState<Deck>();
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [visibility, setVisibility] = useState<DeckVisibility>();
    const [confirmationRequired, setConfirmationRequired] = useState<boolean>(false);

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
        if (visibility !== deck?.visibility) {
            setConfirmationRequired(true);
        } else {
            doUpdateDeck();
        }
    }

    function selectVisibility(value: string | undefined) {
        if (value && (value === "PRIVATE" || value === "PUBLIC")) {
            setVisibility(value as DeckVisibility);
        }
    }

    function cancelUpdate() {
        setConfirmationRequired(false);
    }
    
    return (
        <div className="list-v">
            <Link to={`/decks/${id}`} >{"<"} Back to deck details</Link>
            <h1>Edit deck: {`"${deck?.name ?? "(name unknown)"}"`}</h1>
            <small>This deck contains {getCardCountString(deck?.cardCount ?? 0)}</small>
            {confirmationRequired ?
                <ConfirmEditDeck 
                    deck={deck} 
                    newVisibility={visibility} 
                    doUpdateDeck={doUpdateDeck}
                    cancelUpdate={cancelUpdate}
                />
                :
                <form onSubmit={handleSubmit} className="list-v">
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
                    <div>
                        <button type='submit'>Update</button>
                    </div>
                </form>
            }
        </div>
    )
}

function ConfirmEditDeck(props: {
    deck: Deck | undefined,
    newVisibility: DeckVisibility | undefined,
    doUpdateDeck: () => Promise<void>,
    cancelUpdate: () => void
}) {
    if (!props.deck || !props.newVisibility) {
        return (
            <p>An unexpected error occurred</p>
        )
    } else {
        return (
            <div className="list-v">
                <p>
                    Are you sure you want to submit this update? This would change the deck's
                    visibility from <strong>{props.deck.visibility}</strong> to <strong>{props.newVisibility}</strong>.
                </p>
                <div className="list-h">
                    <button onClick={props.doUpdateDeck}>Confirm update</button>
                    <button onClick={props.cancelUpdate}>Cancel</button>
                </div>
            </div>
        )
    }
}