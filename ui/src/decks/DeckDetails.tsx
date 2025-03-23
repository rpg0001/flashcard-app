import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './decks.css';
import { Card, Deck, DeckVisibility, deleteCard, getDeck, listCards } from "../services";
import { getCardCountString } from "./helpers";
import { DeckCard } from "./cards";

export function DeckDetails() {
    const { id } = useParams();

    const [deck, setDeck] = useState<Deck>();
    const [cards, setCards] = useState<Card[]>();

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        const fetchCards = async () => setCards(await listCards(Number(id)));
        fetchDeck();
        fetchCards();
    }, [id]);

    async function doDeleteCard(cardId: number) {
        try {
            await deleteCard(cardId, parseInt(id ?? ""));
            setCards(cards?.filter(c => c.id !== cardId));
        } catch (error: any) {
            console.error("Error deleting card with id " + cardId);
        }
    }
    
    return (
        <div>
            <Link to='/decks' >{"<"} Back to deck list</Link>
            {deck ?
                <>
                    <div className="view-deck">
                        <h1>{deck?.name}</h1>
                        <small>
                            {getCardCountString(deck.cardCount)} | 
                            Created {deck.createdAt.split("T")[0]} | 
                            <Link to={`edit`} >Edit</Link> | 
                            <Link to={`delete`}>Delete</Link>
                            <PublicLink deck={deck} />
                        </small>
                        <p>{deck?.description}</p>
                        <Link to={`play`} >Play deck {">"}</Link>
                        <Link to={`cards/create`} >Add to deck</Link>
                        <div className="list-v">
                            {cards?.map(card => 
                                <DeckCard card={card} doDeleteCard={doDeleteCard}></DeckCard>)
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

function PublicLink(props: { deck: Deck }) {
    if (props.deck.visibility === DeckVisibility.PUBLIC) {
        return (
            <span>|<Link to={`public`}>View public page</Link></span>
        )
    } else {
        return <></>;
    }
}