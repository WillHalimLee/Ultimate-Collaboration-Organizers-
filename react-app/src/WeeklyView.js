// WeekView.jsx
import React from 'react';
import DayColumn from './DayColumn';
import './WeekView.css';

const WeekView = () => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="week-view">
            {daysOfWeek.map((day) => (
                <DayColumn day={day} key={day} />
            ))}
        </div>
    );
};

export default WeekView;
