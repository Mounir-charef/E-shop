import { useEffect, useContext, useState } from "react";
import axiosInstance from "../axios.js";
import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext.jsx";
import {useMessage} from "../hooks/useMessage.jsx";
import ErrorHandler from "../components/ErrorHandeler.jsx";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import {AiOutlineCiCircle} from "react-icons/ai";
import {Rings} from "react-loader-spinner";
import error_img from "../assets/404_Error-rafiki.svg";
import Skeleton from "react-loading-skeleton";

SwiperCore.use([Navigation, Pagination]);

const Product = () => {
  const { baseUrl } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image_loaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const {message, showMessage } = useMessage(4000);
  const [ordering, setOrdering] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleAddToCart = () => {
        if (quantity === 0) {
            showMessage({text: "please enter a valid quantity", type: 'error'});
            return;
        }
        setOrdering(true);
        axiosInstance.post(baseUrl +'api/orders/', {
            product: id,
            quantity: quantity
        }).then(() => {
            showMessage({text: `${quantity} of ${product.name} Added to cart`, type: 'success'});}
        ).catch(err => {
            if (err.response === undefined) {
                showMessage({text: "something went wrong try again later", type: 'error'});
            } else {
                showMessage({text: err.response.data.message, type: 'error'});
            }

        }).finally(() => {
            setOrdering(false);
        });
    }

  const getProduct = () => {
    setLoading(true);
    axiosInstance.get(`${baseUrl}api/products/` + id).then((res) => {
        setProduct(res.data);
        setError(false)
      }).catch(() => {
          setError(true);
      }).finally(() => {
          setLoading(false);
      });
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex justify-center items-center">
					<Rings
					  height="100"
					  width="100"
					  color="#38bdf8"
					  radius="6"
					  visible={true}
					  ariaLabel="rings-loading"
					/>
      </div>
    );
  }

  if (error) {
    return (
        <ErrorHandler retry={getProduct} />
    );
  }

  return (
    <>
          {message.text && (
                    <div className={`z-20 w-fit top-0 left-1/2 ${message.type === 'success' ? 'bg-sky-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md fixed animate-fade-in-down`}>
                      {message.text}
                    </div>
          )}
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
                    onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src=error_img;
                          }}
                    onLoad={() => setImageLoaded(true)}
                  />
                    {!image_loaded && (
                        <>
                            <Skeleton className='product-skeleton'/>
                        </>
                    )}
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
                    onChange={(e) => {
                        if(e.target.value > 500 || e.target.value < 0) return;
                        setQuantity(e.target.value)
                    }}
                    className='w-12 h-8 border border-gray-300 rounded-md text-center'
                />
              </div>
                    <button className="active-btn md:self-center" onClick={handleAddToCart}>
                        {ordering ? (
                            <AiOutlineCiCircle className='animate-spin' />
                        ) : (
                            'Add to cart'
                        )}
                    </button>
            </div>
          </div>
        </div>
      </>
  );
};

export default Product;
