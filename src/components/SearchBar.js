import React from 'react'
import Search from './Search'

function getUser() {
    return Promise.resolve({ id: '1', name: 'Timothy' })
}

function SearchBar() {

    const [search, setSearch] = React.useState('')
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        const loadUser = async () => {
            const user = await getUser()
            setUser(user)
        }

        loadUser()
    }, [])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div>
            { user ? <p>Signed in as {user.name}</p> : null }

            <Search value={search} onChange={handleChange}>Search:</Search>
            
            <p>Searches for { search ? search : '...'}</p>
        </div>
    )

}

export default SearchBar