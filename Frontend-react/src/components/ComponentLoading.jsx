import {Rings} from "react-loader-spinner";
function ComponentLoading(Component) {
	return function PostLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<div className="h-96 flex justify-center items-center">
					<Rings
					  height="100"
					  width="100"
					  color="#38bdf8"
					  radius="6"
					  visible={true}
					  ariaLabel="rings-loading"
					/>
			</div>

		);
	};
}
export default ComponentLoading;