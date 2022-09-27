import React from 'react'

export default function Button({ textColor, bgColor, onClick, children }) {
    return (
        <button 
        onClick={onClick}
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
            backgroundColor: bgColor || '#FFFFFF',
        }}
        >
        { children }
        </button>
    )
}