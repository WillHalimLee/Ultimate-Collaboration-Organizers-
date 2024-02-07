// DayHeader.jsx
import React from 'react';
import './DayHeader.css';

const DayHeader = ({ daysOfWeek }) => {
    return (
        <div className="day-header-container">
            {daysOfWeek.map((day) => (
                <div className="day-header" key={day}>
                    {day}
                </div>
            ))}
        </div>
    );
};

export default DayHeader;
