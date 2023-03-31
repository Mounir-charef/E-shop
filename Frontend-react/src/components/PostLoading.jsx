function PostLoading(Component) {
	return function PostLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p className="text-lg">
				We are waiting for the data to load!...
			</p>
		);
	};
}
export default PostLoading;