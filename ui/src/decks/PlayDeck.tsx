import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Deck, Card, getDeck, listCards } from "../services";
import { useAuth } from "../hooks";

export function PlayDeck() {
    const { id } = useParams();
    const auth = useAuth();
    
    const [deck, setDeck] = useState<Deck>();
    const [cards, setCards] = useState<Card[]>();

    const [currentCard, setCurrentCard] = useState<Card>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const fetchDeck = async () => setDeck(await getDeck(Number(id)));
        const fetchCards = async () => setCards(await listCards(Number(id)));
        fetchDeck();
        fetchCards();
    }, [id]);

    useEffect(() => {
        if (cards) setCurrentCard(cards[currentIndex]);
    }, [cards, currentIndex])

    function nextCard() {
        if (!cards) return;
        if (currentIndex !== cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    }

    function previousCard() {
        if (!cards) return;
        if (currentIndex !== 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(cards.length - 1);
        }
    }
    
    return (
        <div>
            {auth.user?.id === deck?.userId ?
                <Link to={`/decks/${id}`} >{"<"} Back to deck details</Link>
                : 
                <Link to={`/decks/${id}/public`} >{"<"} Back to deck details</Link>
            }
            <h1>Playing deck: {deck?.name}</h1>
            {currentCard ?
                <div className="w-60">
                    <PlayCard card={currentCard} />
                    <div className="list-h justify-center m-2">
                        <button 
                            onClick={() => previousCard()} 
                            disabled={!cards || cards?.length <= 1}
                        >
                            <strong>{"<"}</strong>
                        </button>

                        <p><small>{currentIndex + 1}/{cards?.length}</small></p>

                        <button 
                            onClick={() => nextCard()} 
                            disabled={!cards || cards?.length <= 1}
                        >
                            <strong>{">"}</strong>
                        </button>
                    </div>
                </div>
                :
                <p>Problem occured loading card</p>
            }
        </div>
    )
}

function PlayCard(props: { card: Card }) {
    const [flipped, setFlipped] = useState<boolean>(false);

    return (
        <div className="play-card">
            <strong>{flipped ? props.card.definition : props.card.term}</strong>
            <button onClick={() => setFlipped(!flipped)}>Flip</button>
        </div>
    )
}