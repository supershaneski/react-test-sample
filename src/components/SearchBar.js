import React from 'react'

function SearchBar() {

    const [search, setSearch] = React.useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div>
            <Search value={search} onChange={handleChange}>Search:</Search>
            <p>Searches for { search ? search : '...'}</p>
        </div>
    )

}

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

export default SearchBar