import { useEffect, useState} from 'react';
import axiosInstance from '../axios';
import Posts from "../components/Posts.jsx";
import PostLoading from "../components/PostLoading.jsx";
const Hero = () => {
    const PostLoadingComponent = PostLoading(Posts);
    const [appState, setAppState] = useState({
        loading: false,
        posts: null,
    });

    useEffect(() => {
		axiosInstance.get('').then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);
    return (
        <div>
            <p>hello bois i believe u logged in lemmi check</p>
			<hr/>
            {localStorage.getItem('access_token') ? (
                            <p>you are logged in</p>
                        ) : (
                            <p>you are not logged in</p>
                        )}
			<hr/>
            <PostLoadingComponent isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
};

export default Hero;
