import { useEffect, useContext, useState } from "react";
import axiosInstance from "../axios.js";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext.jsx";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Navigation, Pagination]);

const Product = () => {
  const { baseUrl } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get(`${baseUrl}api/products/` + id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [baseUrl, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="md:h-[calc(100vh-5rem)] bg-gradient-to-bl from-[#afd9d8] to-sky-100 mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl bg-white rounded-md grid-cols-1 md:grid-cols-2 gap-10 h-full p-6">
        <Swiper
          spaceBetween={10}
          navigation={{hideOnClick: true}}
          pagination={{ clickable: true, dynamicBullets: true, dynamicMainBullets: 3,hideOnClick: true }}
          className="w-full"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Product ${index}`}
                className="object-contain rounded select-none w-full h-96"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='self-center flex flex-col'>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h2>
          <p className="text-lg font-medium text-gray-700 mb-6">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500">Price:</span>
            <span className="text-gray-900 font-medium">${quantity * product.price}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500">Quantity:</span>
            <input
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='w-12 h-8 border border-gray-300 rounded-md text-center'
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg md:self-center">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
