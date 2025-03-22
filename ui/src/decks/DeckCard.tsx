import { Link } from "react-router-dom";
import { Card } from "../services";

export function DeckCard(props: { 
    card: Card,
    doDeleteCard: (cardId: number) => Promise<void>
}) {
    return (
        <div className="deck-card list-h-spread">
            <div>
                <strong>{props.card.term}</strong>
                <p>{props.card.definition}</p>
            </div>
            <div className="list-v">
                <Link to={`cards/${props.card.id}/edit`}>Edit</Link>
                <button onClick={() => props.doDeleteCard(props.card.id)}>Delete</button>
            </div>
        </div>
    )
}