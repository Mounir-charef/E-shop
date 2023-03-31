import NavBar from "./NavBar.jsx";
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <NavBar>
                <Link className='p-5 text-sky-400/100' to="/">Home</Link>
                <Link className='p-5 text-sky-400/100' to="/login">login</Link>
                <Link className='p-5 text-sky-400/100' to="/register">register</Link>
            </NavBar>
        </>
    );
};

export default Header;
