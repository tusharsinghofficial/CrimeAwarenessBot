import { Link } from "react-router-dom";
import Header from './header';
import { useState } from "react";

const Signup = () => {

    const [nameEnteredByUser, setNameEnteredByUser] = useState('');
    const [emailEnteredByUser, setEmailEnteredByUser] = useState('');
    const [passwordEnteredByUser, setPasswordEnteredByUser] = useState('');
    const [confirmPasswordEnteredByUser, setConfirmPasswordEnteredByUser] = useState('');

    const handleSignin = () => {
        if(passwordEnteredByUser === confirmPasswordEnteredByUser){
            const data = {nameEnteredByUser, emailEnteredByUser, passwordEnteredByUser};
            fetch('http://localhost:4000/api/user/register', {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data)
            })
            .then((resp) => {
                console.log(resp);
            })
            setNameEnteredByUser("");
            setEmailEnteredByUser("");
            setPasswordEnteredByUser("");
            setConfirmPasswordEnteredByUser("");
        }
        else{
            setPasswordEnteredByUser("");
            setConfirmPasswordEnteredByUser("");
            alert("Please make Sure Your Password and Confirm Password are the same !!!");
        }
    }

    return ( 
        <article>

            <Header display="hide"></Header>

            <section className="container">
                <div className="LoginCard">

                    <div className="heading">Sign Up</div>

                    <div className="inputs">
                        <div>
                            <label>Name</label>
                            <div className="input-container">
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Enter Your Name"
                                    value={nameEnteredByUser}
                                    onChange={(e) => setNameEnteredByUser(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Enter Email</label>
                            <div className="input-container">
                                <input 
                                    type="email" 
                                    name="email" 
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
                        <div>
                            <label>Confirm Password</label>
                            <div className="input-container">
                                <input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Enter Your Password"
                                    value={confirmPasswordEnteredByUser}
                                    onChange={(e) => setConfirmPasswordEnteredByUser(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="route">
                        <div><Link to="/"><span className="link">Already Registered? Log in</span></Link></div>
                    </div>

                    <div className="btn-container">
                        <button className="login" onClick={handleSignin}>Sign Up</button>
                    </div>

                </div>
            </section>
        </article>
    );
}
 
export default Signup;