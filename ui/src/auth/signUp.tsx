import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords must match");
            return;
        }
        
        if (!email || !password || !username) {
            setErrorMessage("Must provide email, username and password");
            return;
        }

        try {
            auth.postSignUp(email, password, username);
            navigate("/");
        } catch (error: any) {
            console.error(error.message);
            setErrorMessage("Failed to sign up, please try again");
            return;
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            
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
                    <label htmlFor='username'>Username</label>
                    <input 
                        type='text' 
                        id='username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <div>
                    <label htmlFor='confirm-password'>Confirm password</label>
                    <input 
                        type='password' 
                        id='confirm-password' 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}