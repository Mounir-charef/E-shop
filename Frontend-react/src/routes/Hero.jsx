import { useEffect, useState, useContext} from 'react';
import axiosInstance from '../axios';
import Posts from "../components/Posts.jsx";
import PostLoading from "../components/PostLoading.jsx";
import AuthContext from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
const Hero = () => {
    const navigate = useNavigate();
    const PostLoadingComponent = PostLoading(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
        next: null,
        previous: null
    });

    const search = new URLSearchParams(window.location.search).get('search') || null;
    const data = useState({search: ''}) ;

    const {name} = useContext(AuthContext);

    const goSearch = (e) => {
        e.preventDefault();
        if(data.search){
            navigate("/?search=" + data.search);
        }
        else{
            navigate("/");
        }
        window.location.reload();
    }

    const getNextPage = async (e) => {
        const url = e.target.name === "next" ? appState.next : appState.previous;
        axiosInstance.get(url).then((res) => {
            const data = res.data;
            setAppState({ loading: false, posts: data.results, next: data.next, previous: data.previous});
        });
    }

    useEffect(() => {
        axiosInstance.get('http://localhost:8000/api/ecom/products/',{
            params: {
                search: search
            }
        }).then((res) => {
                const data = res.data;
                console.log(data.next);
                setAppState({ loading: false, posts: data.results, next: data.next, previous: data.previous});
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    return (
        <div>
            <p>hello bois i believe u logged in lemmi check {name}</p>
			<hr/>
            <form onSubmit={goSearch}>
                <input
                type="text"
                placeholder="Search"
                onChange={(e) => {
                    data.search = e.target.value;
                }}
            />
            </form>
			<hr/>
            <PostLoadingComponent isLoading={appState.loading} posts={appState.posts} />
            {appState.previous && <button name='previous' onClick={getNextPage}>Previous</button>}
            {appState.next && <button name='next' onClick={getNextPage}>Next</button>}
        </div>
    );
};

export default Hero;
