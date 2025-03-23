import { Link } from "react-router-dom";
import { Deck } from "../../services";
import { useAuth } from "../../hooks";

export function UsernameLink(props: {
    deck: Deck
}) {
    const auth = useAuth();
    
    return <small>by {
        auth.user && (auth.user.id == props.deck.userId) ?
        <Link to={`/users/${props.deck.userId}`}>You</Link>
        :
        <Link to={`/users/${props.deck.userId}`}>{props.deck.username}</Link>
    }</small>
}