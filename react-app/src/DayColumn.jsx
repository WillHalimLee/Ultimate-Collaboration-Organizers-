import React from 'react';
import './DayColumn.css'; // Ensure this path is correct
// ... rest of your DayColumn component

const DayColumn = ({ day }) => {
    const hoursOfDay = Array.from({ length: 24 }, (_, index) => index);

    return (
        <div className="day-column">
            <div className="day-header">{day}</div>
            {hoursOfDay.map((hour) => (
                <TimeSlot hour={hour} key={hour} />
            ))}
        </div>
    );
};
export default DayColumn;
const TimeSlot = ({ hour }) => {
    return <div className="time-slot">{`${hour}:00`}</div>;
};
