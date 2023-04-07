// a React component that renders a list of posts and every post is a square card with tailwind

const posts = ({ posts }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-gray-100 rounded shadow p-6">
                    <h3 className="font-bold text-xl mb-3">{post.name}</h3>
                    <p className="text-gray-600">{post.price}</p>
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
    );
}

export default posts;