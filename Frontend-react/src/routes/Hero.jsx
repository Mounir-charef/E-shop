import { useEffect, useState, useContext} from 'react';
import axiosInstance from '../axios';
import Posts from "../components/Posts.jsx";
import PostLoading from "../components/PostLoading.jsx";
import AuthContext from "../AuthContext.jsx";
const Hero = () => {
    const PostLoadingComponent = PostLoading(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null
    }),
         [next, setNext] = useState(null),
         [previous, setPrevious] = useState(null);

    const {name} = useContext(AuthContext);

    const getNextPage = async () => {
        const cursor = next ? (new URL(next)).searchParams.get("cursor") : null;
        axiosInstance.get('', {
            params: {
                cursor: cursor
            }
        }).then((res) => {
            const data = res.data;
            setAppState({ loading: false, posts: data.results});
            setNext(data.next);
            setPrevious(data.previous);
        });
    }
    const getPreviousPage = async () => {
        const cursor = previous ? (new URL(previous)).searchParams.get("cursor") : null;
        axiosInstance.get('', {
            params: {
                page: cursor
            }
        }).then((res) => {
            const data = res.data;
            setAppState({ loading: false, posts: data.results});
            setNext(data.next);
            setPrevious(data.previous);
        });
    }

    useEffect(() => {
        axiosInstance.get('').then((res) => {
                const data = res.data;
                setAppState({ loading: false, posts: data.results});
                setNext(data.next);
                setPrevious(data.previous);
        });
    }, []);
    return (
        <div>
            <p>hello bois i believe u logged in lemmi check</p>
			<hr/>
            {localStorage.getItem('access_token') ? (
                            <p>you are logged in {name}</p>
                        ) : (
                            <p>you are not logged in {name}</p>
                        )}
			<hr/>
            <PostLoadingComponent isLoading={appState.loading} posts={appState.posts} />
            {previous && <button onClick={getPreviousPage}>Previous</button>}
            {next && <button onClick={getNextPage}>Next</button>}
        </div>
    );
};

export default Hero;
