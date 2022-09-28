import React from 'react'

export default function ToggleColor({ textColor, bgColor1, bgColor2, text1, text2 }) {
    const [state, setState] = React.useState(0)
    return (
        <button 
        onClick={() => setState(prev => prev > 0 ? 0 : 1)}
        style={{
            position: 'relative',
            padding: 10,
            borderWidth: 0,
            borderRadius: 5,
            boxSizing: 'border-box',
            width: '100%',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: textColor || '#69AEFF',
            backgroundColor: state > 0 ? bgColor2 : bgColor1,
        }}
        >
        { state > 0 ? text2 : text1 }
        </button>
    )
}