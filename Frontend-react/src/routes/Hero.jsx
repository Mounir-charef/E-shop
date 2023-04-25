import Posts from "../components/Posts.jsx";
import ComponentLoading from "../components/ComponentLoading.jsx";
import useFetchData from "../hooks/useFetchData.jsx";
import ErrorHandler from "../components/ErrorHandeler.jsx";
import {useContext} from "react";
import AuthContext from "../AuthContext.jsx";

const Hero = () => {
    const {baseUrl} = useContext(AuthContext);
    const PostLoadingComponent = ComponentLoading(Posts),
        {appState, getNextPage, getInitialPage} = useFetchData(baseUrl + 'api/products/');
    const hasPrevious = appState.previous !== null,
        hasNext = appState.next !== null;

    if (appState.error) return <ErrorHandler retry={getInitialPage} />;



    return (
        <div className='min-h-fit'>
            <PostLoadingComponent isLoading={appState.loading} posts={appState.posts} />

            {!appState.loading &&
                (
                    <div className="flex justify-center gap-5 items-center mb-16">
                    <button
                        className={
                            hasPrevious ? "active-btn" :
                                "disabled-btn"
                        }
                        onClick={getNextPage}
                        name='prev'
                        disabled={appState.previous === null}
                    >
                        Previous Page
                    </button>
                    <button
                        className={
                            hasNext ? "active-btn" :
                                "disabled-btn"
                        }
                        onClick={getNextPage}
                        name='next'
                        disabled={appState.next === null}

                    >
                        Next Page
                    </button>
                </div>
            )}

        </div>
    );
};

export default Hero;
