import Posts from "../components/Posts.jsx";
import PostLoading from "../components/PostLoading.jsx";
import useFetchData from "../hooks/useFetchData.jsx";
import ErrorHandler from "../components/ErrorHandeler.jsx";
const Hero = () => {
    const PostLoadingComponent = PostLoading(Posts),
        [appState, getNextPage, search, getInitialPage] = useFetchData('http://localhost:8000/api/ecom/products/');

    if (appState.error) return <ErrorHandler retry={getInitialPage} loading={appState.loading} />;

    return (
        <div>
            <h1>{search}</h1>
            <PostLoadingComponent isLoading={appState.loading} posts={appState.posts} />
            {appState.previous && <button name='previous' onClick={getNextPage}>Previous</button>}
            {appState.next && <button name='next' onClick={getNextPage}>Next</button>}
        </div>
    );
};

export default Hero;
