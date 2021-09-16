// import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Header from './header';

const Chat = () => {
    
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    // ---------- GET REQUEST ----------
   
    useEffect(() => { 
        const x = localStorage.getItem("JWT");
        console.log(x);
        fetch('http://localhost:5000/api/chat/getChat', {
            method: 'GET',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        .then((resp) => {
            console.log("Successfully Signed-up");
            if (!resp.ok) { 
                // error coming back from server
                throw Error('could not fetch the data for that resource');
            } 
            return resp.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
        })
        .catch(err => {
            if (err.name === '') {
                console.log('fetch aborted')
            } 
            else {
                // auto catches network / connection error
                setIsPending(false);
                setError(err.message);
            }
        })
    }, []);

    // ---------- POST REQUEST ----------

    const [chatEntered, setChatEntered] = useState("");

    const handleSend = () => {
        const data = {chatEntered};
        fetch('http://localhost:4000/api/chat/postChat', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        })
        .then((resp) => {
            console.log("Successfully Signed-up");
        })
        setChatEntered("");
    }



    return ( 

        <article className="Chat">

            <Header display="show"></Header>
            
            <section className="home-container">
            
                <div className="chat-area">
                    
                    {/* PUT LOOP IN REVERSE */}

                    { error && <div>{ error }</div> }
                    { isPending && <div>Loading...</div> }
                    { data && 
                        data.map((chat)=>(
                            <div className="chat-template sent">
                                <p className="body">{chat.text}</p>
                                <p className="time">{chat.createdAt}</p>
                            </div>
                        ))
                    }
                    
                </div>
            
                <div className="input-area">
                    <div className="input-box">
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder="Type here..."
                                value={chatEntered}
                                onChange={(e) => setChatEntered(e.target.value)}
                            />
                        </div>
                        <div className="send-btn">
                            <button onClick={handleSend}><i className="fa fa-paper-plane-o"></i></button>
                        </div>
                    </div>
                </div>
            </section>
        
        </article>

    );
}
 
export default Chat;

/*

<div className="chat-template recieved">
    <p className="body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut adipisci aperiam quasi ut nobis, consequuntur consequatur libero numquam repellat temporibus?</p>
    <p className="time">9:41</p>
</div>

<div className="chat-template sent">
    <p className="body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut adipisci aperiam quasi ut nobis, consequuntur consequatur libero numquam repellat temporibus?</p>
    <p className="time">9:41</p>
</div>

*/