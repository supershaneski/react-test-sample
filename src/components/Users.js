import React from 'react'
import PropTypes from 'prop-types'

const Person = ({ id, name, section}) => {
    return (
        <div style={styles.itemDiv}>
            { id ? <div style={styles.item}>{id}</div> : <div style={{
                ...styles.skeleton,
                width: '50%',
            }}>&nbsp;</div>}
            { name ? <div style={styles.item}>{name}</div> : <div style={{
                ...styles.skeleton,
                width: '70%',
            }}>&nbsp;</div>}
            { section ? <div style={styles.item}>{section}</div> : <div style={styles.skeleton}>&nbsp;</div>}
        </div>
    )
}

async function getRemoteData(_page, _count) {
    const url = `http://${process.env.REACT_APP_REMOTE_URL}/users?page=${_page}&count=${_count}`
    const response = await fetch(url)
    return await response.json()
}

const styles = {
    container: {
        position: 'relative',
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    listItem: {
        boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,',
        backgroundColor: '#254',
        borderRadius: 6,
        margin: 0,
        padding: 10,
        marginBottom: '12px',
    },
    skeleton: {
        backgroundColor: '#366',
        width: '80%',
        marginBottom: '1px',
    },
    item: {
        marginBottom: '1px',
    },
    itemDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}

export default function Users({ page, count = 1 }) {

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

    //{ loading && <span>Loading...</span>}
    
    const loadItems = new Array(count).fill(0)

    return (
        <div>
            {
                loading &&
                <div style={styles.container}>
                    <p>Loading...</p>
                    <ul style={styles.list}>
                        {
                            loadItems.map((a, i) => {
                                return (
                                    <li key={i} style={styles.listItem}>
                                        <Person />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            }
            {
                (!error && !loading) &&
                <div style={styles.container}>
                    <p>Total: {users.length}</p>
                    <ul style={styles.list}>
                        {
                            users.map(user => {
                                return (
                                    <li key={user.id} style={styles.listItem}>
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