import {useState, useRef} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {AiOutlineCiCircle} from "react-icons/ai";
import {useMessage} from "../hooks/useMessage.jsx";
import axiosInstance from "../axios.js";

const Post = ({post}) => {
    const [loaded, setLoaded] = useState(false);
    const [ordering, setOrdering] = useState(false);
    const inputRef = useRef(null);
    const {message, showMessage } = useMessage(4000);

    const handleAddToCart = () => {
        setOrdering(true);
        axiosInstance.post('http://127.0.0.1:8000/api/ecom/order/', {
            product: post.id,
            quantity: inputRef.current.value
        }).then(res => {
            showMessage({text: `${inputRef.current.value} of ${post.name} Added to cart`, type: 'success'});
            console.log(res.data);
        }
        ).catch(err => {
            showMessage({text: 'Something went wrong', type: 'error'});
            console.log(err);
        }).finally(() => {
            setOrdering(false);
        });
    }

    return (
        <>
            {message.text && (
                <div className={`z-20 w-fit top-0 left-1/2 ${message.type === 'success' ? 'bg-sky-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md fixed animate-fade-in-down`}>
                  {message.text}
                </div>
              )}
        <li className="flex flex-col gap-2 rounded p-6 border shadow justify-between ">
                <figure className='card-wrap groupe relative' data-category={post.category_name}>
                    <img
                        src={post.image}
                        alt={post.name}
                        className="w-full h-64 object-cover rounded hover:opacity-95 transition cursor-pointer hover:scale-105"
                        loading='lazy'
                        onLoad={() => setLoaded(true)}
                    />
                    {!loaded && (
                        <>
                            <Skeleton className='skeleton'/>
                            <Skeleton />
                        </>
                    )}
                    <figcaption className="text-center text-sky-700 text-md mt-2">{post.name}</figcaption>
                </figure>
                <p className="text-gray-700 px-2 mt-4 text-sm line-clamp-2">{post.description}</p>
                {/*I want to add number input field to get quantity of oder*/}
                <div>
                    <input
                        ref={inputRef}
                        id='quantity'
                        type='number'
                        name='quantity'
                        min='1'
                        max='10'
                        defaultValue='1'
                        className='w-12 h-8 border border-gray-300 rounded-md text-center'
                    />
                    <label htmlFor="quantity">
                        <span className='px-2 text-gray-500 text-sm'>
                            Quantity
                        </span>
                    </label>
                </div>
                <div className="flex justify-between items-end mt-4">
                    <p className="text-gray-700 text-lg font-semibold font-Pacifico">{post.price}$</p>
                    <button
                        className="add-btn"
                        onClick={handleAddToCart}
                    >
                        {ordering ? (
                            <AiOutlineCiCircle className='animate-spin' />
                        ) : (
                            'Add to cart'
                        )}
                    </button>
                </div>
        </li>
        </>
    );
};

export default Post;
