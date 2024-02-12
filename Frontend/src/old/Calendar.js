import React from 'react';
import Calendar from './Calendar';


function MyCalendar() {
    const [date, setDate] = React.useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div>
            <h2>My Calendar</h2>
            <Calendar
                onChange={onChange}
                value={date}
            />
        </div>
    );
}

export default MyCalendar;
