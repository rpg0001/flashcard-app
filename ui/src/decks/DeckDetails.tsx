import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDeck, getDeck, Deck } from "../services/decks";
import './decks.css';
import { Card, deleteCard, listCards } from "../services/cards";
import DeckCard from "./DeckCard";
import { getCardCountString } from "./helpers";

export default function DeckDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [deck, setDeck] = useState<Deck>();
    const [cards, setCards] = useState<Card[]>();

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        const fetchCards = async () => setCards(await listCards(Number(id)));
        fetchDeck();
        fetchCards();
    }, [id]);

    async function doDeleteDeck() {
        await deleteDeck(parseInt(id ?? ""));
        navigate(`/decks`);
    }

    async function doDeleteCard(cardId: number) {
        try {
            await deleteCard(cardId, parseInt(id ?? ""));
            setCards(cards?.filter(c => c.id != cardId));
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
                            <a href="#" onClick={doDeleteDeck}>Delete</a>
                        </small>
                        <p>{deck?.description}</p>
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