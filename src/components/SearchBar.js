import React from 'react'

function SearchBar() {

    const [search, setSearch] = React.useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div>
            <p>Searches for { search ? search : '...'}</p>
        </div>
    )

}

export default SearchBar