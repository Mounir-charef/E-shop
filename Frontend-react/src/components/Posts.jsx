const posts = ({ posts }) => {
    if(!posts.length) return <h1 className="text-2xl text-center">No posts found</h1>
    return (
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-5rem)]">
            {posts.map((post) => (
                <div key={post.id} className="bg-gray-100 rounded shadow p-6">
                    <h3 className="font-bold text-xl mb-3">{post.name}</h3>
                    <p className="text-gray-600">{post.price}$</p>
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
    );
}

export default posts;