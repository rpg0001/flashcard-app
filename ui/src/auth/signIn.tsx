import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export function SignIn() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();
        
        if (!email || !password) {
            setErrorMessage("Must provide email and password");
            return;
        }

        try {
            auth.postSignIn(email, password);
            navigate("/");
        } catch (error: any) {
            console.error(error.message);
            setErrorMessage("Failed to sign up, please try again");
            return;
        }
    }

    return (
        <div>
            <h1>Sign in</h1>
            
            {errorMessage ? <p>{ errorMessage }</p> : null}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='text' 
                        id='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
}