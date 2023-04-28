import {useEffect, useContext} from "react";
import axiosInstance from "../axios.js";
import { useParams} from "react-router-dom";
import AuthContext from "../AuthContext.jsx";

const Product = () => {
    const {baseUrl} = useContext(AuthContext);
    const {id} = useParams();
    useEffect(() => {
        axiosInstance.get(`${baseUrl}api/products/` + id).then(res => {
            console.log(res.data);
        });
    });
    return (
        <div>
            hello from Product id: {id}
        </div>
    );
};

export default Product;
