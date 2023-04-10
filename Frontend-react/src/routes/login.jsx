import axiosInstance from "../axios";
import {useState, useContext} from "react";
import AuthContext from "../AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";

const login = () => {
    const {setToken, baseUrl} = useContext(AuthContext);
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: "",
        password: "",
    });

    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`${baseUrl}api/token/`, {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                if(res.status === 200){
                    setToken(res.data.access);
                    localStorage.setItem("refresh_token", res.data.refresh);
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
                    navigate("/", {replace: true});
                }else{
                    alert("error while logging in, please try again!!");
                }
            }).catch((err) => console.log(err));
        setFormData(initialFormData);
    }

    return (
        <div className="flex justify-center items-center
        bg-gradient-to-bl from-[#afd9d8] to-sky-100 h-screen overflow-hidden ">
            <div className="form-wrap">
                <h1 className="text-3xl font-bold text-center mb-4 font-Pacifico">Login</h1>
                <LoginForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formData={formData}
                />
                <span className="text-center block mt-4">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-sky-700 transition">Register</Link></span>
            </div>
        </div>
    );
};

export default login;