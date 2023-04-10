const ErrorHandler = ({ retry, loading }) => (
  <div className='flex flex-col h-96 justify-center items-center'>
    <h3>Oops! Something went wrong</h3>
    <button className='px-2 py-1 rounded border-2' onClick={retry}>Try again</button>
  </div>
);

export default ErrorHandler;
