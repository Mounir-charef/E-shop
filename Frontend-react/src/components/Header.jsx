import { Link } from 'react-router-dom'
import { IoLogOutOutline, IoPersonOutline} from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import { useContext } from 'react';
import AuthContext from '../AuthContext.jsx';

const Header = () => {
    const {name} = useContext(AuthContext);
    return (
        <nav className='bg-gray-900 h-20 font-[1.2] sticky w-full top-0 z-10'>
            <div className='flex px-12 justify-between items-center h-full'>
                <Link className='title nav-item flex gap-1 ' to="/">
                    E-Shop <FaShopify/>
                </Link>
                <div className='flex gap-5'>
                    <Link className='nav-item flex items-center' to="/profile">
                        <IoPersonOutline />
                        <p className='text-sm self-end'>{name}</p>
                    </Link>
                    <Link className='nav-item'  to='/logout'>
                        <IoLogOutOutline/>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
