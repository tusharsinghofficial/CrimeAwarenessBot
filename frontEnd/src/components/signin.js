import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Header from './header';
import axios from 'axios';
import Chat from './chat';
const Login = () => {
    const history = useHistory();

    const [emailEnteredByUser, setEmailEnteredByUser] = useState('');
    const [passwordEnteredByUser, setPasswordEnteredByUser] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [JWT, setJWT] = useState("");
    const [login, setlogin] = useState(false)


    const HandleLogin = () => {
        console.log('Post request - Data passed = ', emailEnteredByUser, passwordEnteredByUser);
        const data = {
            "email": emailEnteredByUser,
            "password": passwordEnteredByUser
        };

        setIsPending(true);

        axios.post('http://localhost:5000/api/user/login', data)
            .then(async (resp) => {
                console.log("Token ", resp["data"]);
                localStorage.setItem('JWT',resp["data"]);
                history.push({
                    pathname: '/chat'
                })
                
                setIsPending(false);
            })
        // setEmailEnteredByUser("");
        // setPasswordEnteredByUser("");

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
                        <button className="login" onClick={HandleLogin}>Log In</button>
                    </div>

                </div>
            </section>
        </article>

    );
}

export default Login;