const ErrorHandler = ({ retry }) => (
  <div className='flex flex-col h-[calc(100vh-5rem)] justify-center items-center'>
    <h3>Oops! Something went wrong</h3>
    <button className='px-2 py-1 rounded border-2' onClick={retry}>Try again</button>
  </div>
);

export default ErrorHandler;
