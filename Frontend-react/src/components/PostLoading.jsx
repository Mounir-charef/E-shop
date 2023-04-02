import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function PostLoading(Component) {
	return function PostLoadingComponent({ isLoading, ...props }) {
		if (!isLoading) return <Component {...props} />;
		return (
			<Skeleton count={10} className='w-24' height={120} wrapper={Box}  inline={true}
					  containerClassName='flex gap-5 flex-wrap p-10' />
		);
	};
}
export default PostLoading;


const Box = ({ children }) => (
	  <div className='border p-2 aspect-square'>
		{children}
	  </div>
)