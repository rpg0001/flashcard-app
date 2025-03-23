import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './decks.css';
import { Card, Deck, getDeck, listCards } from "../services";
import { getCardCountString } from "./helpers";
import { PublicDeckCard } from "./cards";
import { useAuth } from "../hooks";

export function PublicDeckDetails() {
    const { id } = useParams();

    const [deck, setDeck] = useState<Deck>();
    const [cards, setCards] = useState<Card[]>();

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        const fetchCards = async () => setCards(await listCards(Number(id)));
        fetchDeck();
        fetchCards();
    }, [id]);
    
    return (
        <div>
            <Link to='/decks/all' >{"<"} Back to public deck list</Link>
            {deck ?
                <>
                    <div className="view-deck">
                        <h1>{deck?.name}</h1>
                        <small>
                            {getCardCountString(deck.cardCount)} | 
                            Created {deck.createdAt.split("T")[0]}
                            <EditDeckLink deck={deck} />
                        </small>
                        <p>{deck?.description}</p>
                        <Link to={`/decks/${id}/play`} >Play deck {">"}</Link>
                        <div className="list-v">
                            {cards?.map(card => 
                                <PublicDeckCard card={card}></PublicDeckCard>)
                            }
                        </div>
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

function EditDeckLink(props: { deck: Deck}) {
    const auth = useAuth();

    if (auth.user && auth.user.id === props.deck.userId) {
        return (
            <span>| <Link to={`/decks/${props.deck.id}`}>Edit deck</Link> </span>
        )
    } else {
        return <></>;
    }
}