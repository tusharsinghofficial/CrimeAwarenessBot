import { Link } from "react-router-dom";
import Header from './header';
import { useState } from "react";
import axios from 'axios';
const Signup = () => {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const handleSignin = () => {
        if (password === confirmpassword) {
            const data = { "name": name, "email": email, "password": password };
           
            axios.post('http://localhost:5000/api/user/register', data)
                .then((resp) => {
                    console.log(resp);
                })
                .catch(err => console.log(err));
            setname("");
            setemail("");
            setpassword("");
            setConfirmpassword("");
        }
        else {
            setpassword("");
            setConfirmpassword("");
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
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
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
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmpassword(e.target.value)}
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