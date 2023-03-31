const Posts = ({posts}) => {
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<>
			<h1 className='text-lg'>Posts</h1>
			{posts.results.map((post, index) => {
				return (
					<div key={index} className="card">
						<div className="card-body">
							<h5 className="card-title">{post.title}</h5>
							<p className="card-text">{post.content}</p>
						</div>
					</div>
				);
			})}
			<p> - Number of posts is : {posts.count}</p>

		</>
	);
};
export default Posts;