import {useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Post = ({post}) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <li className="flex flex-col gap-2 rounded p-6 border shadow justify-between ">
                <figure className='relative' aria-label={post.categoty_name}>
                    <img
                        src={post.image}
                        alt={post.name}
                        className="w-full h-64 object-cover rounded hover:opacity-75 transition cursor-pointer hover:scale-105"
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
                <div className="flex justify-between items-end mt-4">
                    <p className="text-gray-700 text-lg font-semibold font-Pacifico">{post.price}$</p>
                    <button className="bg-sky-700 text-white px-4 py-2 rounded font-semibold hover:bg-transparent border border-sky-700 hover:text-sky-700 transition">
                        Add to cart
                    </button>
                </div>
        </li>
    );
};

export default Post;
