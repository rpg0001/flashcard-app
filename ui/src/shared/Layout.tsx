import { Outlet, Link } from "react-router-dom";
import './Layout.css';
import { useAuth } from "../hooks";

export function Layout() {
    const auth = useAuth();
    
    return (
        <>
            <header>
                <nav className="auth-navbar">
                    {auth.user ? 
                        <ul>
                            <li>
                                <button onClick={() => auth.postSignOut()}>Sign Out</button>
                            </li>
                            <li>
                                <Link to="/auth/me">Account</Link>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/auth/signin">Sign in</Link>
                            </li>
                            |
                            <li>
                                <Link to="/auth/signup">Sign up</Link>
                            </li>
                        </ul>
                    }
                </nav>
                <nav className="main-navbar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        
                        {auth.user ?
                            <>
                                <li>
                                    <Link to="/decks">Decks</Link>
                                </li>
                            </> 
                            :
                            null
                        }
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
};