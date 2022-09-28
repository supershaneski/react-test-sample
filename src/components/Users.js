import React from 'react'
import PropTypes from 'prop-types'

const Person = ({ id, name, birthdate, section}) => {
    return (
        <div>
            <div>{id}</div>
            <div>{name}</div>
            <div>{birthdate}</div>
            <div>{section}</div>
        </div>
    )
}

async function getRemoteData(_page, _count) {
    const url = `http://${process.env.REACT_APP_REMOTE_URL}/users?page=${_page}&count=${_count}`
    const response = await fetch(url)
    return await response.json()
}

export default function Users({ page, count }) {

    const [users, setUsers] = React.useState([])
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        
        getRemoteData(page, count).then((data) => {

            setUsers(data.items)
            setError(false)
            setLoading(false)

        }).catch((err) => {
            setError(true)
            setLoading(false)
            setUsers([])
        })

    }, [page, count])

    return (
        <div>
            { loading && <span>Loading...</span>}
            {
                (!error && !loading) &&
                <div>
                    <p>Total: {users.length}</p>
                    <ul>
                        {
                            users.map(user => {
                                return (
                                    <li key={user.id}>
                                        <Person {...user} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
            { (error && !loading) && <span>Oops, something went wrong!</span>}
        </div>
    )

}

Users.defaultProps = {
    page: 0,
    count: 10,
}

Users.propTypes = {
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
}