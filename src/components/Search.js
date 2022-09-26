import React from 'react'

function Search({ value, onChange, children }) {
    return (
        <div>
            <label>{children}</label>
            <input
            id="search"
            type="search"
            value={value}
            onChange={onChange}
            />
        </div>
    )
}

export default Search
