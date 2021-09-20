// import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import Header from './header';
import axios  from 'axios';
const Chat = () => {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [chatEntered, setChatEntered] = useState("");

    // ---------- GET REQUEST TO GET CHAT DATA FROM DB ----------
    const getChat = () =>{
        const x = localStorage.getItem("JWT");
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/chat/getChat',
            headers:{
                'auth-token':x
            }
          })
          .then((resp) => {
            setData(resp["data"].reverse());
        })
        .catch(err=>console.log(err))
    }

    //INITIAL CALL WHEN PAGE LOADS
    useEffect(() => { 
        getChat();
    }, [data]);

    // ---------- POST REQUEST WHEN CHAT IS SENT TO THE DB ----------


    const handleSend = () => {
        const chatData = {"text":chatEntered};
        const jwt = localStorage.getItem('JWT');
            axios({
                method: 'post',
                url: 'http://localhost:5000/api/chat/postChat',
                headers:{
                    'auth-token':jwt
                },
                data: chatData
              })
              .then((resp) => {
                console.log("Chat Saved to the Db");
            })
            .catch(err=>console.log(err))
        setChatEntered("");

        //SET FETCH REQUEST TO GET DATA FROM THE DATABASE
        getChat();
    }



    return ( 

        <article className="Chat">

            <Header display="show"></Header>
            
            <section className="home-container">
            
                <div className="chat-area">
                    
                    {/* PUT LOOP IN REVERSE */}
                    { error && <div>{ error }</div> }
                    { data && 
                        data.map((chat)=>(
                            chat.sender=='bot'?
                             (<div className="chat-template recieved">
                            <p className="body">{chat.text}</p>
                            <p className="time">{chat.createdAt}</p>
                        </div>):
                            (<div className="chat-template sent">
                            <p className="body">{chat.text}</p>
                            <p className="time">{chat.createdAt}</p>
                        </div>)
                        ))
                    }
                    
                </div>
                {/* INPUT BOX FOR CHAT */}
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