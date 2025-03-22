import { useAuth } from "../hooks/useAuth";

export default function Me() {
    const auth = useAuth();
    return  (
        <div>
            {auth.user ? 
                <div>
                    <h1>My account</h1>
                    <p>
                        <h2>Email</h2>
                        <input type="text" disabled={true} value={auth.user.email}></input>
                    </p>
                    <p>
                        <h2>Username</h2>
                        <input type="text" disabled={true} value={auth.user.username}></input>
                    </p>
                </div>
                :
                <div>
                    <p>User is not logged in!</p>
                </div>
            }
        </div>
    )
}