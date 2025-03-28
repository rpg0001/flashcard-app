import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

export function Home() {
    const auth = useAuth();
    return (
        <div>
            <h1>Home</h1>
            {auth.user ? 
                <Link to="/decks">Decks</Link>
            :
                <ul>
                    <li><Link to="/auth/signup">Sign up</Link></li>
                    <li><Link to="/auth/signin">Sign in</Link></li>
                </ul>    
            }
        </div>
    )
}