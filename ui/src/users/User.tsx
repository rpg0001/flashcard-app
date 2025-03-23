import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Deck, getUser, listPublicDecks, PublicUser } from "../services";
import { getCardCountString } from "../decks";

export function User() {
    const {id} = useParams();
    const [user, setUser] = useState<PublicUser>();
    const [decks, setDecks] = useState<Deck[]>();

    useEffect(() => {
        const fetchUser = async () => setUser(await getUser(Number(id)));
        const fetchUserDecks = async() => 
            setDecks((await listPublicDecks()).filter(d => d.userId == Number(id)));
        fetchUser();
        fetchUserDecks();
    }, [id]);

    return (
        <div>
            <h1>{user?.username}</h1>
            <small>Joined {user?.createdAt.split("T")[0]}</small>
            <h3>Public decks ({decks?.length ?? 0})</h3>
            <div className='deck-list'>
                {(decks ?? []).map(deck => 
                    <div className='deck'>
                        <h3>{deck.name}</h3>
                        <p>
                            <small>
                                {getCardCountString(deck.cardCount)} | 
                                Created {deck.createdAt.split("T")[0]}
                            </small>
                        </p>
                        <p>{deck.description}</p>
                        <Link to={`/decks/${deck.id}/public`} >view deck</Link>
                    </div>
                )}
            </div>
        </div>
    )
}