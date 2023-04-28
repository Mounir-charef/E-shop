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
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Swiper
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          className="max-w-md mx-auto"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Product ${index}`}
                className="w-full object-contain rounded-lg shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            Product Title
          </h2>
          <p className="text-lg font-medium text-gray-700 mb-6">
            Product description lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Suspendisse varius enim in eros elementum tristique.
          </p>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500">Size:</span>
            <span className="text-gray-900 font-medium">Medium</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-500">Price:</span>
            <span className="text-gray-900 font-medium">$20</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
