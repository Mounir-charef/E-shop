import NavBar from "./NavBar.jsx";
import { Link } from 'react-router-dom'
import { IoLogOutOutline} from "react-icons/io5";

const Header = () => {
    return (
        <>
            <NavBar>
                <Link className='p-5 text-sky-400/100' to="/">Home</Link>
                {/*<Link className='p-5 text-sky-400/100' to="/login">login</Link>*/}
                {/*<Link className='p-5 text-sky-400/100' to="/register">register</Link>*/}
                <Link className='p-5 text-sky-400/100'  to='/logout' > <IoLogOutOutline/> </Link>
            </NavBar>
        </>
    );
};

export default Header;
