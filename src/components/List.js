import React from 'react'

async function getList() {
    const url = `http://${process.env.REACT_APP_REMOTE_URL}/search`
    const response = await fetch(url)
    return await response.json()
}

function List() {

    const [stories, setStories] = React.useState([])
    const [error, setError] = React.useState(null)

    async function handleFetch() {

        getList().then(data => {
            
            setStories(data.items)
            setError(null)

        }).catch(error => {
            
            setError(error)
        
        })

    }

    return (
        <div>
            <button type="button" onClick={handleFetch}>Fetch Stories</button>

            {error && <span>Something went wrong...</span>}
            
            <ul>
            {
                !error && stories.map(story => {
                    return (
                        <li key={story.id}>
                            <span>{story.title}</span>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default List
