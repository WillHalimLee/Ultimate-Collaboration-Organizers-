// WeekView.jsx
import React, { useState } from 'react';
import DayHeader from './DayHeader';
import './WeekView.css';

class TimeSlot {
    constructor(color = '#ffffff', text = '') {
        this.color = color;
        this.text = text;
    }
}

const WeekView = () => {
    const daysOfWeek = ['Time', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, index) => index < 10 ? '0' + index + ':00' : index + ':00');
    const [timeSlots, setTimeSlots] = useState(Array.from({ length: 24 * 8 }, (_, i) => new TimeSlot()));

    const handleRightClick = (index, event) => {
        event.preventDefault();
        const updatedSlots = [...timeSlots];
        if (index % 24 !== 0) { // Exclude 'Time' column
            updatedSlots[index].color = updatedSlots[index].color === '#ffffff' ? '#ff0000' : '#ffffff';
            setTimeSlots(updatedSlots);
        }
    };

    const handleTextChange = (index, newText) => {
        const updatedSlots = [...timeSlots];
        if (index % 24 !== 0) { // Exclude 'Time' column
            updatedSlots[index].text = newText;
            setTimeSlots(updatedSlots);
        }
    };

    return (
        <div className="week-container">
            <div className="week-view">
                <DayHeader daysOfWeek={daysOfWeek} />
                <div className="day-columns-container">
                    {daysOfWeek.map((day, dayIndex) => (
                        <div className="day-column" key={day}>
                            {hours.map((hour, hourIndex) => {
                                const index = dayIndex * 24 + hourIndex;
                                return (
                                    <textarea
                                        key={`${day}-${hour}`}
                                        className="time-slot"
                                        style={{ backgroundColor: timeSlots[index].color }}
                                        value={day === 'Time' ? hour : timeSlots[index].text}
                                        onChange={(e) => handleTextChange(index, e.target.value)}
                                        onContextMenu={(event) => handleRightClick(index, event)}
                                        readOnly={day === 'Time'} // Make 'Time' column non-editable
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeekView;
