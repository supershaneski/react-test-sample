import React from 'react'

const getUser = async (userId) => {
    const url = `http://${process.env.REACT_APP_REMOTE_URL}/user/${userId}`
    const response = await fetch(url)
    return await response.json()
}

export default function User({ userId }) {

    const [user, setUser] = React.useState(null)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {

        getUser(userId).then(data => {

            setUser(data)
            setError(false)

        }).catch(error => {

            setUser(null)
            setError(true)
            
        })

    }, [ userId ])

    return (
        <div>
            <p>User Component</p>
            {
                user &&
                <p>
                    <span>uid: {user.uid}</span><br />
                    <span>pid: {user.pid}</span><br />
                    <span>name: {user.name}</span><br />
                    <span>address: {user.address}</span><br />
                    <span>date: {user.date}</span><br />
                </p>
            }
            {error && <span>Oops, something is wrong!</span>}
        </div>
    )
}