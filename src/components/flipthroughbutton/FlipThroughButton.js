import React from 'react';
import './FlipThroughButton.css'

function FlipThroughButton({variant, handleClick, reachedEnd, pokemonOffset }) {
    return (
        <button
            className="nav-button"
            onClick={() => handleClick(variant)}
            // disables the button if the offset would be less than 0  or more than the count
            disabled={variant === 'next' && reachedEnd === 'end' ||
                variant === 'previous' && pokemonOffset === 0}
        >
            {variant}
        </button>
    );
}

export default FlipThroughButton;