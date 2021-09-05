import { Link } from "react-router-dom";
import { useState } from "react";
import Header from './header';

const Login = () => {

    const [emailEnteredByUser, setEmailEnteredByUser] = useState('');
    const [passwordEnteredByUser, setPasswordEnteredByUser] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [JWT, setJWT] = useState("");


    const handleLogin = () => {
        console.log('Post request - Data passed = ',emailEnteredByUser, passwordEnteredByUser);
        const data = {emailEnteredByUser, passwordEnteredByUser};

        setIsPending(true);

        fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        .then((resp) => {
            setJWT(resp);
            console.log("Successfully Logged-in");
            console.log("Token ", JWT);
            setIsPending(false);
        })
        setEmailEnteredByUser("");
        setPasswordEnteredByUser("");
    }

    return (

        <article>
            <Header display="hide"></Header>                

            <section className="container">
                <div className="LoginCard">

                    <div className="heading">Log In</div>

                    <div className="inputs">
                        <div>
                            <label>Enter Email or Phone Number</label>
                            <div className="input-container">
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Enter Email or Phone Number"
                                    value={emailEnteredByUser}
                                    onChange={(e) => setEmailEnteredByUser(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Enter Password</label>
                            <div className="input-container">
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Enter Your Password"
                                    value={passwordEnteredByUser}
                                    onChange={(e) => setPasswordEnteredByUser(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="route">
                        <div><Link to="/signup"><span className="link">Not Yet Registered? Sign Up</span></Link></div>
                    </div>

                    <div className="btn-container">
                        <button className="login" onClick={handleLogin}>Log In</button>
                    </div>

                </div>
            </section>
        </article>

    );
}
 
export default Login;