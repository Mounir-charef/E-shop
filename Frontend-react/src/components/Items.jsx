import Item from "./Item.jsx";
const items = ({ posts }) => {
    if(!posts.length) return <h1 className="text-2xl text-center">No posts found</h1>
    return (
        <div className='p-16'>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {posts.map((post) => (
                    <Item key={post.id} post={post}/>
                ))}
            </ul>
        </div>
    );
}

export default items;