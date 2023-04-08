import { useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext.jsx';

export default function Logout() {
	const { setToken } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		axiosInstance.post('http://localhost:8000/api/user/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		}).catch((error) => console.log(error));
		setToken(null);
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		navigate('/login', { replace: true });
	});
	return <div>Logout</div>;
}