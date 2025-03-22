import { Link } from "react-router-dom";
import { Card } from "../services/cards";

export default function DeckCard(props: { card: Card }) {
    return (
        <div className="deck-card list-h-spread">
            <div>
                <strong>{props.card.term}</strong>
                <p>{props.card.definition}</p>
            </div>
            <div className="list-v">
                <Link to={`cards/${props.card.id}/edit`}>Edit</Link>
                <button>Delete</button>
            </div>
        </div>
    )
}