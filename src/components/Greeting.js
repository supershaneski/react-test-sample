import React from 'react'

async function getGreeting(skey) {
    const url = `http://${process.env.REACT_APP_REMOTE_URL}/${skey}`
    const response = await fetch(url)
    return await response.json()
}

const initialState = {
    error: null,
    greeting: null,
}

function greetingReducer(state, action) {
    switch(action.type) {
        case 'SUCCESS': {
            return {
                error: null,
                greeting: action.greeting,
            }
        }
        case 'ERROR': {
            return {
                error: action.error,
                greeting: null,
            }
        }
        default: {
            return state
        }
    }
}

export default function Greeting({ url }) {

    const [{error, greeting}, dispatch] = React.useReducer(greetingReducer, initialState)

    const [buttonClicked, setButtonClicked] = React.useState(false)

    const fetchGreeting = async (url) => {

        getGreeting(url).then(data => {
            
            const {greeting} = data

            dispatch({type: 'SUCCESS', greeting })

            setButtonClicked(true)

        }).catch(error => {
            
            dispatch({type: 'ERROR', error: JSON.stringify(error) })

        })

    }

    const buttonText = buttonClicked ? 'OK' : 'Load Greeting'

    return (
        <div>
            <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>{buttonText}</button>
            {greeting && <h1>{greeting}</h1>}
            {error && <p role="alert">Oops, failed to fetch!</p>}
        </div>
    )

}
