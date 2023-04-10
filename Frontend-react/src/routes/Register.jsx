import axiosInstance from "../axios.js";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../AuthContext.jsx";

const Register = () => {
    const {baseUrl} = useContext(AuthContext)
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        username: "",
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
            .post(`${baseUrl}/user/create/`, {
                user_name: formData.username,
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/login", {replace: true});
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
                <input
                    type='text'
                    onChange={handleChange}
                    name='username'
                    placeholder='Username'
                    id='username'
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

export default Register;
