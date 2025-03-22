import { Card } from "../services/cards";

export default function DeckCard(props: { card: Card }) {
    return (
        <div className="deck-card list-h-spread">
            <div>
                <strong>{props.card.term}</strong>
                <p>{props.card.definition}</p>
            </div>
            <div className="list-v">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}