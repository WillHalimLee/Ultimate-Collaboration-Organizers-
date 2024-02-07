// TimeColumn.jsx
import React from 'react';
import './TimeColumn.css';

const TimeColumn = () => {
    // Assuming 24-hour format
    const hours = Array.from({ length: 24 }, (_, index) => index);

    return (
        <div className="time-column">
            {hours.map(hour => (
                <div className="time-slot" key={hour}>
                    <div className="time-label">{hour}:00</div>
                    {/* Add additional time slots or indicators here if needed */}
                </div>
            ))}
        </div>
    );
};

export default TimeColumn;
