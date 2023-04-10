import React from 'react';

const SearchField = ({search, data, goSearch, placeHolder}) => {
    return (
        <form onSubmit={goSearch}>
                            <input
                            className='bg-gray-800 text-white rounded-md px-2 py-1 w-20 md:w-36 lg:w-64'
                            type="text"
                            placeholder={placeHolder}
                            defaultValue={search}
                            onChange={(e) => {
                                data.search = e.target.value;
                            }}/>
        </form>
    );
};

export default SearchField;
