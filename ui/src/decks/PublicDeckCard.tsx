import { Card } from "../services";

export function PublicDeckCard(props: { 
    card: Card
}) {
    return (
        <div className="deck-card list-h-spread">
            <div>
                <strong>{props.card.term}</strong>
                <p>{props.card.definition}</p>
            </div>
        </div>
    )
}