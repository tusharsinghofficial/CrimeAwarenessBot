import Signin from './component/signin';
import Signup from './component/signup';
import Chat from './component/chat';
import Error from './component/error';
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
