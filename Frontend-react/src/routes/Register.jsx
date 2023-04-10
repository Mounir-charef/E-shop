import axiosInstance from "../axios.js";
import { useState, useContext } from "react";
import AuthContext from "../AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";

const Register = () => {
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
      .post(`${baseUrl}user/create/`, {
        user_name: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
    setFormData(initialFormData);
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-bl from-[#afd9d8] to-sky-100 h-screen overflow-hidden ">
      <div className="form-wrap">
        <h1 className="text-3xl font-bold text-center mb-4 font-Pacifico">
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
  );
};

export default Register;
