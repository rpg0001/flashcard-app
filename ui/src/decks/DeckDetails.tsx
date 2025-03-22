import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDeck, getDeck, Deck } from "../services/decks";
import './decks.css';
import { Card, listCards } from "../services/cards";
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
    
    return (
        <div>
            <Link to='/decks' >Back to deck list</Link>
            {deck ?
                <>
                    <div className="view-deck">
                        <h1>{deck?.name}</h1>
                        <small>
                            {getCardCountString(deck.cardCount)} | 
                            Created {deck.createdAt.split("T")[0]} | 
                            <Link to={`edit`} >Edit</Link> | 
                            <a href="/" onClick={doDeleteDeck}>Delete</a>
                        </small>
                        <p>{deck?.description}</p>
                        <Link to={`cards/create`} >Add to deck</Link>
                        <div className="list-v">
                            {cards?.map(card => <DeckCard card={card} ></DeckCard>)}
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