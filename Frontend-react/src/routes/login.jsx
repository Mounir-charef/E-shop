import axiosInstance from "../axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const login = () => {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: "",
        password: "",
    });

    const [formData, updateFormData] = useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axiosInstance
            .post(`token/`, {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                console.log(res);
                console.log(res.data);
                navigate("/", {replace: true});
            }).catch((err) => console.log(err));
    }

    return (
        <div className="p-5">
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={handleChange}
                    autoComplete='email'
                    name='email'
                    placeholder='Email'
                    id='email'
                    required
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                />
                <input type="password"
                          onChange={handleChange}
                            autoComplete='current-password'
                            name='password'
                            placeholder='Password'
                            id='password'
                            required
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                />
                <button
                    onClick={handleSubmit}
                    type='submit'
                    className='w-full p-2 mt-2 text-white bg-blue-500 rounded-md focus:outline-none focus:bg-blue-600 hover:bg-blue-600'
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default login;
