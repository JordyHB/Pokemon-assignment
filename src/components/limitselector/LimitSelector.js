import React from 'react';

function LimitSelector({ limit, setLimit }) {
    return (
          <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
            >
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={60}>60</option>
                <option value={80}>80</option>
                <option value={100}>100</option>
            </select>
    );
}

export default LimitSelector;