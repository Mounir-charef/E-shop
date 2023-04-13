import axiosInstance from "../axios.js";
import { useState, useContext } from "react";
import AuthContext from "../AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";
import {useMessage} from "../hooks/useMessage.jsx";

const Register = () => {
  const { message, showMessage } = useMessage(4000);
  const { baseUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`${baseUrl}api/user/create/`, {
        user_name: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then(() => {
        navigate("/login", { replace: true });
      })
      .catch(() => {
        showMessage({ text: "Invalid credentials or user exists please retry", type: "error" });
      });
    setFormData(initialFormData);
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gradient-to-bl from-[#afd9d8] to-sky-100 h-screen overflow-hidden ">
        <div className="form-wrap">
          <h1 className="text-3xl font-bold text-center mb-4 font-Stylish">
            Register
          </h1>
          <RegisterForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
          />
          <span className="text-center block mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-sky-700 transition"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
        {message.text && (
            <div className={`z-20 w-fit top-0 left-1/2 ${message.type === 'success' ? 'bg-sky-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md fixed animate-fade-in-down`}>
                {message.text}
            </div>
        )}
    </>
  );
};

export default Register;
