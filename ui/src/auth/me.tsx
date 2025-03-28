import { useAuth } from "../hooks";

export function Me() {
    const auth = useAuth();
    return  (
        <div>
            {auth.user ? 
                <div>
                    <h1>My account</h1>
                    <small>Joined {auth.user.createdAt.split("T")[0]}</small>
                    <p>
                        <h4>Email</h4>
                        <input type="text" disabled={true} value={auth.user.email}></input>
                    </p>
                    <p>
                        <h4>Username</h4>
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