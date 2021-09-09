import imageURL from '../logo.png';
import { Link } from "react-router-dom";

const Header = (prop) => {

    return ( 
        <header>
            <div className="header-flex">
                <figure>
                    <img src={imageURL} alt=""/>
                </figure>
                <div className={prop.display}>
                    <Link to="/"><span className="logout-btn">Log Out</span></Link>
                </div>
            </div>
        </header>
    );
}
 
export default Header;