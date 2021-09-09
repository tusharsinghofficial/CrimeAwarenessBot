import Signin from './components/signin';
import Signup from './components/signup';
import Chat from './components/chat';
import Error from './components/error';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { AnimatePresence } from "framer-motion"; // cover switch with the tag

function App() {
    return (
        <Router>
            <Switch>

                <Route exact path="/">
                    <Signin></Signin>
                </Route>

                <Route exact path="/signup">
                    <Signup></Signup>
                </Route>

                <Route exact path="/error">
                    <Error></Error>
                </Route>

                <Route exact path="/chat">
                    <Chat></Chat>
                </Route>

                <Route component={Error} />

            </Switch>    
        </Router>
    );
}

export default App;
