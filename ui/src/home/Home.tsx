import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
    const auth = useAuth();
    return (
        <div>
            <h1>Home</h1>
            {auth.user ? 
                <Link to="/notes">Notes</Link>
            :
                <ul>
                    <li><Link to="/auth/signup">Sign up</Link></li>
                    <li><Link to="/auth/signin">Sign in</Link></li>
                </ul>    
            }
        </div>
    )
}