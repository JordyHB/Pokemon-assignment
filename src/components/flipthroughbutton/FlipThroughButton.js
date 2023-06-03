import React from 'react';

function FlipThroughButton({variant, handleClick, currentOffset}) {
    return (
        <button
            onClick={() => handleClick(variant)}
            // disables the button if the offset would be less than 0
            disabled={variant === 'previous' && currentOffset < 20}
        >
            {variant}
        </button>
    );
}

export default FlipThroughButton;