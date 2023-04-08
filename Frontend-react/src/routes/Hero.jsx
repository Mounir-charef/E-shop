import {useState, useContext} from 'react';
import Posts from "../components/Posts.jsx";
import PostLoading from "../components/PostLoading.jsx";
import AuthContext from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData.jsx";
const Hero = () => {
    const navigate = useNavigate(),
     PostLoadingComponent = PostLoading(Posts),
     data = useState({search: ''}) ,
     {name} = useContext(AuthContext);

    const [appState, getNextPage] = useFetchData('http://localhost:8000/api/ecom/products/');

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
