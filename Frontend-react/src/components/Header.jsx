import { Link } from 'react-router-dom'
import { IoLogOutOutline, IoPersonOutline} from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import { useState, useContext } from 'react';
import AuthContext from '../AuthContext.jsx';
import {useLocation, useNavigate} from "react-router-dom";
import SearchField from "./SearchField.jsx";
import axiosInstance from "../axios.js";

const Header = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {name, setToken} = useContext(AuthContext);
    const search = new URLSearchParams(window.location.search).get('search');
    const data = useState({search: ''});

    const goSearch = (e) => {
        e.preventDefault();
        if(data.search){
            navigate("/?search=" + data.search);
        }
        else{
            navigate("/");
        }
        window.location.reload();
    }

    const logout = () => {
        axiosInstance.post('http://localhost:8000/api/user/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		}).catch((error) => console.log(error));
		setToken(null);
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
    }

    return (
        <nav className='bg-gray-900 h-20 font-[1.2] sticky w-full top-0 z-10'>
            <div className='flex px-4 md:px-12 justify-between items-center h-full'>
                <Link className='title nav-item flex gap-1 ' to="/">
                    E-Shop <FaShopify/>
                </Link>
                <div className='flex gap-5 items-center'>
                    {pathname === '/' &&
                        <SearchField placeHolder='Search' data={data} goSearch={goSearch} search={search}/>
                    }
                    {/*<p className='nav-item text-2xl self-end'>{balance}$</p>*/}
                    <Link className='nav-item flex items-center gap-1.5' to="/profil">
                        <IoPersonOutline />
                        <p className='text-sm self-end'>{name}</p>
                    </Link>
                    <i className='nav-item' onClick={logout}>
                        <IoLogOutOutline/>
                    </i>
                </div>
            </div>
        </nav>
    );
};

export default Header;
