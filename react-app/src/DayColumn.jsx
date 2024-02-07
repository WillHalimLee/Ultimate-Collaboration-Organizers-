// DayColumn.jsx
import React from 'react';
import './DayColumn.css';

const DayColumn = ({ day }) => {
    // Assuming 24 timeslots for each day, you can adjust as needed.
    const timeSlots = Array.from({ length: 24 }, (_, index) => index);

    return (
        <div className="day-column">
            {timeSlots.map((_, index) => (
                <div className="time-slot" key={index}>
                    {/* Include your time slot indicator here */}
                </div>
            ))}
        </div>
    );
};

export default DayColumn;
